"use client";

import { createContext, useContext, useState } from "react";

interface Task {
    id: string;
    title: string;
    description: string;
};

interface TaskContextProps {
    selectedTask: Task | null;
    setSelectedTask: (task: Task | null ) => void;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider = ({ children } : { children: React.ReactNode }) => {
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    
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