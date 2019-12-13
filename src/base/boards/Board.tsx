import { useHistory, useParams } from 'react-router';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import { Button, Modal } from 'semantic-ui-react';

import { firebaseAuth, firestoreData } from '../selectors';
import ROUTES from '../../routes';
import BoardEditForm from './BoardEditForm';
import HeadingWithButtons from '../_common/HeadingWithButtons';
import TaskList from './TaskList';


const Board = () => {
    const { boardId } = useParams();
    const history = useHistory();
    const { uid } = useSelector(firebaseAuth);
    const { boards } = useSelector(firestoreData);
    const firestore = useFirestore();

    useFirestoreConnect([
        {
            collection: `boards/${boardId}/tasks`,
            where: ['uid', '==', (uid || '')],
        },
        {
            collection: 'boards',
            doc: boardId,
        },
    ]);

    const [editMode, setEditMode] = useState(false);

    const deleteBoard = () => {
        firestore.collection('boards').doc(boardId)
            .delete()
            .then(() => {
                history.push(ROUTES.boards);
            });
    };


    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    if (!boards) {
        return null;
    }

    const { name, description } = boards[boardId || ''];

    const NameDescription = (
        <>
            <HeadingWithButtons
                text={name}
                buttons={[
                    <Button onClick={toggleEditMode} circular icon="edit" />,
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
                    />,
                ]}
            />
            {description}
        </>
    );

    return (
        <div>
            {editMode ? (
                <BoardEditForm
                    initialValues={{ name, description }}
                    submitCallback={toggleEditMode}
                    cancelCallback={toggleEditMode}
                />
            ) : NameDescription}
            <TaskList />
        </div>
    );
};

export default Board;
