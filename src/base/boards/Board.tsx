import { useHistory, useParams } from 'react-router';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import React from 'react';
import { Button, Modal } from 'semantic-ui-react';

import { firebaseAuth, firestoreData } from '../selectors';
import ROUTES from '../../routes';
import HeadingWithButtons from '../_common/HeadingWithButtons';
import TaskList from './TaskList';
import ModalForm from '../_common/ModalForm';
import { EditBoardType } from '../../types';
import { showErrorToast, showSuccessToast } from '../../utils/showToast';
import HeadTag from '../_common/HeadTag';


const Board = () => {
    const { boardId } = useParams();
    const history = useHistory();
    const { uid } = useSelector(firebaseAuth);
    const { boards } = useSelector(firestoreData);
    const firestore = useFirestore();

    useFirestoreConnect([
        // {
        //     collection: `boards`,
        //     where: ['uid', '==', (uid || '')],
        //     doc: boardId,
        //     subcollections: [{ collection: "tasks" }]
        // },
        {
            collection: `boards/${boardId}/tasks`,
            where: ['uid', '==', (uid || '')],
        },
        {
            collection: 'boards',
            doc: boardId,
        },
    ]);

    const editBoard = (values: EditBoardType) => {
        firestore.collection('boards').doc(boardId)
            .update(values)
            .then(() => showSuccessToast(`${values.name} updated.`))
            .catch((error) => showErrorToast(error.message));
    };

    const deleteBoard = () => {
        firestore.collection('boards').doc(boardId)
            .delete()
            .then(() => {
                history.push(ROUTES.boards);
                showSuccessToast('Board deleted.');
            })
            .catch((error) => showErrorToast(error.message));
    };

    if (!boards || !boards[boardId || '']) {
        return null;
    }

    const { name, description } = boards[boardId || ''];

    const fields = [
        {
            id: 'boardName',
            placeholder: 'name',
            name: 'name',
            type: 'text',
            label: 'Name',
            required: true,
            initialValue: name,
        },
        {
            id: 'boardDescription',
            placeholder: 'description',
            name: 'description',
            type: 'text',
            label: 'Description',
            initialValue: description,
        },
    ];

    return (
        <div>
            <HeadTag title={name} />
            <HeadingWithButtons
                text={name}
                buttons={[
                    <ModalForm
                        onSubmit={editBoard}
                        button={<Button circular icon="edit" />}
                        submitButtonText="Save"
                        fields={fields}
                        heading="Edit board"
                        key="edit"
                    />,
                    <Modal
                        basic
                        size="small"
                        trigger={<Button circular icon="delete" />}
                        header="Are you sure?"
                        content="This action is irreversible"
                        actions={[
                            {
                                basic: true,
                                inverted: true,
                                content: 'Cancel',
                            },
                            {
                                basic: true,
                                color: 'red',
                                key: 'done',
                                content: 'Delete',
                                onClick: deleteBoard,
                            },
                        ]}
                        icon="delete"
                        key="delete"
                    />,
                ]}
            />
            {description}
            <TaskList />
        </div>
    );
};

export default Board;
