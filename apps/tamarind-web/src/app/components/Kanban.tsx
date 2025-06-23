"use client";

// import useStore from "@/services/store";
import { useEffect, useRef, useState, DragEvent } from "react";
import GetUserData from "@/utils/GetUserData";
import { UseTaskContext } from "@/hooks/taskContext";
import { UseSnackbarContext } from "@/hooks/snackbarContext";
import { taskTypes } from "@/types/dataTypes";
import { updateTask } from "@/services/fetchData";
import axios from "axios";

export default function Kanban() {
  // const { tasksData, fetchData } = useStore();
  const [tasksData, setTasksData] = useState<taskTypes[]>([]);
  const { setSelectedTask } = UseTaskContext();
  const taskGrabed = useRef<taskTypes & { column: string}>(null);
  const user = GetUserData();
  const { } = UseSnackbarContext();

  useEffect(() => {
    if(!user) return;
    const fetchData = async () => {
      try{
        const response = await axios.get(
          `https://tamarind-api.onrender.com/tasks/${user.id}`
        );
        const data = response.data;
        setTasksData(data);
      }
      catch (error){
        console.log(error);
      }
    }
    fetchData();
  },[user]);

  function drag(ev:DragEvent) {
    ev.dataTransfer?.setData("text", (ev.target as HTMLElement).id);
  }

  function drop(ev: DragEvent<HTMLElement>) {
    ev.preventDefault();
    if (!taskGrabed.current) return;
    const target = ev.currentTarget as HTMLElement;
    if (ev.dataTransfer){
      const data = ev.dataTransfer.getData("text");
      if (document.getElementById(data)?.tagName == "LI" && target.id === taskGrabed.current!.column) return;
      const draggedElement = document.getElementById(data);
      if (draggedElement){
        target.appendChild(draggedElement);
      }
    }
    if (target.id == "todo"){
        taskGrabed.current!.inProgress = false;
        taskGrabed.current!.isCompleted = false;
        taskGrabed.current!.column = "todo";
        updateTask(taskGrabed.current!);
        // setJustAAction?.(true);
    } else if (target.id == "inProgress"){
        taskGrabed.current!.inProgress = true;
        updateTask(taskGrabed.current!);
        taskGrabed.current!.column = "inProgress";
        // setJustAAction?.(true);
    } else if (target.id == "done"){
        taskGrabed.current!.inProgress = false;
        taskGrabed.current!.isCompleted = true;
        updateTask(taskGrabed.current!);
        taskGrabed.current!.column = "done";
        // setJustAAction?.(true);
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
                taskGrabed.current = processedTask;
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
              <span className="text-sm opacity-60">
                Schedule to: {processedTask.scheduleDate}
              </span>
              <span className="text-sm opacity-60">
                Created at: {processedTask.createdAt}
              </span>
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
        id="todo"
      >
        <h2 className="font-bold text-xl mt-1">{title}</h2>
        <ul
          className="flex flex-col w-full h-full gap-4 p-3"
          onDrop={(event) => drop(event)}
          onDragOver={(event) => {
            const target = event.currentTarget as HTMLElement;
            if (!taskGrabed.current) return;
            if (target.id === taskGrabed.current.column) return;
            event.preventDefault();
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
          id="todo"
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
