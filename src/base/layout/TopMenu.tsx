import React from 'react';
import { Menu } from 'semantic-ui-react';
import { useFirebase } from 'react-redux-firebase';

const TopMenu = () => {
    const firebase = useFirebase();

    const logOut = () => {
        firebase.logout();
    };

    return (
        <Menu>
            <Menu.Item>
                Boards
            </Menu.Item>
            <Menu.Menu position="right">
                <Menu.Item onClick={logOut}>
                    Logout
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    );
};

export default TopMenu;
