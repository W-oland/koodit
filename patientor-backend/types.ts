
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
    gender: string;
    occupation: string;
}

export type nonSensitivePatientsEntry = Omit<patientsEntry, 'ssn'>;

export type newPatientEntry = Omit<patientsEntry, 'id'>;