import React from 'react';
import { useSelector } from 'react-redux';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase';

import { state } from '../../types';
import { Link } from 'react-router-dom';


const Boards = () => {

    const { uid } = useSelector((state: state) => state.firebase.auth);

    useFirestoreConnect([{
        collection: 'boards',
        where: ['uid', '==', (uid || '')],
    }]);

    const firestore = useFirestore();

    const add = () => {
        firestore.collection('boards').add({
            name: 'name',
            description: 'description',
        })
    };

    const { boards } = useSelector((state: state) => state.firestore.data);

    return (
        <div >
            <div>
                <h2>Boards</h2>
                <button onClick={add}>add</button>
                <ul>
                    {
                        boards && Object.keys(boards).map((boardId) => (
                            <li key={boardId}>
                                <div><Link to={`boards/${boardId}/tasks`}>{boards[boardId].name}</Link></div>
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
