import React, { ReactNode } from 'react';
import {
    Button, Form, Modal,
} from 'semantic-ui-react';
import { useFormik } from 'formik';


type OwnProps = {
    handleSubmit: (arg0: any) => void;
    button: ReactNode;
    submitButtonText: string;
    fields: FieldProps[];
    heading?: string;
};

type FieldProps = {
    id: string;
    placeholder: string;
    name: string;
    type: string;
    label: string;
    initialValue?: string;
};

const ModalForm = ({
    handleSubmit, button, submitButtonText, fields, heading = '',
}: OwnProps) => {

    const formInitialValues = (fields: FieldProps[]) => {
        const initialValues = {};
        fields.map((field: FieldProps) => {
            // @ts-ignore
            initialValues[field.name] = field.initialValue || '';
        });
        return initialValues
    };
    const initialValues = formInitialValues(fields);

    console.log('initialValues', initialValues);
    const formik = useFormik({
        initialValues: {
            [fields[0].name]: '',
        },
        // initialValues: initialValues,
        onSubmit: (values: any) => {
            handleSubmit(values);
        },
    });

    return (
        <Modal
            trigger={button}
            basic
            size="tiny"
            as={Form}
            onSubmit={formik.handleSubmit}
            inverted
        >
            <Modal.Header>{heading}</Modal.Header>
            <Modal.Content scrolling>
                {
                    fields.map((field: FieldProps) => (
                        <Form.Field key={field.id}>
                            <label htmlFor={field.id}>{field.label}</label>
                            <input
                                id={field.id}
                                placeholder={field.placeholder}
                                name={field.name}
                                type={field.type}
                                onChange={formik.handleChange}
                                value={formik.values[field.name]}
                            />
                        </Form.Field>
                    ))
                }
            </Modal.Content>
            <Modal.Actions>
                <Button
                    color="green"
                    basic
                    type="submit"
                >
                    {submitButtonText}
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default ModalForm;
