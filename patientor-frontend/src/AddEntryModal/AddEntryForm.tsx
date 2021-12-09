import React from 'react';
import { Field, Formik, Form } from "formik";
import { Grid, Button } from 'semantic-ui-react';
import { DiagnosisSelection } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { NewEntry } from '../types';
import { TextField } from '../AddPatientModal/FormField';

export type EntryFormValues = Omit<NewEntry, "id" | "type">;

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnosis }] = useStateValue();
  
    return (
      <Formik
      initialValues={{
          description:"",
          date:"",
          specialist:"",
          diagnosisCodes: [],
          healthCheckRating: -1,
          employerName: "",
          sickLeave: {
            startDate: "", 
            endDate: ""
          },
          discharge: {
            date: "",
            criteria: ""
          },
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        /*if (!values.type) {
          errors.name = requiredError;
        }*/
        if (!values.description) {
          errors.ssn = requiredError;
        }
        if (!values.date) {
          errors.dateOfBirth = requiredError;
        }
        if (!values.specialist) {
          errors.occupation = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
  
        return (
          <Form className="form ui">
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
  
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosis)}
            />   

            <Field
              label = "HealthCheckRating"
              placeholder="HealthCheckRating"
              name="healthCheckRating"
              component={TextField}
            /> 

            <Field 
              label="Employer Name"
              placeholder="Employer Name"
              name="employerName"
              component={TextField}
            />

            <Field 
              label="Sickleave Start Date"
              placeholder="Sickleave start date"
              name="sickLeaveStartDate"
              component={TextField}
            />

            <Field 
              label="Sickleave End Date"
              placeholder="Sickleave end date"
              name="sickLeaveEndDate"
              component={TextField}
            />

            <Field 
            label="Discharge Date"
            placeholder="Discharge Date"
            name="DischargeDate"
            component={TextField}
            />

            <Field 
            label="Discharge criteria"
            placeholder="Discharge criteria"
            name="DischargeCriteria"
            component={TextField}
            
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