import React, { ReactNode, useState } from 'react';
import {
    Button, Form, Modal,
} from 'semantic-ui-react';
import { useFormik } from 'formik';


type OwnProps = {
    onSubmit: (arg0: any) => void;
    button: ReactNode;
    submitButtonText: string;
    fields: FieldProps[];
    heading?: string;
};

type Option = {
    value: any;
    label: string;
};

type FieldProps = {
    name: string;
    type: string;
    id?: string;
    placeholder?: string;
    label?: string;
    initialValue?: string;
    required?: boolean;
    options?: Option[];
};

const ModalForm = ({
    onSubmit, button, submitButtonText, fields, heading = '',
}: OwnProps) => {
    const [open, setOpen] = useState(false);

    const onOpen = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const formInitialValues = (fieldsArray: FieldProps[]): {[key: string]: string} => {
        const initialValues: any = {};

        fieldsArray.map((field: FieldProps) => {
            initialValues[field.name] = field.initialValue || '';
            return null;
        });

        return initialValues;
    };
    const initialValues = formInitialValues(fields);

    const {
        handleSubmit, handleChange, values, isValid,
    } = useFormik({
        initialValues,
        onSubmit: (val: any) => {
            // Not working on Enter
            onSubmit(val);
            onClose();
        },
        validate: (val: any) => {
            const validateErrors: any = {};

            fields.map((field) => {
                if (field.required && !val[field.name]) {
                    validateErrors[field.name] = 'required';
                }
                return null;
            });

            return validateErrors;
        },
        isInitialValid: false,
    });

    return (
        <Modal
            trigger={button}
            basic
            size="tiny"
            as={Form}
            onSubmit={handleSubmit}
            open={open}
            onOpen={onOpen}
            onClose={onClose}
        >
            <Modal.Header>{heading}</Modal.Header>
            <Modal.Content scrolling>
                {
                    fields.map((field: FieldProps, i) => (
                        <Form.Field key={field.id || i}>
                            <label htmlFor={field.id}>
                                {`${field.label} ${field.required ? '*' : ''}`}
                            </label>
                            {field.type === 'textarea' && (
                                <textarea
                                    id={field.id}
                                    placeholder={field.placeholder}
                                    name={field.name}
                                    onChange={handleChange}
                                    value={values[field.name]}
                                />
                            )}
                            {field.type === 'select' && (
                                <select
                                    id={field.id}
                                    placeholder={field.placeholder}
                                    name={field.name}
                                    onChange={handleChange}
                                    value={values[field.name]}
                                >
                                    {field.options && field.options.map((option, i) => (
                                        <option key={i} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            )}
                            {(field.type !== 'select' && field.type !== 'textarea') && (
                                <input
                                    id={field.id}
                                    placeholder={field.placeholder}
                                    name={field.name}
                                    type={field.type}
                                    onChange={handleChange}
                                    value={values[field.name]}
                                />
                            )}
                        </Form.Field>
                    ))
                }
            </Modal.Content>
            <Modal.Actions>
                <Button
                    basic
                    inverted
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <Button
                    color="green"
                    basic
                    type="submit"
                    disabled={!isValid}
                >
                    {submitButtonText}
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default ModalForm;
