import { taskTypes } from "@/types/dataTypes";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { updateTask } from "@/services/fetchData";

type PomodoroProps = {
  minutes: number;
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  content: taskTypes;
};

export default function Pomodoro({
  minutes,
  openModal,
  setOpenModal,
  content
}: PomodoroProps) {
  const [time, setTime] = useState(minutes * 60);
  const [start, setStart] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  
  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }
  function showNotification(title: string, body: string) {
    if (Notification.permission === "granted") {
      new Notification(title, {
        body: body,
        icon: "../icon.png",
      });
    }
  }
  
  useEffect(() => {
    if (start){
    const interval = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 5 * 60));
    }, 1000);
    return () => clearInterval(interval);
  }
  }, [start]);
  useEffect(() => {
    if (time === 0) {
      setIsCompleted(true);
      setTimeout(() => {
        setIsCompleted(false);
        setTime(minutes * 60);
      }, 25000);
    }
  }, [time, minutes]);
  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  useEffect(() => {
    if (isCompleted) {
      if (document.visibilityState === "hidden") {
        showNotification("🍅 Pomodoro Timer", "Take a break!");
      }
    }
  }, [isCompleted]);
  return (
    <div
      className={
        openModal
          ? `w-full h-full block content-center fixed z-10 left-0 top-0 transition-all ease-in 10s bg-[rgba(0,0,0,0.4)] ${
              start && "bg-[rgba(0,0,0,0.7)]"
            } backdrop-blur-sm transition-all duration-300`
          : "hidden"
      }
    >
      <div className="flex flex-col items-center gap-7 ease-in duration-700 animate-modal">
        {isCompleted == true && (
          <span className="text-3xl font-semibold  animate-bounce">
            Take a break!
          </span>
        )}
        <div className="bg-white dark:bg-[var(--darkForeground)] p-8 w-fit rounded-full border-8 dark:border-[var(--accent)] m-auto">
          <span className="text-7xl" id="timer">
            {formatTime()}
          </span>
        </div>
        <div className="flex gap-4">
          {!start && (
            <button
              className="bg-white hover:bg-[var(--paper)]  dark:bg-[var(--darkAccent)] dark:hover:bg-[var(--darkAccentHover)] transition-colors ease-in-out duration-300 p-2 rounded-lg"
              onClick={() => setStart(true)}
            >
              START
            </button>
          )}
          {start && (
            <button
              className="bg-gray-300 hover:bg-[var(--paper)] dark:bg-[var(--darkAccent)] dark:hover:bg-[var(--darkAccentHover)] transition-colors ease-in-out duration-300 p-2 rounded-lg font-bold"
              onClick={() => {
                content.isCompleted = true;
                updateTask(content);
                setOpenModal(false);
              }}
            >
              MARK AS FINISHED
            </button>
          )}
        </div>
        {content.type == "task" && (
          <div className="flex items-center gap-2">
            <input
              name="checkbox"
              type="checkbox"
              className="w-[30px] h-[30px] accent-[var(--accent)] dark:accent-[--darkAccent] cursor-pointer"
            />
            <label
              htmlFor="checkbox"
              className="text-white font-semibold text-xl"
            >
              {content.title}
            </label>
          </div>
        )}
        <button
          className="text-[#FF5C5C] font-bold"
          onClick={() => {
            setStart(false);
            setTime(25 * 60);
            setOpenModal(false);
          }}
        >
          CANCEL
        </button>
      </div>
    </div>
  );
}
