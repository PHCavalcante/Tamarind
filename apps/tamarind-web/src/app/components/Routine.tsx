import Image from "next/image";
import add from "../../assets/add.svg";
import axios from "axios";
import GetUserData from "@/utils/GetUserData";
import { useState, useEffect, useMemo } from "react";
import { weekDay as today, week } from "./Header";
import columnIcon from "../../assets/column.svg";
import listIcon from "../../assets/list.svg";
import deleteIcon from "../../assets/deleteIcon.svg";
import {UseSnackbarContext} from "@/hooks/snackbarContext"

type Routine = {
  _id?: string | undefined;
  userId: string;
  name: string;
  weekday: string;
  isCompletedToday: boolean;
  isNew: boolean;
};

export default function Routine() {
  const [routinesByDay, setRoutinesByDay] = useState<Record<string, Routine[]>>(
    {}
  );
  const [currentViewMode, setCurrentViewMode] = useState<"column" | "list">("column");
  const [toggleMenu, setToggleMenu] = useState<number | string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isOverTrash, setIsOverTrash] = useState(false);
  const { setOpenSnackbar, setSnackbarMessage } = UseSnackbarContext();

  const user = GetUserData();
  useEffect(() => {
    const fetchRoutine = async () => {
      try {
        const response = await axios.get(`https://tamarind-api.onrender.com/routines/${user?.id}`);
        const routines: Routine[] = response.data;
        const grouped: Record<string, Routine[]> = {};

        for (const day of week) {
          grouped[day] = routines.filter((r) => r.weekday === day);
        }

        setRoutinesByDay(grouped);
      } catch (error) {
        console.error("Error fetching routine:", error);
      }
    };

    if (user?.id) {
      fetchRoutine();
    }
  }, [user]);

  const handleAddInput = (weekday: string) => {
    setRoutinesByDay((prev) => ({
      ...prev,
      [weekday]: [
        ...prev[weekday],
        {
          _id: undefined,
          userId: user?.id || "",
          name: "",
          weekday,
          isCompletedToday: false,
          isNew: true,
        },
      ],
    }));
  };
  function axiosDeleteRoutine(routineId: string) {
    try {
      axios.delete(`https://tamarind-api.onrender.com/routines/${routineId}`);
      setOpenSnackbar(true);
      setSnackbarMessage("routineDeleted");
    } catch (err) {
      console.error("Error while deleting routine:", err);
    setIsDragging(false);
  }
}
  const dragStartHandler = (ev: React.DragEvent<HTMLLIElement>, routine: Routine, weekday: string) => {
    ev.dataTransfer.effectAllowed = "move"; 
    ev.dataTransfer.setData("routineId", routine._id || "");
     ev.dataTransfer.setData("weekday", weekday);
     setIsDragging(true);
  };
  function dropHandler(ev: React.DragEvent<HTMLButtonElement>) {
    ev.preventDefault();
    const routineId = ev.dataTransfer.getData("routineId");
    const weekday = ev.dataTransfer.getData("weekday");

    if (!routineId || !weekday) return;

    setRoutinesByDay((prev) => {
      const updated = { ...prev };
      updated[weekday] = updated[weekday].filter(
        (routine) => routine._id !== routineId
      );
      return updated;
    });
    axiosDeleteRoutine(routineId);
    setIsDragging(false);
    setIsOverTrash(false);
    }

  function DisplayRoutineColumn(weekday: string, routines: Routine[]) {
    const handleInputChange = (index: number, value: string) => {
      setRoutinesByDay((prev) => {
        const updated = [...prev[weekday]];
        updated[index].name = value;
        return { ...prev, [weekday]: updated };
      });
    };

    const handleInputBlur = (index: number) => {
      const routine = routines[index];
      if (routine.isNew && routine.name.trim() === "") {
        setRoutinesByDay((prev) => {
          const updated = [...prev[weekday]];
          updated.splice(index, 1);
          return { ...prev, [weekday]: updated };
        });
      }
    };
    const handleToggleRoutine = async (id: string, weekday: string) => {
      setRoutinesByDay((prev) => {
        const updated = { ...prev };
        updated[weekday] = updated[weekday].map((routine) =>
          routine._id === id
            ? { ...routine, isCompletedToday: !routine.isCompletedToday }
            : routine
        );
        return updated;
      });

      try {
        await axios.patch(`https://tamarind-api.onrender.com/routines/${id}`, {
          isCompletedToday:
            routinesByDay[weekday].find((r) => r._id === id)
              ?.isCompletedToday === false,
        });
      } catch (err) {
        console.log("Error updating routines:", err);
      }
    };

    return (
      <div
        className={`flex flex-col w-full h-full gap-4 p-3 border border-[var(--border)] dark:border-[var(--darkBorder)] border-solid ${weekday === today ? "opacity-100" : "opacity-50"} ${currentViewMode === "list" ? "border-b-2 border-t-0" : "border-b-0 border-t-0"}`}
      >
        <div
          className={`flex flex-row ${currentViewMode === "list" ? "gap-2" : "justify-between"}`}
        >
          <h2 className="text-center">{weekday}</h2>
          <button onClick={() => handleAddInput(weekday)}>
            <Image src={add} className="dark:invert" alt="Add button" />
          </button>
        </div>
        <ul className="flex flex-col w-full h-full gap-1" id={weekday}>
          {routines.map((routine, index) => {
             const uniqueKey = routine._id ?? `new-${weekday}-${index}`;
             return (
            <li
              key={uniqueKey}
              className={`flex relative w-fit pr-8 items-center gap-1 cursor-grab transition-all duration-300 ${isDragging ? "scale-105 opacity-70" : "hover:shadow-md hover:scale-105"}`}
              draggable={currentViewMode === "column"}
              onDragStart={(ev) => dragStartHandler(ev, routine, weekday)}
              onDragEnd={() => setIsDragging(false)}
              onMouseOver={currentViewMode === "list" ? (() => setToggleMenu(uniqueKey)) : undefined}
              onMouseOutCapture={currentViewMode === "list" ? (() => setToggleMenu(null)) : undefined}
            >
              <input
                type="checkbox"
                checked={routine.isCompletedToday}
                onChange={() => handleToggleRoutine(routine._id!, weekday)}
                className="accent-[var(--accent)] dark:accent-[var(--darkAccent)] cursor-pointer"
                style={{ width: 20, height: 20 }}
              />
              <div className={`absolute opacity-0 top-1 right-0 z-10 bg-[var(--background)] dark:bg-[var(--darkBackground)] flex items-center transition-all duration-300 ease-in-out ${(currentViewMode === "list" && toggleMenu === uniqueKey) && "opacity-100 pointer-events-auto"}`}>
                <button>
                  <Image
                    src={deleteIcon}
                    alt="Delete button"
                    className="w-4 h-4 dark:invert cursor-pointer"
                    onClick={() => {
                      setRoutinesByDay((prev) => {
                        const updated = [...prev[weekday]];
                        updated.splice(index, 1);
                        return { ...prev, [weekday]: updated };
                      });
                      axiosDeleteRoutine(routine._id!);
                      setOpenSnackbar(true);
                      setSnackbarMessage("routineDeleted");
                    }}
                  />
                </button>
              </div>
              {routine.isNew ? (
                <input
                  type="text"
                  className="w-full h-full pl-2 outline-none bg-[var(--background)] dark:bg-[var(--darkBackground)] transition-all duration-300 ease-in-out hover:shadow-xl"
                  placeholder="Enter routine name"
                  value={routine.name}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onBlur={() => handleInputBlur(index)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddInput(weekday);
                    else if (e.key === "Backspace" && routine.name === "")
                      handleInputBlur(index);
                  }}
                  autoFocus
                />
              ) : (
                <label className="text-[var(--text)] dark:text-[var(--darkText)] w-full h-full pl-2 cursor-pointer select-none">
                  {routine.name}
                </label>
              )}
            </li>
          )})}
        </ul>
      </div>
    );
  }
  const hasNewRoutines = useMemo(() => {
    return Object.values(routinesByDay).some((day) =>
      day.some((routine) => routine.isNew && routine.name.trim() !== "")
    );
  }, [routinesByDay]);
  const handleSaveRoutines = async () => {
    const newRoutines: Routine[] = [];

    Object.values(routinesByDay).forEach((day) => {
      day.forEach((routine) => {
        if (routine.isNew && routine.name.trim() !== "") {
          newRoutines.push({ ...routine, isNew: false });
        }
      });
    });

    try {
      await axios.post("https://tamarind-api.onrender.com/routines", newRoutines);
      setRoutinesByDay((prev) => {
        const updated: Record<string, Routine[]> = {};
        for (const [day, routines] of Object.entries(prev)) {
          updated[day] = routines.map((routine) =>
            routine.isNew ? { ...routine, isNew: false } : routine
          );
        }
        return updated;
      });
      setOpenSnackbar(true);
      setSnackbarMessage("routineAdded");
    } catch (err) {
      console.log("Error saving routines:", err);
      setOpenSnackbar(true);
      setSnackbarMessage("error");
    }
  };

  return (
    <div
      className={`flex flex-col relative w-full h-full bg-[var(--background)] dark:bg-[var(--darkBackground)] rounded-2xl items-center shadow-lg border-2 rounded-br-none rounded-tr-none border-solid border-[var(--border)] hover:border-[var(--hoverBorder)] dark:border-[var(--darkBorder)] dark:hover:border-[var(--darkHoverBorder)] transition-all duration-300 ease-in-out hover:shadow-xl ${currentViewMode === "list" && "overflow-hidden"}`}
    >
      <div className="flex items-center w-full">
        <h2 className="font-bold text-xl mt-1 flex-1 text-center">Routine</h2>
        <div className="flex items-center gap-2 ml-auto mr-3">
          <button
            onClick={() => setCurrentViewMode("column")}
            className={`${currentViewMode === "column" ? "opacity-100" : "opacity-50"}`}
          >
            <Image
              src={columnIcon}
              alt="Column Icon"
              className="w-5 h-5 dark:invert"
            />
          </button>
          <button
            onClick={() => setCurrentViewMode("list")}
            className={`${currentViewMode === "list" ? "opacity-100" : "opacity-50"}`}
          >
            <Image
              src={listIcon}
              alt="Column Icon"
              className="w-5 h-5 dark:invert"
            />
          </button>
        </div>
      </div>
      <div
        className={`flex relative w-full h-full p-3 ${currentViewMode === "list" ? "overflow-y-auto flex-col" : "flex-row gap-4"}`}
      >
        {DisplayRoutineColumn("Monday", routinesByDay["Monday"] || [])}
        {DisplayRoutineColumn("Tuesday", routinesByDay["Tuesday"] || [])}
        {DisplayRoutineColumn("Wednesday", routinesByDay["Wednesday"] || [])}
        {DisplayRoutineColumn("Thursday", routinesByDay["Thursday"] || [])}
        {DisplayRoutineColumn("Friday", routinesByDay["Friday"] || [])}
        {DisplayRoutineColumn("Saturday", routinesByDay["Saturday"] || [])}
        {DisplayRoutineColumn("Sunday", routinesByDay["Sunday"] || [])}
        {currentViewMode !== "list" &&
          <button
            className={`absolute opacity-0 pointer-events-none bottom-8 right-1/2 p-4 rounded-full bg-red-600 transition-all duration-500 ease-in-out ${isDragging && "opacity-100 pointer-events-auto scale-110 animate-pulse"} ${isOverTrash && "bg-red-700 scale-125 shadow-lg"}`}
            onDragOver={(e) => {e.preventDefault(); setIsOverTrash(true);}}
            onDrop={(e) => {
              dropHandler(e);
              setIsOverTrash(false);
            }}
            onDragLeave={() => setIsOverTrash(false)}
          >
            <Image
              src={deleteIcon}
              alt="Delete button"
              className="w-5 h-5 invert cursor-pointer"
            />
          </button>
        }
      </div>
      <button
        onClick={handleSaveRoutines}
        className={`flex absolute px-6 py-2 bottom-4 opacity-0 pointer-events-none right-1/2 rounded-lg text-white bg-[var(--accent)] dark:bg-[var(--darkAccent)] hover:bg-[var(--darkAccent)] dark:hover:bg-[var(--darkAccentHover)] transition-all ease-in-out duration-300 ${hasNewRoutines && "opacity-100 pointer-events-auto"}`}
      >
        Save
      </button>
    </div>
  );
}
