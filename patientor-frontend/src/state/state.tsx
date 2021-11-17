import React, { createContext, useContext, useReducer } from "react";
import { Patient } from "../types";

import { Action } from "./reducer";

export type State = {
  patients: { [id: string]: Patient }; // <-- if 'Patient | undefined', an additional type security is added.
  patient: Patient | undefined // <-- ehkä undefined pitää korvata null
};

const initialState: State = {
  patients: {},
  patient: undefined // <-- ehkä pitäisi olla null
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([ // <-- creates a context object
  initialState,
  () => initialState
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}> {/* <-- provides the context subscription for consuming components */}
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);