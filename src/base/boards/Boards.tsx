import React from 'react';
import { useSelector } from 'react-redux';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase';

import { Link } from 'react-router-dom';
import { firebaseAuth, firestoreData } from '../selectors'
import ROUTES from "../../routes";


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
        })
    };

    const { boards } = useSelector(firestoreData);

    return (
        <div >
            <div>
                <h2>Boards</h2>
                <button onClick={add}>add</button>
                <ul>
                    {
                        boards && Object.keys(boards).map((boardId) => (
                            <li key={boardId}>
                                <div><Link to={ROUTES.dynamic.boardTasks(boardId)}>{boards[boardId].name}</Link></div>
                                <div>{boards[boardId].description}</div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
};

export default Boards;
