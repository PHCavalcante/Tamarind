"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef, JSX } from "react";
import Modal from "./Modal";
import SettingsModal from "./SettingsModal";
import { UseTaskContext } from "@/hooks/taskContext";
import { UseSnackbarContext } from "@/hooks/snackbarContext";
import { useUserToken } from "@/utils/useUserToken";
import { fetchTasks, fetchNotes, fetchLists } from "@/services/fetchData";
import {
  combination,
  listTypes,
  noteTypes,
  taskTypes,
} from "@/types/dataTypes";
import menu from "../../assets/menu.svg";
import add from "../../assets/add.svg";
import dropdown from "../../assets/dropdown.svg";
import arrow from "../../assets/arrow.svg";
import settings from "../../assets/settings.svg";
import arrowRight from "../../assets/arrowRight.svg";
import kanban from "../../assets/kanban.svg";
import routine from "../../assets/routine.svg";
import search from "../../assets/search.svg";
import logo from "../../app/icon.png";

function Tooltip({text, ref, position, isOpen} : {text: string, ref: React.RefObject<HTMLSpanElement | null>, position?: string, isOpen: boolean}) {
  return (
    <span
      ref={ref}
      className={`absolute z-10 w-fit -top-6 px-2 py-1 text-white text-sm rounded bg-[var(--accent)] 
                pointer-events-none opacity-0 transition-all ease-out duration-300 ${position ?? "-left-2"} ${!isOpen && "hidden"}`}
    >
      {text}
      <span
        className="absolute left-1/2 -bottom-1.5 transform -translate-x-1/2 
                 w-0 h-0 
                 border-l-[6px] border-l-transparent 
                 border-r-[6px] border-r-transparent 
                 border-t-[6px] border-t-[var(--accent)]"
      />
    </span>
  );
}

  const showTooltip = (tooltipRef: React.RefObject<HTMLSpanElement>) => {
    if (tooltipRef.current) {
      tooltipRef.current.style.opacity = "1";
    }
  };

  const hideTooltip = (tooltipRef: React.RefObject<HTMLSpanElement>) => {
    if (tooltipRef.current) {
      tooltipRef.current.style.opacity = "0";
    }
  };
export default function Menu() {
  const [isOpen, setIsOpen] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [openSettingsModal, setOpenSettingsModal] = useState(false);
  const [data, setData] = useState<taskTypes[]>([]);
  const [notes, setNotes] = useState<noteTypes[]>([]);
  const [lists, setLists] = useState<listTypes[]>([]);
  const [searchItems, setSearchItems] = useState<JSX.Element[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const routineTooltipRef = useRef<HTMLSpanElement>(null!);
  const kanbanTooltipRef = useRef<HTMLSpanElement>(null!);
  const { setSelectedTask, selectedTask } = UseTaskContext();
  const getToken = useUserToken();
  const { openSnackbar } = UseSnackbarContext();
  const [showSubmenu, setShowSubmenu] = useState({
    tasks: true,
    inProgress: true,
    finishedTasks: true,
    lists: true,
    notes: true,
  });
  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      try {
        if (!token) {
          console.error("No token found, user might not be authenticated.");
          return;
        }
        const tasksResponse = await fetchTasks(token);
        setData(tasksResponse);
        const notesResponse = await fetchNotes(token);
        setNotes(notesResponse);
        const listsResponse = await fetchLists(token);
        setLists(listsResponse);
      } catch (error) {
        console.error("Error while fetching data:", error);
      }
    };

    fetchData();
  }, [openSnackbar]);

  const parseItems = (items: combination[], type: string) => {
    if (items.length === 0) return <li>No {type} to show</li>;

    return items.map((item) => (
      <li
        key={item._id}
        className="flex gap-2 my-1 text-ellipsis whitespace-nowrap overflow-hidden transition ease-in delay-100 rounded hover:bg-[var(--paper)] dark:hover:bg-[var(--darkPaper)] hover-lift"
        onClick={() => setSelectedTask(item)}
      >
        <Image src={arrow} className="dark:invert" alt={`${type} icon`} />
        <button
          dangerouslySetInnerHTML={{
            __html: item.title.startsWith("#")
              ? item.title.slice(0, 6)
              : item.title,
          }}
        ></button>
      </li>
    ));
  };

  const parseSearch = (value: string) => {
    if (value === "") {
      setSearchItems([]);
      return;
    }

    const allData = [...data, ...notes, ...lists];

    const transformedData = allData.map((item) => {
      if (item.title.startsWith("#")) {
        return { ...item, title: item.title.slice(0, 6) };
      }
      return item;
    });

    const filteredData = transformedData.filter(
      (item): item is combination | taskTypes =>
        "title" in item &&
        item.title.toLowerCase().includes(value.toLowerCase())
    );

    const searchResults = filteredData.map((item) => (
      <li
        className="flex justify-between cursor-pointer hover:bg-[var(--paper)] px-3 py-2 hover-lift transition-colors duration-200"
        key={item._id}
        onClick={() => {
          setSelectedTask(item);
          setSearchItems([]);
          setSearchValue("");
        }}
      >
        <p
          className="font-bold truncate"
          dangerouslySetInnerHTML={{ __html: item.title }}
        ></p>
        <p className="italic text-sm opacity-70">{item.type}</p>
      </li>
    ));

    setSearchItems(searchResults);
  };
  const renderSubmenu = (
    title: string,
    items: combination[] | taskTypes[],
    isOpen: boolean,
    toggle: () => void,
    type: string
  ) => (
    <div>
      <div className="flex flex-row items-center justify-between transition-all duration-300 ease-in-out">
        <div className="flex items-center content-center gap-[14px]">
          <button onClick={toggle} className="hover-lift">
            <Image
              src={isOpen ? dropdown : arrowRight}
              width={22}
              alt={`${title} dropdown`}
              className="dark:invert"
            />
          </button>
          <h2 className="font-semibold">{title}</h2>
        </div>
        {type === "tasks" && (
          <button onClick={() => setOpenModal((prev) => !prev)} className="hover:scale-110 transition-all duration-200">
            <Image
              src={add}
              className="dark:invert"
              alt={`Add ${title} icon`}
            />
          </button>
        )}
        {type === "notes" && (
          <button onClick={() => setSelectedTask("Note")} className="hover:scale-110 transition-all duration-200">
            <Image
              src={add}
              className="dark:invert"
              alt={`Add ${title} icon`}
            />
          </button>
        )}
        {type === "lists" && (
            <button onClick={() => setSelectedTask("List")} className="hover:scale-110 transition-all duration-200">
            <Image
              src={add}
              className="dark:invert"
              alt={`Add ${title} icon`}
            />
          </button>
        )}
      </div>
      <ul className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-96 opacity-100 my-2 mx-2" : "max-h-0 opacity-0 my-0 mx-2"}`}>
        {parseItems(items as combination[], type)}
      </ul>
      <hr className="border-t border-dashed border-[var(--border)] dark:border-[var(--darkBorder)] my-3 opacity-40" />
    </div>
  );

  return (
    <div
      className={
        isOpen
          ? "absolute z-10 md:relative md:min-w-96 md:w-96 flex flex-col h-screen transition-all duration-500 ease-in-out bg-[var(--background)] dark:bg-[var(--darkBackground)] dark:text-[var(--darkText)] px-[30px] shadow-lg shadow-gray-500/50 dark:border-[var(--darkBorder)] border-[var(--border)] select-none animate-slide-in"
          : "flex flex-col h-screen bg-[var(--background)] dark:bg-[var(--darkBackground)] dark:text-[var(--darkText)] shadow-lg shadow-gray-500/50 px-2 items-center gap-3 transition-all ease-in-out duration-500"
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
            className="pb-2 max-w-full max-h-full overflow-hidden scale-110"
          />
          <h1
            className={isOpen ? "text-2xl font-semibold" : "opacity-0 w-0 h-0"}
          >
            Tamarind
          </h1>
        </div>
        <button
          className={`transition-all duration-700 ${isOpen ? "hover:rotate-90" : "rotate-90 hover:rotate-0"}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Image
            src={menu}
            className="dark:invert"
            width={40}
            alt="Menu Icon"
          />
        </button>
      </div>
      <form
        className={
          isOpen
            ? "relative flex w-full flex-wrap items-center gap-1 mb-3 transition-all duration-500 ease-in-out"
            : "w-0 h-0 absolute opacity-0 pointer-events-none"
        }
      >
        <Image
          className="opacity-30 dark:invert"
          src={search}
          alt="search button"
        />
        <input
          className="rounded-lg px-2 flex-1 h-auto bg-transparent focus:outline-none dark"
          type="search"
          value={searchValue}
          placeholder="Search for tasks, notes or lists..."
          maxLength={50}
          onChange={(e) => {
            setSearchValue(e.target.value);
            parseSearch(e.target.value);
          }}
        />
        <div
          className={
            searchValue !== ""
              ? "z-10 absolute text-black flex flex-col h-auto min-h-7 top-7 left-0 right-0 border-2 border-[var(--border)] bg-[var(--paper)] dark:bg-[var(--paper)] dark:border-[var(--darkBorder)] transition-all duration-300 animate-fade-in rounded-lg shadow-lg"
              : "opacity-0 w-0 h-0 pointer-events-none"
          }
        >
          {searchItems.length === 0 && searchValue !== "" && (
            <p className="p-3 text-center text-gray-500">No items found</p>
          )}
          <ul className="flex flex-col gap-1 max-h-60 overflow-y-auto">{searchItems}</ul>
        </div>
      </form>
      <div
        className={
          isOpen
            ? "flex items-center gap-2 relative"
            : "flex flex-col items-center gap-2"
        }
      >
        <Tooltip text="Routine" ref={routineTooltipRef} isOpen={isOpen} />
        <button
          className={`flex my-2 border-2 p-[2px] rounded-lg hover:bg-[var(--paper)] dark:hover:bg-[var(--darkPaper)] hover:scale-110 transition-all duration-200 ${selectedTask === "Routine" ? "border-[var(--accent)] dark:border-[var(--darkAccent)]" : "border-transparent"}`}
          onClick={() => setSelectedTask("Routine")}
          onMouseEnter={() => showTooltip(routineTooltipRef)}
          onMouseLeave={() => hideTooltip(routineTooltipRef)}
        >
          <Image src={routine} className="dark:invert" alt="Routine" />
        </button>
        <Tooltip text="Kanban" ref={kanbanTooltipRef} position="left-6" isOpen={isOpen} />
        <button
          className={`flex my-2 border-2 p-[2px] rounded-lg hover:bg-[var(--paper)] dark:hover:bg-[var(--darkPaper)] hover:scale-110 hover-lift transition-all duration-200 ${selectedTask === "Kanban" ? "border-[var(--accent)] dark:border-[var(--darkAccent)]" : "border-transparent"}`}
          onClick={() => setSelectedTask("Kanban")}
          onMouseEnter={() => showTooltip(kanbanTooltipRef)}
          onMouseLeave={() => hideTooltip(kanbanTooltipRef)}
        >
          <Image src={kanban} className="dark:invert" alt="Kanban view icon" />
        </button>
        <button
          className={`flex transition-all duration-500 hover:rotate-180 ${isOpen && "ml-auto"}`}
          onClick={() => setOpenSettingsModal(true)}
        >
          <Image src={settings} className="dark:invert" alt="Settings Button" />
        </button>
      </div>
      <div
        className={
          isOpen
            ? "bg-gradient-to-b from-[var(--background)] to-[var(--foreground)] dark:bg-gradient-to-b dark:from-[var(--darkBackground)] dark:to-[var(--darkForeground)] h-full pt-[18px] px-[15px] mb-5 rounded-xl overflow-y-auto transition-all duration-500 ease-in-out"
            : "opacity-0 w-0 pointer-events-none"
        }
      >
        <div className="flex flex-col h-full">
          {renderSubmenu(
            "Tasks",
            data.filter((task) => !task.inProgress && !task.isCompleted) as combination[],
            showSubmenu.tasks,
            () => setShowSubmenu((prev) => ({ ...prev, tasks: !prev.tasks })),
            "tasks"
          )}
          {renderSubmenu(
            "In Progress",
            data.filter((task) => task.inProgress),
            showSubmenu.inProgress,
            () =>
              setShowSubmenu((prev) => ({
                ...prev,
                inProgress: !prev.inProgress,
              })),
            "in progress"
          )}
          {renderSubmenu(
            "Finished Tasks",
            data.filter((task) => task.isCompleted),
            showSubmenu.finishedTasks,
            () =>
              setShowSubmenu((prev) => ({
                ...prev,
                finishedTasks: !prev.finishedTasks,
              })),
            "finished tasks"
          )}
          {renderSubmenu(
            "Lists",
            lists as combination[],
            showSubmenu.lists,
            () => setShowSubmenu((prev) => ({ ...prev, lists: !prev.lists })),
            "lists"
          )}
          {renderSubmenu(
            "Notes",
            notes as combination[],
            showSubmenu.notes,
            () => setShowSubmenu((prev) => ({ ...prev, notes: !prev.notes })),
            "notes"
          )}
        </div>
      </div>
      {openModal && 
      <Modal
        setOpenModal={setOpenModal}
        action="Add new task"
      />}
      <SettingsModal
        openSettingsModal={openSettingsModal}
        setOpenSettingsModal={setOpenSettingsModal}
      />
    </div>
  );
}
