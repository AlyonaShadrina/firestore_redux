import React, { useCallback, useEffect, useState } from 'react';
import { Label, Menu } from 'semantic-ui-react';
import { useFirebase } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import ROUTES from '../../routes';

const TopMenu = () => {
    const firebase = useFirebase();

    const logOut = () => {
        firebase.logout();
    };

    const [online, setOnline] = useState(window.navigator.onLine);

    const setIsOnline = () => setOnline(true);
    const setNotOnline = () => setOnline(false);

    const memoizedSubscribeOnline = useCallback(() => {
        window.addEventListener('offline', setNotOnline);
        window.addEventListener('online', setIsOnline);
    }, []);

    const memoizedUnsubscribeOnline = useCallback(() => {
        window.removeEventListener('offline', setNotOnline);
        window.removeEventListener('online', setIsOnline);
    }, []);

    useEffect(() => {
        memoizedSubscribeOnline();
        return memoizedUnsubscribeOnline;
    }, [memoizedSubscribeOnline, memoizedUnsubscribeOnline]);

    return (
        <Menu>
            <Menu.Item>
                <Link to={ROUTES.boards}>Boards</Link>
            </Menu.Item>
            <Menu.Item>
                <Link to={ROUTES.boardsShared}>Shared</Link>
            </Menu.Item>
            {!online && (
                <Menu.Item>
                    <Label size="mini">
                        offline
                    </Label>
                </Menu.Item>
            )}
            <Menu.Menu position="right">
                <Menu.Item onClick={logOut}>
                    Logout
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    );
};

export default TopMenu;
