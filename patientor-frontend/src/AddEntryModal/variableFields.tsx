import React from 'react';
import { Field } from 'formik';
import { EntryTypes } from '../types';
import { NumberField, TextField  } from './FormField';

interface Props {
    entryType: EntryTypes
}

const VariableFields: React.FC<Props> = ({ entryType }) => {
    switch (entryType) {
        case EntryTypes.HealthCheck:
            return (
                <Field 
                label="HealthCheckRating"
                placeholder="HealthCheckRating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
                />
            );
        case EntryTypes.Hospital:
            return (
                <>
                <Field 
                label="Date"
                placeholder="Date"
                name="date"
                componen={TextField}
                />

                <Field 
                label="Criteria"
                placeholder="Criteria"
                name="criteria"
                component={TextField}
                />
                </>
            );
        case EntryTypes.OccupationalHealthcare:
            return (
                <>
                <Field 
                label="EmployerName"
                placeholder="EmployerName"
                name="employerName"
                component={TextField}
                />

                <Field 
                label="StartDate"
                placeholder="StartDate"
                name="startDate"
                componen={TextField}
                />

                <Field 
                label="EndDate"
                placeholder="EndDate"
                name="endDate"
                componen={TextField}
                />
                </>
            );
        default:
            return null;       
    }
};

export default VariableFields;