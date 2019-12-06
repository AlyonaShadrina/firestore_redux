import React from 'react'
import { useSelector } from 'react-redux'
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase'

import { state } from '../../types';

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
    }



    const { boards } = useSelector((state: state) => state.firestore.data);
    const tasks = useSelector((state: state) => state.firestore.data[`boards/${'L5hGqvkzgycEah9vlMr3'}/tasks`]);
    console.log(tasks);
    return (
        <div >
            <div>
                <h2>Boards</h2>
                <button onClick={add}>add</button>
                <ul>
                    {
                        boards && Object.keys(boards).map((boardId) => (
                            <li key={boardId}>
                                <div>{boards[boardId].name}</div>
                                <div>{boards[boardId].description}</div>
                            </li>
                        ))
                    }
                    boards/${'L5hGqvkzgycEah9vlMr3'}/tasks
                    {
                        tasks && Object.keys(tasks).map((tasksId) => (
                            <li key={tasksId}>
                                <div>{tasks[tasksId].name}</div>
                                <div>{tasks[tasksId].description}</div>
                            </li>
                        ))
                    }

                </ul>
            </div>
        </div>
    )
};

export default Boards;
