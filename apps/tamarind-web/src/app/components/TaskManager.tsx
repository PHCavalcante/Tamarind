"use client";

import { UseTaskContext } from "@/hooks/taskContext";
import TaskMenu from "./TaskMenu";
import DefaultTaskMenu from "./DefaultTaskMenu";
import TaskMenuBlank from "./TaskMenuBlank";
import Kanban from "./Kanban";

export default function TaskManager() {
  const { selectedTask } = UseTaskContext();
  return typeof selectedTask === "string" && selectedTask === "List" ? (
    <TaskMenuBlank action="List" />
  ) : typeof selectedTask === "string" && selectedTask == "Note" ? (
    <TaskMenuBlank action="Note" />
  ) : typeof selectedTask == "string" && selectedTask == "Kanban" ? (
    <Kanban />
  ) : selectedTask !== null ? (
    <TaskMenu />
  ) : (
    <DefaultTaskMenu />
  );
}
