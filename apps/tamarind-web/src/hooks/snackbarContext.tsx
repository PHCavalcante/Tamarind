"use client";

import { createContext, useContext, useState } from "react";

interface SnackbarContextProps {
  snackbarMessage: string;
  setSnackbarMessage: React.Dispatch<React.SetStateAction<string>>;
  openSnackbar: boolean;
  setOpenSnackbar: React.Dispatch<React.SetStateAction<boolean>>;
}

const SnackbarContext = createContext<SnackbarContextProps | undefined>(
  undefined
);

export const SnackProvider = ({ children }: { children: React.ReactNode }) => {
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  return (
    <SnackbarContext.Provider
      value={{
        snackbarMessage,
        setSnackbarMessage,
        openSnackbar,
        setOpenSnackbar,
      }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};

export const UseSnackbarContext = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw Error("useSnackbarContext must be used inside of SnackProvider");
  }
  return context;
};
