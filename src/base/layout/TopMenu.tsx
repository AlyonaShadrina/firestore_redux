import React from 'react';
import { Menu } from 'semantic-ui-react';
import { useFirebase } from 'react-redux-firebase';
import { Link } from "react-router-dom";
import ROUTES from "../../routes";

const TopMenu = () => {
    const firebase = useFirebase();

    const logOut = () => {
        firebase.logout();
    };

    return (
        <Menu>
            <Menu.Item>
                <Link to={ROUTES.boards}>Boards</Link>
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
