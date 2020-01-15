import React, { useCallback, useEffect, useState } from 'react';
import { Label, Menu } from 'semantic-ui-react';
import { useFirebase } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import ROUTES from '../../routes';


const useTheme = (): [boolean, () => void] => {

    const darkPreference = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const [isDark, setDark] = useState(darkPreference);

    useEffect(() => {
        if (isDark) {
            document.documentElement.style.setProperty('--primaryColor', 'darkblue');
        } else {
            document.documentElement.style.setProperty('--primaryColor', 'lightblue');
        }
    }, [isDark]);

    const changeTheme = () => {
        setDark(!isDark);
    };

    return [isDark, changeTheme];
};

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


    const [isDarkTheme, toggleTheme] = useTheme();

    useEffect(() => {
        console.log('isDarkTheme', isDarkTheme);
    }, [isDarkTheme])

    const handleThemeChange = () => {
        toggleTheme();
    };

    return (
        <Menu>
            <Menu.Item>
                <Link to={ROUTES.boards}>Boards</Link>
            </Menu.Item>
            <Menu.Item>
                <Link to={ROUTES.boardsShared}>Shared</Link>
            </Menu.Item>
            <Menu.Item>
                <input type="checkbox" onChange={handleThemeChange} checked={isDarkTheme} />
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
