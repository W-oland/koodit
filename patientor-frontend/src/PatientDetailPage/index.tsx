import React from 'react';
import { useParams } from 'react-router';
import { useStateValue } from '../state';
import { Patient, entry } from '../types';
import { Icon } from 'semantic-ui-react';
import { apiBaseUrl } from '../constants';
import axios from 'axios';
import { setPatient_AC } from '../state';

export const PatientDetailPage = () => {
    const [{patient}, ] = useStateValue();
    const {id} = useParams<{id: string}>();
    const [, dispatch] = useStateValue();

    
    React.useEffect( () => {
        const fetchPatient = async () => {
            try {
                const { data: patientFromApi } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`
                );
                //dispatch({ type:"SET_PATIENT", payload: patientFromApi });
                dispatch(setPatient_AC(patientFromApi));
                console.log(dispatch);
            } catch (e) {
                console.error(e);
            }
        };
        void fetchPatient();
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
                {patient?.entries.map((entry: entry) => entry.diagnosisCodes?.map(code => (
                    <li key={code}>{code}</li>
                )))}
            </div>
        </div>
    );

};

export default PatientDetailPage;