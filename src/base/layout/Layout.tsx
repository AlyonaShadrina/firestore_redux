import React, { PropsWithChildren } from 'react';
import { SemanticToastContainer } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';


const Layout = ({ children }: PropsWithChildren<{}>) => (
    <>
        <SemanticToastContainer />
        {children}
    </>
);

export default Layout;
