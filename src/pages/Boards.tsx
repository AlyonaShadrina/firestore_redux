import React from 'react';
import { Segment, Sidebar } from 'semantic-ui-react';
import Boards from '../base/boards/Boards';
import SideMenu from '../base/layout/SideMenu';


const BoardsPage = () => (
    <>
        <Sidebar.Pushable as={Segment}>
            <SideMenu />

            <Sidebar.Pusher>
                <Boards />
            </Sidebar.Pusher>
        </Sidebar.Pushable>

    </>
);

export default BoardsPage;
