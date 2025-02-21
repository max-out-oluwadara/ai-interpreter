"use client";

import React, { createContext, useReducer, useContext, ReactNode } from "react";
import { appReducer, initialState, AppState, AppAction } from "./appReducer";

// ✅ Define Context Type
interface AppContextProps {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

// ✅ Create Context
const AppContext = createContext<AppContextProps | undefined>(undefined);

// ✅ Provider Component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// ✅ Custom Hook to Use Context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
