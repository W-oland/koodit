import { newPatientEntry, Gender, entry } from "./types";

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries: unknown };

const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation, entries }:  Fields): newPatientEntry => {
    const newEntry: newPatientEntry = {
        name: parseName(name),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        ssn: parseSSN(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
        entries: parseEntries(entries)
    };
    return newEntry;
};

const parseEntries = (entries: unknown): entry[] => {
    if (!entries || (entries as entry[]).map((entry: any) => !isEntry(entry))) {
        throw new Error ('incorrect entry type');
    }
    return entries as entry[];
};

const isEntry = (param: any): param is entry=> { // <-- korjaa tämä. Pakko olla parempikin logiikka
    const hc: boolean = param.type === 'HealthCheck';
    const hosp: boolean = param.type === 'Hospital';
    const ohc: boolean = param.type === 'OccupationalHealthcare';
    return hc || hosp || ohc;
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth))  {
        throw new Error('Incorrect or missing date: ' + dateOfBirth);
    }
    return dateOfBirth;
};

const parseSSN = (ssn: unknown): string => {
    if(!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing social security number');
    }
    return ssn;
};

const parseGender = (gender: unknown): Gender => {
    if(!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender' + gender);
    }
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if(!occupation || !isString(occupation)) {
        throw new Error('Incorrect of missing occupation');
    }
    return occupation;
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

export default toNewPatientEntry;