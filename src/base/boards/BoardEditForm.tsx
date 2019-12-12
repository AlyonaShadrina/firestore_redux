import { useParams } from 'react-router';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import React from 'react';
import {
    Button, Form,
} from 'semantic-ui-react';

import { useFormik } from 'formik';
import { firebaseAuth } from '../selectors';

type EditBoard = {
    name: string;
    description: string;
};

type OwnProps = {
    initialValues: EditBoard;
    submitCallback?: () => void;
    cancelCallback?: () => void;
};

const BoardEditForm = ({ initialValues, submitCallback, cancelCallback }: OwnProps) => {
    const { boardId } = useParams();

    const { uid } = useSelector(firebaseAuth);

    useFirestoreConnect([
        {
            collection: `boards/${boardId}/tasks`,
            where: ['uid', '==', (uid || '')],
        },
        {
            collection: 'boards',
            doc: boardId,
        },
    ]);

    const firestore = useFirestore();

    const formikLogin = useFormik({
        initialValues,
        onSubmit: (values: EditBoard) => {
            firestore.collection('boards').doc(boardId)
                .update(values)
                .then(() => {
                    if (submitCallback) {
                        submitCallback();
                    }
                });
        },
    });

    return (
        <Form onSubmit={formikLogin.handleSubmit}>
            <Form.Field>
                <label htmlFor="name">Board name</label>
                <input
                    id="name"
                    placeholder="name"
                    name="name"
                    type="text"
                    onChange={formikLogin.handleChange}
                    value={formikLogin.values.name}
                />
            </Form.Field>
            <Form.Field>
                <label htmlFor="description">Board description</label>
                <textarea
                    id="description"
                    placeholder="description"
                    name="description"
                    onChange={formikLogin.handleChange}
                    value={formikLogin.values.description}
                />
            </Form.Field>
            <Button onClick={cancelCallback}>Cancel</Button>
            <Button type="submit" primary>Save</Button>
        </Form>
    );
};

export default BoardEditForm;
