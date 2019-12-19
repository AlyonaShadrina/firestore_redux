import { useHistory, useParams } from 'react-router';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import React from 'react';
import { Button, Grid, Modal } from 'semantic-ui-react';

import { firestoreData } from '../selectors';
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
            collection: ROUTES.dynamic.boardTasks(boardId),
        },
        {
            collection: 'boards',
            doc: boardId,
        },
    ]);

    const editBoard = (values: EditBoardType) => {
        const sharedArray = values.sharedWith.split(',').map((emailString) => emailString.trim());
        firestore.collection('boards').doc(boardId)
            .update({ ...values, sharedWith: sharedArray })
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

    const {
        name, description, author, sharedWith,
    } = boards[boardId || ''];

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
        {
            id: 'boardShared',
            placeholder: 'Enter emails (separate with ,)',
            name: 'sharedWith',
            type: 'text',
            label: 'Share with',
            initialValue: (sharedWith || []).join(', ')
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
            <Grid columns={2} divided stackable>
                <Grid.Column>
                    {description}
                </Grid.Column>
                <Grid.Column>
                    <div>
                        Created by:
                        {' '}
                        {author}
                    </div>
                    <div>
                        Shared with:
                        {' '}
                        {sharedWith && sharedWith.join(', ')}
                    </div>
                </Grid.Column>
            </Grid>
            <TaskList />
        </div>
    );
};

export default Board;
