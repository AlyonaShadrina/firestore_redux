import React from 'react';
import { useSelector } from 'react-redux';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import {
    Segment, List, Header, Button, Grid,
} from 'semantic-ui-react';

import { firebaseAuth, firestoreData } from '../selectors';
import ROUTES from '../../routes';
import cropText from '../../utils/cropText';
import HeadingWithButtons from '../_common/HeadingWithButtons';


const Boards = () => {
    const { uid } = useSelector(firebaseAuth);

    useFirestoreConnect([{
        collection: 'boards',
        where: ['uid', '==', (uid || '')],
    }]);

    const firestore = useFirestore();

    const add = () => {
        firestore.collection('boards').add({
            name: 'name',
            description: 'description',
            uid,
        });
    };

    const { boards } = useSelector(firestoreData);

    return (
        <div>
            <div>
                <HeadingWithButtons
                    text="Boards"
                    buttons={[
                        <Button onClick={add} circular icon="add" primary />,
                    ]}
                />
                <List as={Grid} columns={4} stackable>
                    {
                        boards && Object.keys(boards).map((boardId) => (
                            <List.Item key={boardId} as={Grid.Column}>
                                <Segment>
                                    <Header as="h2">
                                        <Link to={ROUTES.dynamic.boardTasks(boardId)}>
                                            {boards[boardId].name}
                                        </Link>
                                    </Header>
                                    {cropText(boards[boardId].description)}
                                </Segment>
                            </List.Item>
                        ))
                    }
                </List>
            </div>
        </div>
    );
};

export default Boards;
