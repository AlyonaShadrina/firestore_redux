import {
    Grid, Header, List, Segment,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import React from 'react';

import ROUTES from '../../routes';
import cropText from '../../utils/cropText';
import { BoardType } from '../../types';


type OwnProps = {
    board: BoardType;
};

const BoardItem = ({ board: { name, description, id } }: OwnProps) => (
    <List.Item as={Grid.Column}>
        <Segment>
            <Header as="h2">
                <Link to={ROUTES.dynamic.boardTasks(id)}>
                    {name}
                </Link>
            </Header>
            {cropText(description)}
        </Segment>
    </List.Item>
);

export default BoardItem;
