"use client";

import { createContext, useContext, useState } from "react";
import { SelectedTaskType } from "@/types/dataTypes";

interface TaskContextProps {
  selectedTask: SelectedTaskType;
  setSelectedTask: React.Dispatch<React.SetStateAction<SelectedTaskType>>;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedTask, setSelectedTask] = useState<SelectedTaskType>(null);

  return (
    <TaskContext.Provider value={{ selectedTask, setSelectedTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const UseTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw Error("useTaskContext must be used inside of TaskProvider");
  }
  return context;
};
