"use client";
import Image from "next/image";
import menu from "../../assets/menu.svg";
import { useState, useEffect, useRef, useMemo } from "react";
import add from "../../assets/add.svg";
import dropdown from "../../assets/dropdown.svg";
import settings from "../../assets/settings.svg";
import Modal from "./Modal";
// import SettingsModal from "./SettingsModal";
import axios from "axios";
import arrow from "../../assets/arrow.svg";
import { UseTaskContext } from "@/hooks/taskContext";
import GetUserData from "@/utils/GetUserData";
import taskTypes from "@/types/taskTypes";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  // const [openSettingsModal, setOpenSettingsModal] = useState(false)
  const [data, setData] = useState([]);
  const [storageTasks, setStorageTasks] = useState<never[]>([]);
  const { setSelectedTask } = UseTaskContext();
  const user = GetUserData();
  const [showSubmenu, setShowSubmenu] = useState({
    tasks: true,
    finishedTasks: true,
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (user && data.length == 0) {
          const response = await axios.get(
          `http://localhost:3000/tasks/${user.id}`
        );
        setData(response.data);
        }
      } catch (error) {
        console.error("Error while fetching data:", error);
      }
      const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      setStorageTasks(storedTasks);
    };
    fetchTasks();
  }, [data, user]);

  const parseTasks = () => {
    if (data.length == 0){
      return "No tasks created ";
    }
    return data.map((item: taskTypes) => {
      const processedTask = {
        id: item._id,
        title: item.title,
        description: item.description,
      };
      return (
        <li onClick={() => setSelectedTask(item)} className="flex gap-2" key={processedTask.id}>
          <Image src={arrow} alt="Task icon" width={20} />
          <button>{processedTask.title}</button>
        </li>
      );
    });
  };
  const HandleStorageTasks = () => {
    if (storageTasks.length == 0){
      return "No tasks finished yet 😴";
    }
        return storageTasks.map((task:taskTypes) => {
          const processedTask = {
            id: task._id,
            title: task.title,
            description: task.description,
          };
          return (
            <li onClick={() => setSelectedTask(task)} className="flex gap-2" key={processedTask.id}>
              <Image src={arrow} alt="Task icon" width={20} height={20} />
              <button>{processedTask.title}</button>
            </li>
          );
        })         
  }

  return (
    <div
      className={
        isOpen
          ? "hidden"
          : "flex flex-col w-[450px] h-screen transition duration-0.5 bg-[#F3EDED] px-[30px] shadow-lg shadow-gray-500/50"
      }
    >
      <div className="flex flex-row py-4 justify-between items-center">
        <h1 className="font-bold text-2xl">
          Hello! {user ? user.firstName : "User"}
        </h1>
        <button onClick={() => setIsOpen(!isOpen)}>
          <Image src={menu} width={40} alt="Menu Icon" />
        </button>
      </div>
      <div className="bg-[#FFF9F9] h-full py-[18px] px-[15px] rounded-xl mb-[18px]">
        <div className="flex flex-col h-full">
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center content-center gap-[14px]">
              <button
                onClick={() =>
                  setShowSubmenu((prev) => ({ ...prev, tasks: !prev.tasks }))
                }
              >
                <Image src={dropdown} width={20} alt="Tasks Dropdown" />
              </button>
              <h2>Tasks</h2>
            </div>
            <button onClick={() => setOpenModal((prev) => !prev)}>
              <Image src={add} alt="Add task icon" />
            </button>
          </div>
          <ul
            className={
              showSubmenu.tasks
                ? "my-2 mx-2 transition duration-150 ease-out"
                : "hidden"
            }
          >
            {parseTasks()}
          </ul>
          <hr className="border-1 border-neutral-700 my-[10px]" />
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center content-center gap-[14px]">
              <button
                onClick={() =>
                  setShowSubmenu((prev) => ({
                    ...prev,
                    finishedTasks: !prev.finishedTasks,
                  }))
                }
              >
                <Image src={dropdown} width={20} alt="Finished tasks dropdown" />
              </button>
              <h2>Finished Tasks</h2>
            </div>
          </div>
          <ul className={showSubmenu.finishedTasks ? "my-2 mx-2" : "hidden"}>
            {HandleStorageTasks()}
          </ul>
          <hr className="border-1 border-neutral-700 my-[10px]" />
          <div className="flex-grow"></div>
          <div className="flex gap-3">
            <button className="flex items-center w-full p-1 transition ease-in delay-150 rounded-md hover:bg-[#e4dede]">
              <Image
                className="mr-3"
                src={settings}
                alt="Settings Button"
                width={20}
              />
              Settings
            </button>
          </div>
        </div>
      </div>
      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        action="Add new"
      />
      {/* <SettingsModal openSettingsModal={openSettingsModal}  setOpenSettingsModal={setOpenSettingsModal} /> */}
    </div>
  );
}
