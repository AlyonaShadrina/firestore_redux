import { useParams } from 'react-router';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { Button, Grid, List } from 'semantic-ui-react';
import React from 'react';

import { firebaseAuth, firestoreOrdered } from '../selectors';
import HeadingWithButtons from '../_common/HeadingWithButtons';
import TaskItem from './TaskItem';


const TaskList = () => {
    const { boardId } = useParams();
    const firestore = useFirestore();
    const { uid } = useSelector(firebaseAuth);
    const tasks = useSelector(firestoreOrdered)[`boards/${boardId}/tasks`];

    useFirestoreConnect([
        {
            collection: `boards/${boardId}/tasks`,
            where: ['uid', '==', (uid || '')],
        },
    ]);

    const addTask = () => {
        firestore.collection(`boards/${boardId}/tasks`).add({
            name: 'task name',
            description: 'task description',
            uid,
        });
    };

    return (
        <>
            <HeadingWithButtons
                text="Tasks"
                tag="h2"
                buttons={[
                    <Button
                        onClick={addTask}
                        circular
                        icon="add"
                        primary
                    />,
                ]}
            />
            <List as={Grid} columns={4} stackable>
                {tasks && tasks.map((task) => (
                    <TaskItem task={task} tasksId="tasksId" />
                ))}
            </List>
        </>
    );
};

export default TaskList;
