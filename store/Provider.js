import { createContext, useReducer } from "react";
import feedbackInitialState from "./initialstates/feedbackInitialState";
import { feedbackListReducer } from "./reducers/feedbackReducer";

export const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
  const [feedbackState, feedbackDispatch] = useReducer(
    feedbackListReducer,
    feedbackInitialState
  );

  return (
    <GlobalContext.Provider
      value={{
        feedbackState,
        feedbackDispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
