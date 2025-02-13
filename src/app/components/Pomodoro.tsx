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
  useEffect(() => {
    if (start){
    const interval = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }
  }, [start]);

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div
      className={
        openModal
          ? `w-full h-full block content-center fixed z-10 left-0 top-0 ${
              start ? "bg-[rgba(0,0,0,0.4)]" : "bg-[rgba(0,0,0,0.4)]"
            } backdrop-blur-sm transition-all duration-300`
          : "hidden"
      }
    >
      <div className="flex flex-col items-center gap-7 ease-in duration-700 animate-modal">
        <div className="bg-white p-8 w-fit rounded-full border-8 m-auto">
          <span className="text-7xl" id="timer">
            {formatTime()}
          </span>
        </div>
        <div className="flex gap-4">
          <button
            className="bg-white p-2 rounded-lg border-4 border-slate-950"
            onClick={() => setStart(true)}
          >
            START
          </button>
          <button className="bg-gray-300 p-2 rounded-lg" onClick={() => {content.isCompleted = true; console.log(content); updateTask(content); setOpenModal(false)}}>FINISHED</button>
        </div>
        {content.type == "task" && (
          <div className="flex items-center gap-2">
            <input
              name="checkbox"
              type="checkbox"
              className="w-[30px] h-[30px]"
              
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
          className="text-white font-bold"
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
