import { useParams } from 'react-router';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { Button, Grid, List } from 'semantic-ui-react';
import React from 'react';

import { firebaseAuth, firestoreOrdered } from '../selectors';
import HeadingWithButtons from '../_common/HeadingWithButtons';
import TaskItem from './TaskItem';
import ModalForm from '../_common/ModalForm';
import { EditTaskType } from '../../types';
import { showSuccessToast, showErrorToast } from '../../utils/showToast';
import ROUTES from '../../routes';
import { languages } from '../../config';


const TaskList = () => {
    const { boardId } = useParams();
    const firestore = useFirestore();
    const { uid, email } = useSelector(firebaseAuth);
    const tasks = useSelector(firestoreOrdered)[ROUTES.dynamic.boardTasks(boardId)];

    useFirestoreConnect([
        {
            collection: ROUTES.dynamic.boardTasks(boardId),
        },
    ]);

    const add = (values: EditTaskType) => {
        firestore.collection(ROUTES.dynamic.boardTasks(boardId))
            .add({ ...values, uid, author: email })
            .then(() => showSuccessToast(`${values.name} added.`))
            .catch((error) => showErrorToast(error.message));
    };

    const fields = [
        {
            id: 'taskName',
            placeholder: 'name',
            name: 'name',
            type: 'text',
            label: 'Name',
            required: true,
        },
        {
            id: 'taskDescription',
            placeholder: 'description',
            name: 'description',
            type: 'text',
            label: 'Description',
        },
        {
            id: 'taskLanguage',
            placeholder: 'language',
            name: 'language',
            type: 'select',
            label: 'Language',
            initialValue: 'plaintext',
            options: languages.map((lang) => ({
                label: lang,
                value: lang,
            })),
        },
        {
            id: 'taskCode',
            placeholder: 'code',
            name: 'code',
            type: 'textarea',
            label: 'Code',
        },
    ];

    return (
        <>
            <HeadingWithButtons
                text="Snippets"
                tag="h2"
                buttons={[
                    <ModalForm
                        onSubmit={add}
                        button={<Button circular icon="add" primary />}
                        submitButtonText="Add"
                        fields={fields}
                        heading="Add new snippet"
                        key="Add"
                    />,
                ]}
            />
            <List as={Grid} columns={1} stackable>
                {tasks && tasks.map((task) => (
                    <TaskItem task={task} key={task.id} tasksId="tasksId" />
                ))}
            </List>
        </>
    );
};

export default TaskList;
