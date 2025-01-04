"use client";

import taskTypes from "@/types/taskTypes";
import { createContext, useContext, useState } from "react";

interface TaskContextProps {
    selectedTask: taskTypes | string | null;
    setSelectedTask: (task: taskTypes| "List" | "Note" |  null ) => void;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider = ({ children } : { children: React.ReactNode }) => {
    const [selectedTask, setSelectedTask] = useState<taskTypes | string | null>(null);
    
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