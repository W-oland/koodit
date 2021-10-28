import patients from '../data/patients';

import { patientsEntry, nonSensitivePatientsEntry, newPatientEntry } from '../types';

import {v1 as uuid} from 'uuid';
const id: string = uuid();

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

const findById = (id: string): patientsEntry | undefined => { // <-- huom id string eikä number toisin kuin materiaaleissa!
    const entry = patients.find(p => p.id === id);
    return entry;
};

const addEntry = (entry: newPatientEntry): patientsEntry => {
    const newPatientEntry = {
        id: id,
        ...entry
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getEntries,
    addEntry,
    getNonSensitiveEntries,
    findById
};
