"use client";

import useStore from "@/services/store";
import { useEffect, useRef } from "react";
import GetUserData from "@/utils/GetUserData";
import { UseTaskContext } from "@/hooks/taskContext";
import { taskTypes } from "@/types/dataTypes";
import { updateTask } from "@/services/fetchData";

export default function Kanban() {
  const { tasksData, fetchData } = useStore();
  const { setSelectedTask } = UseTaskContext();
  const taskGrabed = useRef<taskTypes>(null);
  const user = GetUserData();

  useEffect(() => {
    if (!user) return;
    fetchData(user);
  }, [user]);

  function drag(ev:DragEvent) {
    ev.dataTransfer?.setData("text", ev.target!.id);
    console.log(`elemento arrastado: ${ev.currentTarget!.id}`);
  }

  function drop(ev: DragEvent<HTMLDivElement>) {
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
    } else return null;
  }
  return (
    <div className="flex flex-col w-full h-full bg-[#F3EDED] py-[14px] px-3 shadow-lg shadow-gray-500/50 rounded-2xl">
      <div className="h-full flex justify-evenly gap-6">
        <div className="flex flex-col bg-[#FFF9F9] w-full h-full rounded-2xl items-center shadow-lg">
          <h2 className="font-bold text-xl mt-1">Todo</h2>
          <ul
            className="flex flex-col w-full h-full gap-4 p-3"
            onDrop={(event) => drop(event)}
            onDragOver={(event) => event.preventDefault()}
            id="todo"
          >
            {tasksData &&
              tasksData
                .filter(
                  (task: taskTypes) =>
                    task.isCompleted == false && task.inProgress == false
                )
                .map((task: taskTypes) => {
                  const processedTask = {
                    _id: task._id,
                    title: task.title,
                    description: task.description,
                    createdAt: task.createdAt,
                    isCompleted: task.isCompleted,
                    inProgress: task.inProgress
                  };
                  return (
                    <li
                      id={processedTask._id}
                      className="w-full bg-[#e4dede] rounded p-2 cursor-pointer shadow-md hover:bg-[#d3cdcd]"
                      key={processedTask._id}
                      onClick={() => setSelectedTask(processedTask)}
                      draggable
                      onDragStart={(event) => {drag(event);  taskGrabed.current = processedTask;}}
                    >
                      <span className="font-semibold">
                        {processedTask.title}
                      </span>
                    </li>
                  );
                })}
          </ul>
        </div>
        <div className="flex flex-col bg-[#FFF9F9] w-full h-full rounded-2xl items-center shadow-lg">
          <h2 className="font-bold text-xl mt-1">In progress</h2>
          <ul
            className="flex flex-col w-full h-full gap-4 p-3"
            onDrop={(event) => drop(event)}
            onDragOver={(event) => event.preventDefault()}
            id="inProgress"
          >
            {tasksData &&
              tasksData
                .filter(
                  (task: taskTypes) =>
                    task.inProgress == true
                )
                .map((task: taskTypes) => {
                  const processedTask = {
                    _id: task._id,
                    title: task.title,
                    description: task.description,
                    createdAt: task.createdAt,
                  };
                  return (
                    <li
                      id={processedTask._id}
                      className="w-full bg-[#e4dede] rounded p-2 cursor-pointer shadow-md hover:bg-[#d3cdcd]"
                      key={processedTask._id}
                      onClick={() => setSelectedTask(processedTask)}
                      draggable
                      onDragStart={(event) => {
                        drag(event);
                        taskGrabed.current = processedTask;
                      }}
                    >
                      <span className="font-semibold">
                        {processedTask.title}
                      </span>
                    </li>
                  );
                })}
          </ul>
        </div>
        <div className="flex flex-col bg-[#FFF9F9] w-full h-full rounded-2xl items-center shadow-lg">
          <h2 className="font-bold text-xl mt-1">Done</h2>
          <ul
            className="flex flex-col w-full h-full gap-4 p-3"
            onDrop={(event) => drop(event)}
            onDragOver={(event) => event.preventDefault()}
            id="done"
          >
            {tasksData &&
              tasksData
                .filter(
                  (task: taskTypes) =>
                    task.isCompleted == true
                )
                .map((task: taskTypes) => {
                  const processedTask = {
                    _id: task._id,
                    title: task.title,
                    description: task.description,
                    createdAt: task.createdAt,
                  };
                  return (
                    <li
                      id={processedTask._id}
                      className="w-full bg-[#e4dede] rounded p-2 cursor-pointer shadow-md hover:bg-[#d3cdcd]"
                      key={processedTask._id}
                      onClick={() => setSelectedTask(processedTask)}
                      draggable
                      onDragStart={(event) => {
                        drag(event);
                        taskGrabed.current = processedTask;
                      }}
                    >
                      <span className="font-semibold">
                        {processedTask.title}
                      </span>
                    </li>
                  );
                })}
          </ul>
        </div>
      </div>
    </div>
  );
}
