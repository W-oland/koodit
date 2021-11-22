import React from 'react';
import { useParams } from 'react-router';
import { useStateValue } from '../state';
import { Patient, entry, Diagnosis } from '../types';
import { Icon } from 'semantic-ui-react';
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

    return (
        <div>
            <h2> {patient?.name} {gender()} </h2>
            <p>ssn: {patient?.ssn}</p>
            <p>occupation: {patient?.occupation}</p>
            <h2>entries</h2>
            <div>{patient?.entries.map((entry: entry) => (
                <p key={entry.id}> {entry.date} {entry.description}</p>
                )
            )}</div>
            <div>
                {patient?.entries.map((entry: entry) => entry.diagnosisCodes?.map((code: string) => (
                    <li key={code}>{code} {diagnosis[code]?.name}</li>
                )))}
            </div>
        </div>
    );

};

export default PatientDetailPage;