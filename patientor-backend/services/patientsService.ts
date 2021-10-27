import patients from '../data/patients';

import { patientsEntry } from '../types';

const getEntries = (): Array <patientsEntry> => {
    return patients;
};

export default {
    getEntries
};
