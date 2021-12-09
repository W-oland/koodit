import { State } from "./state";
import { Patient, Diagnosis } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
    type: "SET_PATIENT"; // <-- haetaan yksittäisen potilaan tiedot
    payload: Patient;
  }
  | {
    type: "SET_DIAGNOSIS_LIST";
    payload: Diagnosis[];
};

export const setPatient_AC = (patientFromApi: Patient): Action => { // <-- AC = Action Creator
  return {
      type: "SET_PATIENT",
      payload: patientFromApi
  };
};

export const setPatientList_AC = (patientListFromApi: Patient[]): Action => {
  return {
    type:"SET_PATIENT_LIST",
    payload: patientListFromApi
  };
};

export const setDiagnosisList_AC = (diagnosisListFromApi: Diagnosis[]): Action => {
  return {
    type:"SET_DIAGNOSIS_LIST",
    payload: diagnosisListFromApi
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT":
      return {
        ...state,
        patient: action.payload
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis}),
            {}
          ),
          ...state.diagnosis
        }
      };
    default:
      return state;
  }
};
