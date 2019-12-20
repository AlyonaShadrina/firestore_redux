import { Grid, Header } from 'semantic-ui-react';
import React, { ReactNode } from 'react';

type OwnProps = {
    text: string;
    buttons?: ReactNode[];
    tag?: string;
};

const HeadingWithButtons = ({ text, buttons, tag = 'h1' }: OwnProps) => (
    <Grid style={{ paddingTop: '1.125em', paddingBottom: '1.125em' }}>
        <Header as={tag} className="todo heading-with-buttons">
            {text}
        </Header>
        <div>
            {buttons}
        </div>
    </Grid>
);

export default HeadingWithButtons;
