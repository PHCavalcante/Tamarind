"use client";

import { UseTaskContext } from "@/hooks/taskContext";
import TaskMenu from "./TaskMenu";
import DefaultTaskMenu from "./DefaultTaskMenu";

export default function TaskManager(){
    const { selectedTask } = UseTaskContext();

    return (
        selectedTask ? <TaskMenu/> : <DefaultTaskMenu/>
    );
}