"use client";

import { combination, listTypes, noteTypes, taskTypes } from "@/types/dataTypes";
import { createContext, useContext, useState } from "react";

interface TaskContextProps {
    selectedTask: combination | null;
    setSelectedTask: React.Dispatch<React.SetStateAction<combination | taskTypes | listTypes | noteTypes | string | null>>;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider = ({ children } : { children: React.ReactNode }) => {
    const [selectedTask, setSelectedTask] = useState<combination  | null>(null);
    
    return(
        <TaskContext.Provider value={{ selectedTask, setSelectedTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export const UseTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context){
        throw Error("useTaskContext must be used inside of TaskProvider");
    }
    return context;
}