import React from 'react';
import { useParams } from 'react-router';
import { useStateValue } from '../state';
import { Patient } from '../types';
import { Icon } from 'semantic-ui-react';
import { apiBaseUrl } from '../constants';
import axios from 'axios';

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
                dispatch({ type:"SET_PATIENT", payload: patientFromApi });
                console.log(dispatch);
            } catch (e) {
                console.error(e);
            }
        };
        void fetchPatient();
    }, [dispatch]);

    return (
        <div>
            <h2> {patient?.name} <Icon name='mars'/> </h2>
            <p>ssn: {patient?.ssn}</p>
            <p>occupation: {patient?.occupation}</p>
        </div>
    );

};

export default PatientDetailPage;