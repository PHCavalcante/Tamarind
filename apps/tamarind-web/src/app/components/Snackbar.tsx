"use client";

import { UseSnackbarContext } from "@/hooks/snackbarContext";
import { useEffect } from "react";

type responseTypes = {
  [key: string]: string;
};
const snackbarStyles = {
  Delete: "border-l-red-500",
    Finished: "border-l-green-500",
    Add: "border-l-blue-500",
    Update: "border-l-yellow-500",
    Note: "border-l-purple-500",
    List: "border-l-teal-500",
    UpdateNote: "border-l-pink-500",
    DeleteNote: "border-l-red-800",
    UpdateList: "border-l-orange-500",
    DeleteList: "border-l-red-700",
    routineAdded: "border-l-green-600",
    routineDeleted: "border-l-red-600",
}
export default function Snackbar() {
    const { openSnackbar, setOpenSnackbar, snackbarMessage } = UseSnackbarContext();
 
    function handleSnackbarStyles(){
      return snackbarStyles[snackbarMessage as keyof typeof snackbarStyles];
    }; 

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
      routineAdded: "Routine added successfully!",
      routineDeleted: "Routine deleted successfully!",
      error: "An error occurred, please try again.",
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
          ? `absolute opacity-100 z-10 bottom-8 right-4 p-4 select-none bg-gray-800 text-white transition-all duration-500 ease-in-out rounded-lg border-l-8 ${handleSnackbarStyles()} animate-snackBarIn`
          : "absolute opacity-0 pointer-events-none animate-snackBarOut"
      }
    >
      <span>{handleAction()}</span>
    </div>
  );
}
