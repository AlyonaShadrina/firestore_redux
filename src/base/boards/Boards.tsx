import React from 'react';
import { useSelector } from 'react-redux';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase';

import { state } from '../../types';
import { Link } from 'react-router-dom';


const Boards = () => {
    useFirestoreConnect([
        { collection: 'boards' },
        { collection: `boards/${'L5hGqvkzgycEah9vlMr3'}/tasks` },
    ]);

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
