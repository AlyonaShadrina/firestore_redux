import React from 'react';
import BoardTasks from '../base/boards/BoardTasks';
import LayoutWithMenu from '../base/layout/LayoutWithMenu';

const BoardTasksPage = () => (
    <LayoutWithMenu>
        <BoardTasks />
    </LayoutWithMenu>
);

export default BoardTasksPage;
