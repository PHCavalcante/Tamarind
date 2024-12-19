"use client";
import Image from "next/image";
import menu from "../../assets/menu.svg";
import { useState, useEffect } from "react";
import add from "../../assets/add.svg";
import dropdown from "../../assets/dropdown.svg";
import settings from "../../assets/settings.svg";
// import { fetchData } from "@/services/fetchData";
import Modal from "./Modal";
// import SettingsModal from "./SettingsModal";
import axios from "axios";
import arrow from "../../assets/arrow.svg";
import { UseTaskContext } from "@/hooks/taskContext";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  // const [openSettingsModal, setOpenSettingsModal] = useState(false)
  const [data, setData] = useState([]);

  const { setSelectedTask } = UseTaskContext();

  type Data = {
    id: string, // just for not popup error type 
    _id: number;
    title: string;
    description: string;
    type: string;
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/tasks");
        setData(response.data);
        // console.log(response.data)
      } catch (error) {
        console.error("Error while fetching data:", error);
      }
    };
    fetchTasks();
  }, []);

  const parseTasks = () => {
    return data.map((item: Data) => {
      const processedTask = {
        id: item._id,
        title: item.title,
        description: item.description,
        type: item.type,
      };
      return (
        <li onClick={() => setSelectedTask(item)} className="flex gap-2" key={processedTask.id}>
          <Image src={arrow} alt="Task icon" width={20} />
          <button>{processedTask.title}</button>
        </li>
      );
    });
  };
  return (
    <div
      className={
        isOpen
          ? "hidden"
          : "flex flex-col w-80 h-screen transition duration-0.5 bg-[#F3EDED] px-[30px] shadow-lg shadow-gray-500/50"
      }
    >
      <div className="flex flex-row py-4 justify-between items-center">
        <h1 className="font-bold text-2xl">Hello! User</h1>
        <button onClick={() => setIsOpen(!isOpen)}>
          <Image src={menu} width={40} alt="Menu Icon" />
        </button>
      </div>
      <div className="bg-[#FFF9F9] h-full py-[18px] px-[15px] rounded-xl mb-[18px]">
        <div className="flex flex-col h-full">
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center content-center gap-[14px]">
              <button>
                <Image src={dropdown} alt="Tasks Dropwdown" />
              </button>
              <h2>Tasks</h2>
            </div>
            <button onClick={() => setOpenModal(!openModal)}>
              <Image src={add} alt="Add task icon" />
            </button>
          </div>
          <ul className="my-2 mx-2">
            {parseTasks() ? parseTasks() : <p>No tasks available</p>}
          </ul>
          {/* <hr className="border-1 border-neutral-700 my-[10px]" /> */}
          {/* <div className="flex flex-row items-center justify-between">
            <div className="flex items-center content-center gap-[14px]">
              <button>
                <Image src={dropdown} alt="Tasks Dropwdown" />
              </button>
              <h2>Lists</h2>
            </div>
            <button>
              <Image src={add} alt="Add task icon" />
            </button>
          </div> */}
          {/* <hr className="border-1 border-neutral-700 my-[10px]" /> */}
          <div className="flex-grow"></div>
          <div className="flex gap-3">
            <button className="flex items-center">
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
      <Modal openModal={openModal} setOpenModal={setOpenModal} />
      {/* <SettingsModal openSettingsModal={openSettingsModal}  setOpenSettingsModal={setOpenSettingsModal} /> */}
    </div>
  );
}
