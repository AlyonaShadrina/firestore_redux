import React, { PropsWithChildren } from 'react';
import { SemanticToastContainer } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';

import { Container } from 'semantic-ui-react';

import TopMenu from './TopMenu';


const LayoutWithMenu = ({ children }: PropsWithChildren<{}>) => (
    <>
        <TopMenu />
        <SemanticToastContainer />
        <Container fluid>
            {children}
        </Container>
    </>
);

export default LayoutWithMenu;
