import React, { useCallback, useEffect, useState } from 'react';
import { Checkbox, Label, Menu } from 'semantic-ui-react';
import { useFirebase } from 'react-redux-firebase';
import { Link } from 'react-router-dom';

import ROUTES from '../../routes';
import useTheme from '../../hooks/useTheme';


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


    const [isDarkTheme, toggleTheme] = useTheme({
        dark: {
            '--primaryColor': '#69f0ae',
            '--pageBackground': 'rgb(22, 22, 22)',
            '--background': '#000a12',
            '--backgroundButton': 'rgb(22, 22, 22)',
            '--backgroundMenu': 'rgb(22, 22, 22)',
            '--backgroundSegment': '#1d1e22',
            '--backgroundMessage': '#161616',
            '--segmentShadow': '0 4px 30px rgba(0, 0, 0, 0.5)',
            '--textColor': 'rgb(220, 220, 220)',
        },
        light: {
            '--primaryColor': '#69f0ae',
            '--pageBackground': 'rgb(241, 241, 241)',
            '--background': 'rgb(120, 120, 120)',
            '--backgroundButton': 'rgb(241, 241, 241)',
            '--backgroundMenu': 'rgb(241, 241, 241)',
            '--backgroundSegment': 'rgb(250, 250, 250)',
            '--backgroundMessage': '#161616',
            '--segmentShadow': '0 3px 13px rgba(0, 0, 0, 0.2)',
            '--textColor': 'rgb(20, 20, 20)',
        },
    });

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
                <label className="todo toggle-theme-label" htmlFor="theme">Theme</label>
                <Checkbox
                    toggle
                    id="theme"
                    onChange={handleThemeChange}
                    checked={isDarkTheme}
                    className="todo toggle-theme"
                />
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
