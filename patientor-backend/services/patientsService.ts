import {v4 as uuid} from 'uuid';
import patients from '../data/patients';

import { patientsEntry, nonSensitivePatientsEntry, newPatientEntry, entryWithoutID, entry } from '../types';

//const id: string = uuid(); // ANTAA KAIKILLE SAMAN ID:N!!!!

let updatedPatients = [...patients]; // <-- hassu ratkaisu. addEntryssä joudutaan päivittämään listan instanssi, joten siksi tämä

const getEntries = (): Array <patientsEntry> => {
    return updatedPatients;
};

const getNonSensitiveEntries = (): Array<nonSensitivePatientsEntry> => {
    return updatedPatients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const findById = (id: string): patientsEntry | undefined => { // <-- huom id string eikä number toisin kuin materiaaleissa!
    const entry = updatedPatients.find(p => p.id === id);
    /*if (!entry?.entries) {
        entry = { ...entry, entries: [] } as patientsEntry;
    }*/
    return entry;
};

const addPatient = (entry: newPatientEntry): patientsEntry => {
    const newPatientEntry = {
        id: uuid(),
        ...entry
    };
    updatedPatients.push(newPatientEntry);
    return newPatientEntry;
};

const addEntry = (patient: patientsEntry, entry: entryWithoutID): patientsEntry => {
    const newEntry: entry = { ...entry, id: uuid() }; // <-- id:uuid() korjasi ongelman, jossa kaikilla SAMA ID!
    console.log(newEntry.id);
    const updatedPatient = { ...patient, entries: patient.entries.concat(newEntry)};
    //const newPatients = patients.map(p => p.id === updatedPatient.id ? updatedPatient : p);
    updatedPatients = updatedPatients.map(p => p.id === updatedPatient.id ? updatedPatient : p);
    return updatedPatient;
};

export default {
    getEntries,
    addPatient,
    getNonSensitiveEntries,
    findById,
    addEntry
};
