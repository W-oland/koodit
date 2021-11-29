
export interface diagnosesEntry {
    code: string;
    name: string;
    latin?: string;
}

export interface patientsEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: entry[];
}

export type newPatientEntry = Omit<patientsEntry, 'id'>;

export interface baseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<diagnosesEntry['code']>;
}

export type newBaseEntry = Omit<baseEntry, 'id'>; // <-- käytetään parserissa. ei haluta käyttäjältä id:tä. Sama logiikka kuin newPatientsEntry.
export type newHealthCheckEntry = Omit<healthCheckEntry, 'id'>;
export type newHospitalEntry = Omit<hospitalEntry, 'id'>;
export type newOccupationalHealthcareEntry = Omit<occupationalHealthcareEntry, 'id'>;

export enum healthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export interface healthCheckEntry extends baseEntry {
    type: "HealthCheck";
    healthCheckRating: healthCheckRating;
}

export interface hospitalEntry extends baseEntry {
    type: 'Hospital';
    discharge: Discharge;
}

export interface Discharge {
    date: string;
    criteria: string;
}

export interface occupationalHealthcareEntry extends baseEntry {
    type: 'OccupationalHealthcare';
    employerName: string;
    sickLeave?: SickLeave;
}

export interface SickLeave {
    startDate: string;
    endDate: string;
}

export type entry =
| hospitalEntry
| occupationalHealthcareEntry
| healthCheckEntry;

type unionOmit<T, K extends string | number | symbol > = T extends unknown ? Omit<T,K> : never;

export type entryWithoutID = unionOmit<entry, 'id'>;

export type nonSensitivePatientsEntry = Omit<patientsEntry, 'ssn' | 'entries' >;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}