import { newPatientEntry, Gender, entry, entryWithoutID, newBaseEntry, diagnosesEntry, healthCheckRating, Discharge, SickLeave } from "./types";

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries: unknown };

const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation, entries }:  Fields): newPatientEntry => {
    const newEntry: newPatientEntry = {
        name: parseName(name),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        ssn: parseSSN(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
        entries: parseEntries(entries) || [] // <-- [] voi olla tarpeeton. mahdollisesti poistettavissa.
    };
    return newEntry;
};

const parseEntries = (entries: unknown): entry[] => {
    if (!entries) return entries as entry[];
    if ((entries as entry[]).map((entry: any) => !isEntry(entry))) {
        throw new Error ('incorrect entry type');
    }
    return entries as entry[];
};

const parseEntryWithoutID = (entry: unknown): entryWithoutID => {
    if (!entry || !isEntry(entry)) {
        throw new Error ('incorrect entry');
    }
    return entry;
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

export const toNewEntry= (object: any): entryWithoutID => {
    const validEntry = parseEntryWithoutID(object);
    if(!validEntry) throw new Error ('entry not valid');
    
    const newBaseEntry: newBaseEntry = {
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes) || [],
    };

    switch(validEntry.type) {
        case "HealthCheck":
            return {
                ...newBaseEntry,
                type: validEntry.type,
                healthCheckRating: parseHealthCheckRatings(validEntry.healthCheckRating)
            };

        case "Hospital":
            return {
                ...newBaseEntry,
                type: validEntry.type,
                discharge: parseDischarge(validEntry.discharge)
            };

        case "OccupationalHealthcare":
            return {
                ...newBaseEntry,
                type: validEntry.type,
                employerName: parseName(validEntry.employerName),
                sickLeave: parseSickLeave(validEntry.sickLeave)
            };

        default:
            return assertNever(validEntry);
    }
};

const parseDescription = (description: unknown): string => {
    if(!description || !isString(description)) {
        throw new Error ('incorrect or missing description');
    }
    return description;
};

const parseDate = (date: unknown): string => {
    if(!date || !isString(date) || !isDate(date)) {
        throw new Error ('incorrect or missing date');
    }
    return date;
};

const parseSpecialist = (specialist: unknown): string => {
    if(!specialist || !isString(specialist)) {
        throw new Error ('incorrect or missing specliast');
    }
    return specialist;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<diagnosesEntry['code']> => {
    if(!Array.isArray(diagnosisCodes) || !diagnosisCodes.every((code) => isString(code))) {
        throw new Error ('invalid diagnosis codes');
    }
    return diagnosisCodes as Array<diagnosesEntry['code']>;
};

const parseHealthCheckRatings = (healthCheckRating: unknown): healthCheckRating => {
    if(!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
        throw new Error ('incorrect or missing healthcheck rating');
    }
    return healthCheckRating;
};

const isHealthCheckRating = (param: any): param is healthCheckRating => {
    return Object.values(healthCheckRating).includes(param as string); // ...as string ehkä väärin
};

//build parsers for discharge, employername and sickleave

const parseDischarge = (discharge: any): Discharge => {
    if(!discharge || !isDate(discharge.date as string) || !isString(discharge.criteria) ) {
        throw new Error ('missing or invalid discharge, date, or criteria');
    }
    return discharge as Discharge; 
};

const parseSickLeave = (sickLeave: any): SickLeave => {
    if(!sickLeave) {
        throw new Error ('missing sickleave');
    }
    return {
        startDate: parseDate(sickLeave.startDate),
        endDate: parseDate(sickLeave.endDate),
    };
};

const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

export default toNewPatientEntry;