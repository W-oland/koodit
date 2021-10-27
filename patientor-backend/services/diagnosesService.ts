import diagnoses from '../data/diagnoses';

import { diagnosesEntry } from '../types';

const getEntries = (): Array<diagnosesEntry> => {
    return diagnoses;
};

const addEntry = () => {
    return null;
};

export default {
    getEntries,
    addEntry
};