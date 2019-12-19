import {
    Button, Grid, List, Modal, Segment,
} from 'semantic-ui-react';
import React from 'react';
import { useFirestore } from 'react-redux-firebase';
import { useParams } from 'react-router';
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import { androidstudio } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { EditTaskType, TaskType } from '../../types';
import ModalForm from '../_common/ModalForm';
import HeadingWithButtons from '../_common/HeadingWithButtons';
import { showErrorToast, showSuccessToast } from '../../utils/showToast';
import ROUTES from '../../routes';
import { languages } from '../../config';


type OwnProps = {
    tasksId: string;
    task: TaskType;
};

const TaskItem = ({
    tasksId, task: {
        name, description, id, code, language = 'plaintext',
    },
}: OwnProps) => {
    const { boardId } = useParams();
    const firestore = useFirestore();

    const editTask = (values: EditTaskType) => {
        firestore.collection(ROUTES.dynamic.boardTasks(boardId)).doc(id)
            .update(values)
            .then(() => showSuccessToast(`${values.name} updated.`))
            .catch((error) => showErrorToast(error.message));
    };

    const deleteTask = () => {
        firestore.collection(ROUTES.dynamic.boardTasks(boardId)).doc(id)
            .delete()
            .then(() => showSuccessToast('Task deleted.'))
            .catch((error) => showErrorToast(error.message));
    };

    const fields = [
        {
            placeholder: 'name',
            name: 'name',
            type: 'text',
            label: 'Name',
            required: true,
            initialValue: name,
        },
        {
            placeholder: 'description',
            name: 'description',
            type: 'text',
            label: 'Description',
            initialValue: description,
        },
        {
            placeholder: 'language',
            name: 'language',
            type: 'select',
            label: 'Language',
            initialValue: language,
            options: languages.map((lang) => ({
                label: lang,
                value: lang,
            })),
        },
        {
            placeholder: 'code',
            name: 'code',
            type: 'textarea',
            label: 'Code',
            initialValue: code,
        },
    ];

    return (
        (
            <List.Item
                key={tasksId}
                as={Grid.Column}
            >
                <Segment>
                    <HeadingWithButtons
                        text={name}
                        tag="h3"
                        buttons={[
                            <ModalForm
                                onSubmit={editTask}
                                button={<Button circular icon="edit" size="mini" basic />}
                                submitButtonText="Save"
                                fields={fields}
                                heading="Edit board"
                                key="edit"
                            />,
                            <Modal
                                basic
                                size="small"
                                trigger={<Button circular icon="delete" size="mini" basic />}
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
                                        onClick: deleteTask,
                                    },
                                ]}
                                icon="delete"
                                key="delete"
                            />,
                        ]}
                    />
                    <div>{description}</div>
                    {code && (
                        <SyntaxHighlighter language={language} style={androidstudio} showLineNumbers>
                            {code}
                        </SyntaxHighlighter>
                    )}
                </Segment>
            </List.Item>
        )
    );
};

export default TaskItem;
