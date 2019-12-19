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
    isSharedPage?: boolean;
};

const BoardItem = ({ board: { name, description, id }, isSharedPage }: OwnProps) => (
    <List.Item as={Grid.Column}>
        <Segment className="todo board-item">
            <Header as="h2">
                <Link to={ROUTES.dynamic.boardTasks(id, isSharedPage)}>
                    {name}
                </Link>
            </Header>
            {cropText(description, 80)}
        </Segment>
    </List.Item>
);

export default BoardItem;
