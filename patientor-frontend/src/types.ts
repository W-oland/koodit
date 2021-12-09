
export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export enum EntryTypes {
  HealthCheck = "HealthCheck",
  OccupationalHealthcare = "OccupationalHealthcare",
  Hospital = "Hospital"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: entry[];
}

export interface baseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
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

export type NewEntry = 
| Omit<hospitalEntry, "id">
| Omit<occupationalHealthcareEntry, "id">
| Omit <healthCheckEntry, "id">;

type unionOmit<T, K extends string | number | symbol > = T extends unknown ? Omit<T,K> : never;

export type entryWithoutID = unionOmit<entry, 'id'>;

export type nonSensitivePatientsEntry = Omit<Patient, 'ssn' | 'entries' >;

export type newPatientEntry = Omit<Patient, 'id'>;
