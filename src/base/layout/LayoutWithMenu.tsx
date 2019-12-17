import React, { PropsWithChildren } from 'react';
import TopMenu from './TopMenu';


const LayoutWithMenu = ({ children }: PropsWithChildren<{}>) => (
    <>
        <TopMenu />
        <div style={{ paddingLeft: '1.125em', paddingRight: '1.125em', }}>
            {children}
        </div>
    </>
);

export default LayoutWithMenu;
