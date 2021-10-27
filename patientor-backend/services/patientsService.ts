import patients from '../data/patients';

import { patientsEntry, nonSensitivePatientsEntry } from '../types';

const getEntries = (): Array <patientsEntry> => {
    return patients;
};

const getNonSensitiveEntries = (): Array<nonSensitivePatientsEntry> => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addEntry = () => {
    return null;
};

export default {
    getEntries,
    addEntry,
    getNonSensitiveEntries
};
