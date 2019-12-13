import React from 'react';
import { useSelector } from 'react-redux';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { Button, Grid, List } from 'semantic-ui-react';

import { firebaseAuth, firestoreOrdered } from '../selectors';
import HeadingWithButtons from '../_common/HeadingWithButtons';
import BoardItem from './BoardItem';
import ModalForm from '../_common/ModalForm';
import { EditBoardType } from '../../types';


const BoardList = () => {
    const { uid } = useSelector(firebaseAuth);
    const firestore = useFirestore();
    const { boards } = useSelector(firestoreOrdered);

    useFirestoreConnect([{
        collection: 'boards',
        where: ['uid', '==', (uid || '')],
    }]);

    const add = (values: EditBoardType) => {
        firestore.collection('boards').add({
            ...values,
            uid,
        });
    };

    const fields = [
        {
            id: 'boardName',
            placeholder: 'name',
            name: 'name',
            type: 'text',
            label: 'Name',
            required: true,
        },
        {
            id: 'boardDescription',
            placeholder: 'description',
            name: 'description',
            type: 'text',
            label: 'Description',
        },
    ];

    return (
        <>
            <HeadingWithButtons
                text="Boards"
                buttons={[
                    <ModalForm
                        onSubmit={add}
                        button={<Button circular icon="add" primary />}
                        submitButtonText="Add"
                        fields={fields}
                        heading="Add new board"
                        key="Add"
                    />,
                ]}
            />
            <List as={Grid} columns={4} stackable>
                {boards && boards.map((board) => (
                    <BoardItem key={board.id} board={board} />
                ))}
            </List>
        </>
    );
};

export default BoardList;
