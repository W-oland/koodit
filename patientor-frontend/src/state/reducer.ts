import { State } from "./state";
import { Patient } from "../types";

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
    default:
      return state;
  }
};
