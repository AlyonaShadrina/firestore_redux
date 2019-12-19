import React from 'react';
import { useSelector } from 'react-redux';
import { useFirestore, useFirestoreConnect, WhereOptions } from 'react-redux-firebase';
import { Button, Grid, List } from 'semantic-ui-react';
import { useLocation } from 'react-router';

import { firebaseAuth, firestoreOrdered } from '../selectors';
import HeadingWithButtons from '../_common/HeadingWithButtons';
import BoardItem from './BoardItem';
import ModalForm from '../_common/ModalForm';
import { EditBoardType } from '../../types';
import { showErrorToast, showSuccessToast } from '../../utils/showToast';


const BoardList = () => {
    const { uid, email } = useSelector(firebaseAuth);
    const firestore = useFirestore();
    const { boards } = useSelector(firestoreOrdered);
    const { pathname } = useLocation();

    const isSharedPage = pathname === '/shared';
    const ownBoards: WhereOptions = ['uid', '==', (uid || '')];
    const sharedBoards: WhereOptions = ['sharedWith', 'array-contains', (email || '')];

    useFirestoreConnect([{
        collection: 'boards',
        where: isSharedPage ? sharedBoards : ownBoards,
    }]);

    const add = (values: EditBoardType) => {
        const sharedArray = values.sharedWith.split(',').map((emailString) => emailString.trim());
        firestore.collection('boards')
            .add({
                ...values,
                sharedWith: sharedArray,
                author: email,
                uid,
            })
            .then(() => showSuccessToast(`${values.name} added.`))
            .catch((error) => showErrorToast(error.message));
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
        {
            id: 'boardShared',
            placeholder: 'Enter emails (separate with ,)',
            name: 'sharedWith',
            type: 'text',
            label: 'Share with',
        },
    ];

    return (
        <>
            <HeadingWithButtons
                text={`${isSharedPage ? 'Shared' : 'Your'} boards`}
                buttons={isSharedPage ? [] : [
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
                    <BoardItem key={board.id} board={board} isSharedPage={isSharedPage} />
                ))}
            </List>
        </>
    );
};

export default BoardList;
