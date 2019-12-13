import React from 'react';
import { useSelector } from 'react-redux';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { Button, Grid, List } from 'semantic-ui-react';

import { firebaseAuth, firestoreData } from '../selectors';
import HeadingWithButtons from '../_common/HeadingWithButtons';
import BoardItem from './BoardItem';


const BoardList = () => {
    const { uid } = useSelector(firebaseAuth);
    const firestore = useFirestore();
    const { boards } = useSelector(firestoreData);

    useFirestoreConnect([{
        collection: 'boards',
        where: ['uid', '==', (uid || '')],
    }]);

    const add = () => {
        firestore.collection('boards').add({
            name: 'name',
            description: 'description',
            uid,
        });
    };

    return (
        <>
            <HeadingWithButtons
                text="Boards"
                buttons={[
                    <Button onClick={add} circular icon="add" primary />,
                ]}
            />
            <List as={Grid} columns={4} stackable>
                {boards && Object.keys(boards).map((boardId) => (
                    <BoardItem boardId={boardId} board={boards[boardId]} />
                ))}
            </List>
        </>
    );
};

export default BoardList;
