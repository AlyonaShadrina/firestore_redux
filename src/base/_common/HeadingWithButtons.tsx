import { Grid, Header } from 'semantic-ui-react';
import React, { ReactNode } from 'react';

type OwnProps = {
    text: string;
    buttons?: ReactNode[];
    tag?: string;
};

const HeadingWithButtons = ({ text, buttons, tag = 'h1' }: OwnProps) => (
    <Grid>
        <Header as={tag}>
            {text}
        </Header>
        <div>
            {buttons}
        </div>
    </Grid>
);

export default HeadingWithButtons;
