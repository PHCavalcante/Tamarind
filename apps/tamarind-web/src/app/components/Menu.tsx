"use client";
import Image from "next/image";
import menu from "../../assets/menu.svg";
import { useState, useEffect, useRef, JSX } from "react";
import add from "../../assets/add.svg";
import dropdown from "../../assets/dropdown.svg";
import Modal from "./Modal";
import SettingsModal from "./SettingsModal";
import axios from "axios";
import arrow from "../../assets/arrow.svg";
import { UseTaskContext } from "@/hooks/taskContext";
import { UseSnackbarContext } from "@/hooks/snackbarContext";
import GetUserData from "@/utils/GetUserData";
import { combination, listTypes, noteTypes, taskTypes } from "@/types/dataTypes";
import arrowRight from "../../assets/arrowRight.svg";
import kanban from "../../assets/kanban.svg";
import search from "../../assets/search.svg";
import logo from "../../assets/logo.svg";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [openSettingsModal, setOpenSettingsModal] = useState(false)
  const [data, setData] = useState([]);
  const [notes, setNotes] = useState([]);
  const [lists, setLists] = useState([]);
  const [searchItems, setSearchItems] = useState<JSX.Element[]>([]);
  const inputSearchValue = useRef("");
  const { setSelectedTask } = UseTaskContext();
  const user = GetUserData();
  const [showSubmenu, setShowSubmenu] = useState({
    tasks: true,
    inProgress: true,
    finishedTasks: true,
    lists: true,
    notes: true,
  });
  const {openSnackbar} = UseSnackbarContext();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (!user) return;
        if (data.length == 0) {
          const response = await axios.get(
            `http://localhost:3000/tasks/${user.id}`
          );
          setData(response.data);
        }
        if (notes.length == 0) {
          const response = await axios.get(
            `http://localhost:3000/notes/${user.id}`
          );
          setNotes(response.data);
        }
        if (lists.length == 0) {
          const response = await axios.get(
            `http://localhost:3000/lists/${user.id}`
          );
          setLists(response.data);
        }
      } catch (error) {
        console.error("Error while fetching data:", error);
      }
    };
    fetchTasks();
  },[user, openSnackbar]);

  const parseTasks = () => {
    const notCompletedTasks = data.filter((task:taskTypes) => task.isCompleted == false && task.inProgress == false);
    if (notCompletedTasks.length == 0) {
      return "No tasks created ";
    }
    return notCompletedTasks.map((task: taskTypes) => {
      const processedTask = {
        id: task._id,
        title: task.title,
        description: task.description,
      };
      return (
        <li
          onClick={() => setSelectedTask(task)}
          className="flex gap-2 my-1 text-ellipsis whitespace-nowrap overflow-hidden transition ease-in delay-100 rounded hover:bg-[#e4dede]"
          key={processedTask.id}
        >
          <Image src={arrow} alt="Task icon" />
          <button className="">{processedTask.title}</button>
        </li>
      );
    });
  };
  const parseInProgressTasks = () => {
    const tasksInProgress = data.filter((task:taskTypes) => task.inProgress == true);
    if (tasksInProgress.length == 0) {
      return "No tasks in progress ";
    }
    return tasksInProgress.map((task: taskTypes) => {
      const processedTask = {
        id: task._id,
        title: task.title,
        description: task.description,
      };
      return (
        <li
          onClick={() => setSelectedTask(task)}
          className="flex gap-2 my-1 text-ellipsis whitespace-nowrap overflow-hidden transition ease-in delay-100 rounded hover:bg-[#e4dede]"
          key={processedTask.id}
        >
          <Image src={arrow} alt="Task icon" />
          <button className="">{processedTask.title}</button>
        </li>
      );
    });
  };
  const parseNotes = () => {
    if (notes.length == 0) return "No notes created yet";

    return notes.map((note: noteTypes) => {
      return (
        <li
          key={note._id}
          className="flex gap-2 my-1 text-ellipsis whitespace-nowrap overflow-hidden transition ease-in delay-100 rounded hover:bg-[#e4dede]"
          onClick={() => setSelectedTask(note)}
        >
          <Image src={arrow} alt="Task icon" />
          <button dangerouslySetInnerHTML={{ __html: note.title }}></button>
        </li>
      );
    });
  };
  const parseLists = () => {
    if (lists.length == 0) return "No lists to show";

    return lists.map((list: listTypes) => {
      return (
        <li
          key={list._id}
          className="flex gap-2 my-1 text-ellipsis whitespace-nowrap overflow-hidden transition ease-in delay-100 rounded hover:bg-[#e4dede]"
          onClick={() => setSelectedTask(list)}
        >
          <Image src={arrow} alt="Task icon" />
          <button>{list.title}</button>
        </li>
      );
    });
  };
  const HandleCompletedTasks = () => {
    const completedTasks = data.filter((task:taskTypes) => task.isCompleted == true);
    if (completedTasks.length == 0) {
      return "No tasks finished yet 😴";
    }
    return completedTasks.map((task: taskTypes) => {
      const processedTask = {
        id: task._id,
        title: task.title,
        description: task.description,
      };
      return (
        <li
          onClick={() => setSelectedTask(task)}
          className="flex gap-2 hover:bg-[#e4dede]"
          key={processedTask.id}
        >
          <Image src={arrow} alt="Task icon" />
          <button>{processedTask.title}</button>
        </li>
      );
    });
  };

  function parseSearch(value:string){
    if (value == "") {setSearchItems([]); return;}
    const allData = data.concat(notes).concat(lists);
    const searchData = allData.filter((item: combination) =>
      item.title.startsWith(value)
    ).map(
      (item: taskTypes) => {
        return (
          <li
            className="flex justify-between cursor-pointer hover:bg-[#e4dede] px-3"
            key={item._id}
            onClick={() => {setSelectedTask(item); setSearchItems([])}}
          >
            <p className="font-bold">{item.title}</p>
            <p className="italic">{item.type}</p>
          </li>
        );
      }
    );
      // console.log(searchData);
      setSearchItems(searchData);
  }

  return (
    <div
      className={
        isOpen
          ? "absolute z-10 md:relative md:min-w-96 md:w-96 flex flex-col h-screen transition-all duration-500 ease-in-out bg-[#F3EDED] px-[30px] shadow-lg shadow-gray-500/50"
          : "flex flex-col h-screen bg-[#F3EDED] shadow-lg shadow-gray-500/50 px-2 items-center gap-3 transition-all ease-in-out duration-500"
      }
    >
      <div
        className={
          isOpen
            ? "flex flex-row py-4 justify-between items-center"
            : "flex flex-col"
        }
      >
        <div className="flex items-center w-full">
          <Image
            src={logo}
            alt="logo image"
            width={45}
            className="pb-2 max-w-full max-h-full overflow-hidden"
          />
          <h1 className={isOpen ? "text-2xl font-semibold" : "opacity-0 w-0 h-0"}>
            Tamarind
          </h1>
        </div>
        <button
          className={`transition-all duration-700 ${isOpen ? "hover:rotate-90" : "rotate-90 hover:rotate-0"}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Image src={menu} width={40} alt="Menu Icon" />
        </button>
      </div>
      <form
        className={
          isOpen
            ? "relative flex w-full flex-wrap items-center gap-1 mb-3 transition-all duration-500 ease-in-out"
            : "w-0 h-0 absolute opacity-0 pointer-events-none"
        }
      >
        <button>
          <Image className="opacity-60" src={search} alt="search button" />
        </button>
        <input
          className="rounded-lg px-2 w-auto flex-1 h-auto bg-transparent focus:outline-none"
          type="search"
          value={inputSearchValue.current}
          placeholder="Search for tasks, notes or lists..."
          maxLength={50}
          onChange={(e) => {
            inputSearchValue.current = e.target.value;
            parseSearch(e.target.value);
          }}
        />
        <div
          className={
            inputSearchValue.current != ""
              ? "absolute flex flex-col h-auto min-h-7 top-7 left-0 right-0 border-2 border-[#c0baba] bg-gradient-to-tl from-[#FFF9F9] via-[#e4dede] to-[#F3EDED] transition-opacity duration-300 animate-modal "
              : "opacity-0 w-0 h-0 pointer-events-none"
          }
        >
          {searchItems.length == 0 && (
            <div className="border-8 border-solid border-t-8 mx-auto border-t-[#000000] rounded-full w-10 h-10 animate-spin" />
          )}
          <ul className="flex flex-col gap-1">{searchItems}</ul>
        </div>
      </form>
      <div
        className={
          isOpen
            ? "flex items-center justify-between"
            : "flex flex-col items-center gap-3"
        }
      >
        <button
          className="flex my-2 hover:bg-[#e4dede] hover:scale-110"
          onClick={() => setSelectedTask("Kanban")}
        >
          <Image src={kanban} alt="Kanban view icon" />
        </button>
        {/* <button
          className="flex hover:bg-[#e4dede] transition-all duration-500 hover:rotate-180"
          onClick={() => setOpenSettingsModal(true)}
        >
          <Image src={settings} alt="Settings Button" />
        </button> */}
      </div>
      <div
        className={
          isOpen
            ? "bg-[#FFF9F9] h-full pt-[18px] px-[15px] mb-5 rounded-xl overflow-y-auto transition-all duration-500 ease-in-out"
            : "opacity-0 w-0 pointer-events-none"
        }
      >
        <div className="flex flex-col h-full">
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center content-center gap-[14px]">
              <button
                onClick={() =>
                  setShowSubmenu((prev) => ({ ...prev, tasks: !prev.tasks }))
                }
              >
                <Image
                  src={showSubmenu.tasks ? dropdown : arrowRight}
                  width={22}
                  alt="Tasks Dropdown"
                />
              </button>
              <h2>Tasks</h2>
            </div>
            <button onClick={() => setOpenModal((prev) => !prev)}>
              <Image src={add} alt="Add task icon" />
            </button>
          </div>
          <ul className={showSubmenu.tasks ? "my-2 mx-2 w-full" : "hidden"}>
            {parseTasks()}
          </ul>
          <hr className="border-1 border-neutral-700 my-[10px]" />
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center content-center gap-[14px]">
              <button
                onClick={() =>
                  setShowSubmenu((prev) => ({
                    ...prev,
                    inProgress: !prev.inProgress,
                  }))
                }
              >
                <Image
                  src={showSubmenu.inProgress ? dropdown : arrowRight}
                  width={22}
                  alt="In progress tasks dropdown"
                />
              </button>
              <h2>In progress</h2>
            </div>
          </div>
          <ul
            className={showSubmenu.inProgress ? "my-2 mx-2 w-full" : "hidden"}
          >
            {parseInProgressTasks()}
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
                <Image
                  src={showSubmenu.finishedTasks ? dropdown : arrowRight}
                  width={22}
                  alt="Finished tasks dropdown"
                />
              </button>
              <h2>Finished Tasks</h2>
            </div>
          </div>
          <ul className={showSubmenu.finishedTasks ? "my-2 mx-2" : "hidden"}>
            {HandleCompletedTasks()}
          </ul>
          <hr className="border-1 border-neutral-700 my-[10px]" />
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center content-center gap-[14px]">
              <button
                onClick={() =>
                  setShowSubmenu((prev) => ({
                    ...prev,
                    lists: !prev.lists,
                  }))
                }
              >
                <Image
                  src={showSubmenu.lists ? dropdown : arrowRight}
                  width={22}
                  alt="Lists dropdown"
                />
              </button>
              <h2>Lists</h2>
            </div>
            <button onClick={() => setSelectedTask("List")}>
              <Image src={add} alt="Add list icon" />
            </button>
          </div>
          <ul className={showSubmenu.lists ? "my-2 mx-2" : "hidden"}>
            {parseLists()}
          </ul>
          <hr className="border-1 border-neutral-700 my-[10px]" />
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center content-center gap-[14px]">
              <button
                onClick={() =>
                  setShowSubmenu((prev) => ({ ...prev, notes: !prev.notes }))
                }
              >
                <Image
                  src={showSubmenu.notes ? dropdown : arrowRight}
                  width={22}
                  alt="Notes dropdown"
                />
              </button>
              <h2>Notes</h2>
            </div>
            <button onClick={() => setSelectedTask("Note")}>
              <Image src={add} alt="Add Note icon" />
            </button>
          </div>
          <ul className={showSubmenu.notes ? "my-2 mx-2" : "hidden"}>
            {parseNotes()}
          </ul>
          <div className="flex-grow" />
        </div>
      </div>
      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        action="Add new"
      />
      <SettingsModal
        openSettingsModal={openSettingsModal}
        setOpenSettingsModal={setOpenSettingsModal}
      />
    </div>
  );
}
