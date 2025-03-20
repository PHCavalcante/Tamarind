import { taskTypes, listTypes, noteTypes } from "@/types/dataTypes";

export const isTask = (task: unknown): task is taskTypes =>
  typeof task === "object" &&
  task !== null &&
  "inProgress" in task &&
  "description" in task &&
  ("isCompleted" in task || "scheduleDate" in task);

export const isList = (list: unknown): list is listTypes =>
  typeof list === "object" && list !== null && "tasksCounter" in list;

export const isNote = (note: unknown): note is noteTypes =>
  typeof note === "object" &&
  note !== null &&
  "title" in note &&
  "description" in note &&
  !("isCompleted" in note) &&
  !("scheduleDate" in note);
