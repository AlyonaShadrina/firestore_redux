import {
    Button, Grid, List, Modal, Segment,
} from 'semantic-ui-react';
import React from 'react';
import { useFirestore } from 'react-redux-firebase';
import { useParams } from 'react-router';

import { EditTaskType, TaskType } from '../../types';
import ModalForm from '../_common/ModalForm';
import HeadingWithButtons from '../_common/HeadingWithButtons';
import { showErrorToast, showSuccessToast } from '../../utils/showToast';


type OwnProps = {
    tasksId: string;
    task: TaskType;
};

const TaskItem = ({ tasksId, task: { name, description, id } }: OwnProps) => {
    const { boardId } = useParams();
    const firestore = useFirestore();

    const editTask = (values: EditTaskType) => {
        firestore.collection(`boards/${boardId}/tasks`).doc(id)
            .update(values)
            .then(() => showSuccessToast(`${values.name} updated.`))
            .catch((error) => showErrorToast(error.message));
    };

    const deleteTask = () => {
        firestore.collection(`boards/${boardId}/tasks`).doc(id)
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
                </Segment>
            </List.Item>
        )
    );
};

export default TaskItem;
