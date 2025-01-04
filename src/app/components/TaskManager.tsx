"use client";

import { UseTaskContext } from "@/hooks/taskContext";
import TaskMenu from "./TaskMenu";
import DefaultTaskMenu from "./DefaultTaskMenu";
import TaskMenuBlank from "./TaskMenuBlank";

export default function TaskManager() {
  const { selectedTask } = UseTaskContext();

  return selectedTask == "List" ? (
    <TaskMenuBlank action="List" />
  ) : selectedTask == "Note" ? (
    <TaskMenuBlank action="Note" />
  ) : selectedTask ? (
    <TaskMenu />
  ) : (
    <DefaultTaskMenu />
  );
}
