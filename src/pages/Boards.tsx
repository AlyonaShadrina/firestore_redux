import React from 'react';
import BoardList from '../base/boards/BoardList';
import LayoutWithMenu from '../base/layout/LayoutWithMenu';
import HeadTag from '../base/_common/HeadTag';


const BoardsPage = () => (
    <LayoutWithMenu>
        <HeadTag title="Boards" />
        <BoardList />
    </LayoutWithMenu>
);

export default BoardsPage;
