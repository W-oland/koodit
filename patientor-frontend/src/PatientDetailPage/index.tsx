import React from 'react';
import { useParams } from 'react-router';
import { useStateValue } from '../state';
import { Patient, entry, Diagnosis } from '../types';
import { Icon, Segment } from 'semantic-ui-react';
import { apiBaseUrl } from '../constants';
import axios from 'axios';
import { setPatient_AC, setDiagnosisList_AC } from '../state';

export const PatientDetailPage = () => {
    const [{patient, diagnosis}, ] = useStateValue();
    const {id} = useParams<{id: string}>();
    const [, dispatch] = useStateValue();
    //const diagnosisCodes = patient?.entries.map((entry) => entry.diagnosisCodes?.map((code) => code));
    //const diagnoses = Object.values(diagnosis).map((diagnosis: Diagnosis) => diagnosis);
    //console.log(diagnoses);
    //console.log(diagnosisCodes);
    //console.log(patient,diagnosis);
    //const sample = diagnosis['M24.2'];
    //console.log(sample?.latin);
    // --- aika paljon upposi työtä tähänkin. Lopulta ratkaisu löytyi seuraavasti:
    // --- patient?.entries.map((entry: entry) => entry.diagnosisCodes?.map((code: string) => (
    // --- <li key={code}>{code} {diagnosis[code]?.name}</li>
    // ---  )))}


    React.useEffect( () => {
        const fetchPatient = async () => {
            try {
                const { data: patientFromApi } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`
                );
                //dispatch({ type:"SET_PATIENT", payload: patientFromApi });
                dispatch(setPatient_AC(patientFromApi));
            } catch (e) {
                console.error(e);
            }
        };
        void fetchPatient();
    }, [dispatch]);

    React.useEffect( () => {
        const fetchDiagnoses = async () => {
            try {
                const { data: diagnosisFromApi } = await axios.get<Diagnosis[]>(
                    `${apiBaseUrl}/diagnoses`
                );
                dispatch(setDiagnosisList_AC(diagnosisFromApi));
            } catch (e) {
                console.error(e);
            }
        };
        void fetchDiagnoses();
    }, [dispatch]);

    const gender = () => { // <-- outoa ettei mikään muu toimi. Pakko olla parempi logiikka. 
        if (patient?.gender === 'male') {
            return <Icon name='mars'/>;
        } else if (patient?.gender === 'female') {
            return <Icon name='venus' />;
        } else if (patient?.gender === 'other') {
            return <Icon name='genderless' />;
        } else {
            return null;
        }
    };

    const HeartColour = (entry: entry) => {
        if (entry.type === "HealthCheck" && entry.healthCheckRating === 0) {
            return <Icon name='heart' color='green' />;
        } else if (entry.type === "HealthCheck" && entry.healthCheckRating === 1) {
            return <Icon name='heart' color='yellow' />;
        } else if (entry.type === "HealthCheck" && entry.healthCheckRating === 2) {
            return <Icon name='heart' color='red' /> ;
        } else if (entry.type === "HealthCheck" && entry.healthCheckRating === 3) {
            return <Icon name='heart' color='black' /> ;
        } else {
            return null;
        }
    };

    const EntryDetails: React.FC<{entry: entry}> = ({ entry }) => {
        switch (entry.type) {
            case "Hospital":
                return (
                    <Segment>
                        <h3>{entry.date} <Icon name='hospital' /> </h3>
                        <p>{entry.description} </p>
                        {HeartColour(entry)}
                        {entry.diagnosisCodes?.map((code: string) => (
                            <ul key={code}>{code} {diagnosis[code]?.name}</ul>
                        ))}
                    </Segment>
                );
            case "HealthCheck":
                return (
                    <Segment>
                        <h3>{entry.date} <Icon name='stethoscope' /> </h3>
                        <p>{entry.description} </p>
                        {HeartColour(entry)}
                        {entry.diagnosisCodes?.map((code: string) => (
                            <ul key={code}>{code} {diagnosis[code]?.name}</ul>
                        ))}
                    </Segment>
                );
            case "OccupationalHealthcare":
                return (
                    <Segment>
                        <h3>{entry.date} <Icon name='user md' /> </h3>
                        <p>{entry.description} </p>
                        {HeartColour(entry)}
                        {entry.diagnosisCodes?.map((code: string) => (
                            <ul key={code}>{code} {diagnosis[code]?.name}</ul>
                        ))}
                    </Segment>
                );
            default:
                return assertNever(entry);
        }
    };

    const assertNever = (value: never): never => {
        throw new Error(
            `Ùnhandleed discriminated union member ${JSON.stringify(value)}`
        );
    };

    return (
        <div>
            <h2> {patient?.name} {gender()} </h2>
            <p>ssn: {patient?.ssn}</p>
            <p>occupation: {patient?.occupation}</p>
            <h2>entries</h2>

            {/*<div>{patient?.entries.map((entry: entry) => (
                <p key={entry.id}> {entry.date} {entry.description}</p>
                )
            )}</div>
            <div>
                {patient?.entries.map((entry: entry) => entry.diagnosisCodes?.map((code: string) => (
                    <li key={code}>{code} {diagnosis[code]?.name}</li>
                )))}
                </div>*/}

                <div>
                {patient?.entries.map((entry: entry) => (
                    <ul key={entry.id}>
                        <EntryDetails entry={entry} />
                    </ul>
                ))}
            </div>
        </div>
    );

};

export default PatientDetailPage;