import {
    Grid, Header, List, Segment,
} from 'semantic-ui-react';
import React from 'react';

import { TaskType } from '../../types';


type OwnProps = {
    tasksId: string;
    task: TaskType;
};

const TaskItem = ({ tasksId, task: { name, description } }: OwnProps) => (
    <List.Item
        key={tasksId}
        as={Grid.Column}
    >
        <Segment>
            <Header as="h3">
                {name}
            </Header>
            <div>{description}</div>
        </Segment>
    </List.Item>
);

export default TaskItem;
