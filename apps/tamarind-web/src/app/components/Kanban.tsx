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
  const taskGrabed = useRef<taskTypes>(null);
  const user = GetUserData();
  const {openSnackbar} = UseSnackbarContext();

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
  },[user, openSnackbar])

  function drag(ev:DragEvent) {
    ev.dataTransfer?.setData("text", (ev.target as HTMLElement).id);
    // console.log(`elemento arrastado: ${(ev.currentTarget! as HTMLElement).id}`);
  }

  function drop(ev: DragEvent<HTMLElement>) {
    ev.preventDefault();
    const target = ev.currentTarget;
    console.log(`alvo do drop: ${target.id}`);

    if (ev.dataTransfer){
      const data = ev.dataTransfer.getData("text");
      console.log(`data recebido: ${data}`);

      const draggedElement = document.getElementById(data);
      if (draggedElement){
        target.appendChild(draggedElement);
      }else {
        console.log(`elemento com id ${data} não encontrado no dom`)
      }
    }
    if (target.id == "todo"){
        taskGrabed.current!.inProgress = false;
        taskGrabed.current!.isCompleted = false;
        console.log(taskGrabed);
        updateTask(taskGrabed.current!)
    } else if (target.id == "inProgress"){
        taskGrabed.current!.inProgress = true;
        console.log(taskGrabed);
        updateTask(taskGrabed.current!);
    } else if (target.id == "done"){
        taskGrabed.current!.inProgress = false;
        taskGrabed.current!.isCompleted = true;
        console.log(taskGrabed);
        updateTask(taskGrabed.current!);
    } else return;
  }

  function parseData(taskStatus: "todo" | "inProgress" | "done") {
    return (tasksData &&
      tasksData
        .filter(
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
          };
          return (
            <li
              id={processedTask._id}
              className="w-full flex flex-col bg-[#e4dede] rounded p-2 cursor-pointer shadow-md hover:bg-[#d3cdcd]"
              key={processedTask._id}
              onClick={() => setSelectedTask(processedTask)}
              draggable
              onDragStart={(event) => {
                drag(event);
                taskGrabed.current = processedTask;
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
  }

  return (
    <div className="flex flex-col w-full h-full bg-[#F3EDED] py-[14px] px-3 shadow-lg shadow-gray-500/50 rounded-2xl">
      {/* <h1 className="text-center text-3xl font-bold my-2">Kanban</h1> */}
      <div className="grid grid-flow-row grid-cols-1 h-full md:grid-cols-3 gap-4">
        <div
          className="flex flex-col bg-[#FFF9F9] w-full h-full rounded-2xl items-center shadow-lg border-2 border-solid transition-all duration-300 ease-in-out border-gray-300 hover:shadow-xl hover:border-gray-400"
          id="todo"
        >
          <h2 className="font-bold text-xl mt-1">Todo</h2>
          <ul
            className="flex flex-col w-full h-full gap-4 p-3"
            onDrop={(event) => drop(event)}
            onDragOver={(event) => {
              event.preventDefault();
              document.getElementById("todo")!.style.scale = "1.05";
            }}
            onDragLeave={(event) => {
              event.preventDefault();
              document.getElementById("todo")!.style.scale = "1.0";
            }}
            onDropCapture={(event) => {
              event.preventDefault();
              document.getElementById("todo")!.style.scale = "1.0";
            }}
            id="todo"
          >
            {parseData("todo")}
          </ul>
        </div>
        <div
          className="flex flex-col bg-[#FFF9F9] w-full h-full rounded-2xl items-center shadow-lg border-2 border-solid border-gray-300 transition-all duration-300 ease-in-out hover:shadow-xl hover:border-gray-400"
          id="inProgress"
        >
          <h2 className="font-bold text-xl mt-1">In progress</h2>
          <ul
            className="flex flex-col w-full h-full gap-4 p-3"
            onDrop={(event) => drop(event)}
            onDragOver={(event) => {
              event.preventDefault();
              document.getElementById("inProgress")!.style.scale = "1.05";
            }}
            onDragLeave={(event) => {
              event.preventDefault();
              document.getElementById("inProgress")!.style.scale = "1.0";
            }}
            onDropCapture={(event) => {
              event.preventDefault();
              document.getElementById("inProgress")!.style.scale = "1.0";
            }}
            id="inProgress"
          >
            {parseData("inProgress")}
          </ul>
        </div>
        <div
          className="flex flex-col bg-[#FFF9F9] w-full h-full rounded-2xl items-center shadow-lg border-2 border-solid border-gray-300 transition-all duration-300 ease-in-out hover:shadow-xl hover:border-gray-400"
          id="done"
        >
          <h2 className="font-bold text-xl mt-1">Done</h2>
          <ul
            className="flex flex-col w-full h-full gap-4 p-3"
            onDrop={(event) => drop(event)}
            onDragOver={(event) => {
              event.preventDefault();
              document.getElementById("done")!.style.scale = "1.05";
            }}
            onDragLeave={(event) => {
              event.preventDefault();
              document.getElementById("done")!.style.scale = "1.0";
            }}
            onDropCapture={(event) => {
              event.preventDefault();
              document.getElementById("done")!.style.scale = "1.0";
            }}
            id="done"
          >
            {parseData("done")}
          </ul>
        </div>
      </div>
    </div>
  );
}
