"use client";

import { UseTaskContext } from "@/hooks/taskContext";
import TaskMenu from "./TaskMenu";
import DefaultTaskMenu from "./DefaultTaskMenu";
import TaskMenuBlank from "./TaskMenuBlank";
import Kanban from "./Kanban";
import { ViewType } from "@/types/dataTypes";

export default function TaskManager() {
  const { selectedTask } = UseTaskContext();

  if (!selectedTask) return <DefaultTaskMenu />;

  if (typeof selectedTask === "string") {
    switch (selectedTask as ViewType) {
      case "List":
        return <TaskMenuBlank action="List" />;
      case "Note":
        return <TaskMenuBlank action="Note" />;
      case "Kanban":
        return <Kanban />;
      default:
        return <DefaultTaskMenu />;
    }
  }

  if (
    typeof selectedTask === "object" &&
    ("title" in selectedTask || "description" in selectedTask)
  ) {
    return <TaskMenu />;
  }

  return <DefaultTaskMenu />;
}
