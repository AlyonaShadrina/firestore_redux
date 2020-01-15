import { useEffect, useState } from 'react';
import { getCookie, setCookie } from '../utils/cookie';
import { themeCookie } from '../config';

type Themes = {
    light?: {
        [x: string]: string;
    };
    dark?: {
        [x: string]: string;
    };
};

const useTheme = ({ light, dark }: Themes): [boolean, () => void] => {
    const darkPreference = getCookie(themeCookie) === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches;

    const [isDark, setDark] = useState(darkPreference);

    useEffect(() => {
        if (isDark && dark) {
            Object.keys(dark).map((prop: string) => {
                document.documentElement.style.setProperty(`${prop}`, dark[prop]);
                return null;
            });
            setCookie(themeCookie, 'dark');
        } else if (!isDark && light) {
            Object.keys(light).map((prop: string) => {
                document.documentElement.style.setProperty(`${prop}`, light[prop]);
                return null;
            });
            setCookie(themeCookie, 'light');
        }
        // TODO: save default values
    }, [dark, isDark, light]);

    const changeTheme = () => {
        setDark(!isDark);
    };

    return [isDark, changeTheme];
};

export default useTheme;
