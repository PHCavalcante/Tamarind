"use client";

import { UseSnackbarContext } from "@/hooks/snackbarContext";
import { useEffect } from "react";

type responseTypes = {
  Delete: string;
  Finished: string;
  Add: string;
  Update: string;
  Note: string;
  List: string;
  UpdateNote: string;
  UpdateList: string;
  DeleteList: string;
  DeleteNote: string;
};

export default function Snackbar() {
    const { openSnackbar, setOpenSnackbar, snackbarMessage } = UseSnackbarContext();
   
  function handleAction() {
    const responses: responseTypes = {
      Delete: "Task deleted successfully!",
      Finished: "Task completed successfully!",
      Add: "Task successfully added!",
      Update: "Task successfully updated!",
      Note: "Note added successfully!",
      List: "List added successfully!",
      UpdateNote: "Note updated successfully!",
      UpdateList: "List updated successfully!",
      DeleteList: "List deleted successfully!",
      DeleteNote: "Note deleted successfully!",
    };
    return responses[snackbarMessage as keyof responseTypes];
  };

  useEffect(() => {
  if (openSnackbar) {
    const timeout = setTimeout(() => {
      setOpenSnackbar(false);
    }, 3300);

    return () => clearTimeout(timeout);
  }
}, [openSnackbar]);


  return (
    <div
      className={
        openSnackbar
          ? "absolute opacity-100 z-10 top-10 left-1/2 -translate-x-1/2 p-4 bg-gray-800 text-white transition-all duration-500 ease-in-out rounded-tl-lg animate-snackBarIn"
          : "absolute opacity-0 pointer-events-none animate-snackBarOut"
      }
    >
      <span>{handleAction()}</span>
    </div>
  );
}
