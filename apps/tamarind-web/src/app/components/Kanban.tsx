"use client";

import { useEffect, useState, DragEvent } from "react";
import { UseTaskContext } from "@/hooks/taskContext";
import { taskTypes } from "@/types/dataTypes";
import { fetchTasks, updateTask } from "@/services/fetchData";
import { useUserToken } from "@/utils/useUserToken";
import { UseSnackbarContext } from "@/hooks/snackbarContext";

export default function Kanban() {
  const [tasksData, setTasksData] = useState<taskTypes[]>([]);
  const [taskGrabed, setTaskGrabed] = useState<taskTypes & { column: string } | null>(null);
  const { setSelectedTask } = UseTaskContext();
  const getToken = useUserToken();
  const [token, setToken] = useState("");
  const { setOpenSnackbar } = UseSnackbarContext();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getToken();
      if (!response){
        console.error("Failed to fetch token");
        return;
      }
      setToken(response);
      const tasks = await fetchTasks(response);
      setTasksData(tasks);
    }
    fetchData();
  },[]);
  function drag(ev:DragEvent) {
    ev.dataTransfer?.setData("text", (ev.target as HTMLElement).id);
  }

  function drop(ev: DragEvent<HTMLElement>) {
    ev.preventDefault();
    if (!taskGrabed) return;
    const target = ev.currentTarget as HTMLElement;
    if (ev.dataTransfer){
      const data = ev.dataTransfer.getData("text");
      if (document.getElementById(data)?.tagName == "LI" && target.id === taskGrabed.column) return;
    }
    if (target.id == "todo"){ // SetOpenSnackbar below are just for trigger the menu to update the tasks
        taskGrabed.inProgress = false;
        taskGrabed.isCompleted = false;
        taskGrabed.type = "task";
        taskGrabed.column = "todo";
        updateTask(taskGrabed, token);
        setTasksData(prevTasks =>
          prevTasks.map(task =>
            task._id === taskGrabed._id
              ? { ...task, inProgress: false, isCompleted: false }
              : task
          )
        );
        setOpenSnackbar(true);
    } else if (target.id == "inProgress"){
        taskGrabed.inProgress = true;
        taskGrabed.type = "task";
        updateTask(taskGrabed, token);
        taskGrabed.column = "inProgress";
        setTasksData(prevTasks =>
          prevTasks.map(task =>
            task._id === taskGrabed._id
              ? { ...task, inProgress: true }
              : task
          )
        );
        setOpenSnackbar(true);
    } else if (target.id == "done"){
        taskGrabed.inProgress = false;
        taskGrabed.isCompleted = true;
        taskGrabed.type = "task";
        updateTask(taskGrabed, token);
        taskGrabed.column = "done";
        setTasksData(prevTasks =>
          prevTasks.map(task =>
            task._id === taskGrabed._id
              ? { ...task, inProgress: false, isCompleted: true }
              : task
          )
        );
        setOpenSnackbar(true);
    } else return;
  }

  function parseData(taskStatus: "todo" | "inProgress" | "done") {
    if (tasksData.length > 0) {
      return (tasksData.filter(
          (task: taskTypes) =>
            taskStatus == "todo" ?
            task.isCompleted == false && task.inProgress == false
            : taskStatus == "inProgress" ?
            task.inProgress == true
            : task.isCompleted == true 
        )
        .map((task: taskTypes) => {
          const processedTask = {
            _id: task._id,
            title: task.title,
            description: task.description,
            createdAt: task.createdAt,
            isCompleted: task.isCompleted,
            inProgress: task.inProgress,
            type: task.type,
            scheduleDate: task.scheduleDate,
            column: taskStatus == "todo" ? "todo" : taskStatus == "inProgress" ? "inProgress" : "done",
          };
          return (
            <li
              id={processedTask._id}
              className="w-full flex flex-col bg-[var(--paper)] hover:bg-[var(--hoverPaper)] dark:bg-[var(--darkPaper)] dark:text-[var(--darkText)] dark:hover:bg-[var(--darkPaperHover)] rounded p-2 cursor-pointer shadow-md transition-all duration-300 ease-in-out"
              key={processedTask._id}
              data-column={taskStatus}
              onClick={() => setSelectedTask(processedTask)}
              draggable
              onDragStart={(event) => {
                drag(event);
                setTaskGrabed(processedTask);
                event.dataTransfer.setData(
                  "text/plain",
                  event.currentTarget.id
                );
                event.dataTransfer.effectAllowed = "move";
              }}
            >
              <span className="font-semibold text-lg">
                {processedTask.title}
              </span>
              {processedTask.scheduleDate && <span className="text-sm opacity-60">
                Schedule to: {processedTask.scheduleDate}
              </span>}
              {processedTask.createdAt && <span className="text-sm opacity-60">
                Created at: {processedTask.createdAt}
              </span>}
            </li>
          );
        }));
      }else {
        return (
          <span className="font-semibold text-lg m-auto text-gray-400 text-center">
            No tasks to display<br />Try adding some tasks!
          </span>
        );
      }
  }

  function generateKanbanColumn({title,type}: {title: string; type: "todo" | "inProgress" | "done"}) {
    return (
      <div
        className="flex flex-col bg-gradient-to-b from-[var(--foreground)] to-[var(--background)] dark:bg-gradient-to-b dark:from-[var(--darkForeground)] dark:to-[var(--darkBackground)] w-full h-full rounded-2xl items-center transition-all duration-300 ease-in-out border-[var(--border)] hover:shadow-xl hover:border-[var(--hoverBorder)] dark:border-[var(--darkBorder)] dark:hover:border-[var(--darkHoverBorder)] select-none"
        id={type}
      >
        <h2 className="font-bold text-xl mt-1">{title}</h2>
        <ul
          className="flex flex-col w-full h-full gap-4 p-3"
          onDrop={(event) => drop(event)}
          onDragOver={(event) => {
            event.preventDefault();
            const target = event.currentTarget as HTMLElement;
            if (!taskGrabed) return;
            if (target.id === taskGrabed.column) return;
            document.getElementById(target.id)!.style.scale = "1.02";
          }}
          onDragLeave={(event) => {
            event.preventDefault();
            document.getElementById(type)!.style.scale = "1.0";
          }}
          onDropCapture={(event) => {
            event.preventDefault();
            document.getElementById(type)!.style.scale = "1.0";
          }}
          id={type}
        >
          {parseData(type)}
        </ul>
      </div>
    );
  }


  return (
    <div className="flex flex-col w-full h-full bg-[var(--background)] rounded-br-none dark:bg-[var(--darkBackground)] py-[14px] px-3 shadow-lg shadow-gray-500/50 rounded-2xl">
      <div className="grid grid-flow-row grid-cols-1 h-full md:grid-cols-3 gap-4">
        {generateKanbanColumn({title: "To do", type: "todo"})}
        {generateKanbanColumn({title: "In progress", type: "inProgress"})}
        {generateKanbanColumn({title: "Done", type: "done"})}
      </div>
    </div>
  );
}
