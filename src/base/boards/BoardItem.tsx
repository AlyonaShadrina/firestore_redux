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

const BoardItem = ({
    board: {
        name, description, id, author,
    }, isSharedPage,
}: OwnProps) => (
    <List.Item as={Grid.Column}>
        <Link to={ROUTES.dynamic.boardTasks(id, isSharedPage)}>
            <Segment className="todo board-item">
                <Header as="h2" className="todo text-primary">
                    {name}
                </Header>
                {isSharedPage && (
                    <div className="todo meta text-default">{author}</div>
                )}
                <div className="todo text-default">{cropText(description, 80)}</div>
            </Segment>
        </Link>
    </List.Item>
);

export default BoardItem;
