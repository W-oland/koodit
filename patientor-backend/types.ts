
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
}

export type nonSensitivePatientsEntry = Omit<patientsEntry, 'ssn'>;

export type newPatientEntry = Omit<patientsEntry, 'id'>;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}