import { useParams } from "react-router";
import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import React from "react";

import { stateType } from "../../types";


const BoardTasks = () => {

    const { boardId } = useParams();

    const { uid } = useSelector((state: stateType) => state.firebase.auth);

    useFirestoreConnect([{
        collection: `boards/${boardId}/tasks`,
        where: ['uid', '==', (uid || '')],
    }]);
    const tasks = useSelector((state: stateType) => state.firestore.data[`boards/${boardId}/tasks`]);

    if (!tasks) {
        return null
    }

    return (
        <ul>
            tasks
            {
                Object.keys(tasks).map((tasksId) => (
                    <li key={tasksId}>
                        <div>{tasks[tasksId].name}</div>
                        <div>{tasks[tasksId].description}</div>
                    </li>
                ))
            }
        </ul>
    );
};

export default BoardTasks;