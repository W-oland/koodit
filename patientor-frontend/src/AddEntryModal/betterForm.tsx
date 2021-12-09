import React from "react";
import { NewEntry } from "../types";
import { Formik, Form, Field } from 'formik';
import { TextField, NumberField, DiagnosisSelection } from './FormField';
import { useStateValue } from '../state';
import { Grid, Button } from "semantic-ui-react";

interface Props {
    onSubmit: (values: NewEntry) => void;
    onCancel: () => void;
}

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnosis }] = useStateValue();
    return (
        <Formik
            initialValues={{
                type: "HealthCheck",
                description: '',
                diagnosisCodes: [],
                date: '',
                specialist: '',
                healthCheckRating: 0
            }}
            onSubmit={onSubmit}
            validate={values => {
                const requiredError = 'Field is required';
                const errors: { [field: string]: string } = {}; // alustavasti tyhjä lista-tyyppinen objekti, joka koostuu string-tyyppisistä merkkijono-alkioista
                if (!values.date) {
                    errors.date = requiredError;
                }
                if (!values.description) {
                    errors.description = requiredError;
                }
                if (!values.diagnosisCodes) {
                    errors.diagnosisCodes = requiredError;
                }
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
                if (!values.type) {
                    errors.type = requiredError;
                }
                if (!values.diagnosisCodes) {
                    errors.diagnosisCodes = requiredError;
                }
                return errors;
            }}
            >
                {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                    return (
                        <Form className="form ui" >
                            <Field 
                            label="Type"
                            placeholder="Type"
                            name="type"
                            component={TextField}
                            />

                            <Field 
                            label="Description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                            />

                            <Field 
                            label="Date"
                            placeholder="Date"
                            name="date"
                            component={TextField}
                            />

                            <Field 
                            label="Specialist"
                            placeholder="Specialist"
                            name="specialist"
                            component={TextField}
                            />

                            <Field 
                            label="HealthCheckRating"
                            placeholder="HealthCheckRating"
                            name="healthCheckRating"
                            component={NumberField}
                            min={0}
                            max={3}
                            />

                            <DiagnosisSelection 
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnosis)}
                            />

                            <Grid>
                                <Grid.Column floated="left" width={5}>
                                    <Button type="button" onClick={onCancel} color="red">
                                        Cancel
                                    </Button>
                                </Grid.Column>
                                <Grid.Column floated="right" width={5}>
                                    <Button
                                        type="submit"
                                        floated="right"
                                        color="green"
                                        disabled={!dirty || !isValid}
                                        >
                                        Add
                                    </Button>
                                </Grid.Column>
                            </Grid>
                        </Form>
                    );
                }}
        </Formik>
    );

};

export default AddEntryForm;