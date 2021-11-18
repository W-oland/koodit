
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

export interface baseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<diagnosesEntry['code']>;
}

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
    discharge: {
        date: string;
        criteria: string;
    }
}

export interface occupationalHealthcareEntry extends baseEntry {
    type: 'OccupationalHealthcare';
    employerName: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
    } // <-- yhdessä data-instanssissa sickLeave ei löydy, joten siksi ehdollinen "?"
}

export type entry =
| hospitalEntry
| occupationalHealthcareEntry
| healthCheckEntry;

type unionOmit<T, K extends string | number | symbol > = T extends unknown ? Omit<T,K> : never;

export type entryWithoutID = unionOmit<entry, 'id'>;

export type nonSensitivePatientsEntry = Omit<patientsEntry, 'ssn' | 'entries' >;

export type newPatientEntry = Omit<patientsEntry, 'id'>;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}