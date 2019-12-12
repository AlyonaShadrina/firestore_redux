import { useHistory, useParams } from 'react-router';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import {
    Button, Grid, Header, List, Segment,
} from 'semantic-ui-react';

import { firebaseAuth, firestoreData } from '../selectors';
import ROUTES from '../../routes';
import BoardEditForm from './BoardEditForm';
import HeadingWithButtons from '../_common/HeadingWithButtons';
import ButtonWithModalConfirm from '../_common/ButtonWithModalConfirm';


const BoardTasks = () => {
    const { boardId } = useParams();
    const history = useHistory();

    const { uid } = useSelector(firebaseAuth);

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
    const tasks = useSelector(firestoreData)[`boards/${boardId}/tasks`];
    const { boards } = useSelector(firestoreData);

    const [editMode, setEditMode] = useState(false);

    const firestore = useFirestore();

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

    return (
        <div>
            {editMode ? (
                <BoardEditForm
                    initialValues={{ name, description }}
                    submitCallback={toggleEditMode}
                    cancelCallback={toggleEditMode}
                />
            ) : (
                <>
                    <HeadingWithButtons
                        text={name}
                        buttons={[
                            <Button onClick={toggleEditMode} circular icon="edit" />,
                            <ButtonWithModalConfirm
                                button={<Button circular icon="delete" />}
                                content="This action is irrevisible"
                                header="Are ypou sure?"
                                icon="delete"
                                action={deleteBoard}
                            />,
                        ]}
                    />
                    {description}
                </>
            )}
            <Header as="h2">
                Tasks
            </Header>

            <List as={Grid} columns={4} stackable>
                {
                    tasks && Object.keys(tasks).map((tasksId) => (
                        <List.Item key={tasksId} as={Grid.Column}>
                            <Segment>
                                <Header as="h3">
                                    {tasks[tasksId].name}
                                </Header>
                                <div>{tasks[tasksId].description}</div>
                            </Segment>
                        </List.Item>
                    ))
                }
            </List>
        </div>
    );
};

export default BoardTasks;
