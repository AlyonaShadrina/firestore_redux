import React, { PropsWithChildren } from 'react';
import TopMenu from './TopMenu';


const LayoutWithMenu = ({ children }: PropsWithChildren<{}>) => (
    <>
        <TopMenu />
        {children}
    </>
);

export default LayoutWithMenu;
