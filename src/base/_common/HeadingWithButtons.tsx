import { Grid, Header } from 'semantic-ui-react';
import React, { ReactNode } from 'react';

type OwnProps = {
    text: string;
    buttons?: ReactNode[];
};

const HeadingWithButtons = ({ text, buttons }: OwnProps) => (
    <Grid>
        <Header as="h1">
            {text}
        </Header>
        <div>
            {buttons}
        </div>
    </Grid>
);

export default HeadingWithButtons;
