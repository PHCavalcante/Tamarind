import Image from "next/image";
import { useState } from "react";
import add from "../../assets/add.svg";
// import EmojiPicker from "./EmojiPicker";
import createdAt from "@/utils/GetCurrentTime";
import dots from "../../assets/dots.svg";

type TaskMenuBlankProps = {
  action: string;
}

export default function TaskMenuBlank({action}: TaskMenuBlankProps) {
  const [counter, setCounter] = useState({
    tasksCounter: 0,
    subtasksCounter: 0,
  });
  // const [tasks, setTasks] = useState([]);
  const [isChecked, setIsChecked] = useState<any>({
    tasks: [],
    subtasks: []
  });
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [showSubtasks, setShowSubtasks] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  function renderTasks() {
    const items = [];
    if (counter.tasksCounter == 0) {
      return;
    }
    function taskManagement() {
      document.onkeydown = function (e: any) {
        if (e.key == "Backspace" && e.target.value == "") {
          setCounter({ ...counter, tasksCounter: counter.tasksCounter - 1 });
          delete isChecked[counter.tasksCounter];
          const checkbox = document.getElementById(
            `task ${counter.tasksCounter - 1}`
          );
          checkbox!.focus();
        } else if (e.key == "Enter") {
          setCounter({ ...counter, tasksCounter: counter.tasksCounter + 1 });
          isChecked[counter.tasksCounter] = false;
        }
      };
    }
    for (let i = 0; i < counter.tasksCounter; i++) {
      items.push(
        <li key={i} className="flex items-center gap-2">
          <div className="flex flex-col">
            <div className="flex">
              <button onClick={() => setShowSubmenu(!showSubmenu)}>
                <div className="relative">
                  <div
                    className={
                      showSubmenu
                        ? "flex flex-col absolute w-max z-10 gap-1 bg-[#dfdbdb] rounded"
                        : "hidden"
                    }
                  >
                    <button
                      className="p-2 hover:bg-red-400"
                      onClick={() => setShowDescription(true)}
                    >
                      Add description
                    </button>
                    <button
                      className="p-2 hover:bg-red-400"
                      onClick={() => setCounter({ ...counter, subtasksCounter: counter.subtasksCounter + 1 })}
                    >
                      Add subtask
                    </button>
                  </div>
                </div>
                <Image src={dots} width={20} alt="Submenu icon" />
              </button>
              <input
                id={`task ${i}`}
                type="checkbox"
                checked={isChecked[i]}
                onChange={() =>
                  setIsChecked({ ...isChecked, [i]: !isChecked[i] })
                }
                className="w-5 h-5 peer mr-2"
              />
              <label
                htmlFor={`task ${i}`}
                className="peer-checked:line-through peer-checked:decoration-dashed"
              >
                <input
                  type="text"
                  placeholder="Task title"
                  autoFocus
                  autoCapitalize="words"
                  onInput={taskManagement}
                  className={`${
                    isChecked[i].value && "line-through decoration-dashed"
                  } bg-transparent focus:outline-none text-xl font-bold w-full`}
                />
              </label>
            </div>
            <p className={showDescription ? "mx-10" : "hidden"}>
              Description:{" "}
              <input
                type="text"
                className="bg-transparent focus:outline-none"
              />
            </p>
            <ul className={showSubtasks ? "flex items-center mx-10" : "hidden"}>
              <li className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 peer" />
                <label className="peer-checked:line-through peer-checked:decoration-dashed">
                  <input
                    type="text"
                    placeholder="Subtask tittle"
                    autoFocus
                    className="bg-transparent focus:outline-none text-1xl font-bold w-full"
                  />
                </label>
              </li>
            </ul>
          </div>
        </li>
      );
    }
    return items;
  }
  return (
    <div className="flex flex-col w-full h-full bg-[#F3EDED] py-[14px] px-3 shadow-lg shadow-gray-500/50">
      <div className="flex flex-col w-auto content-center items-center justify-center">
        <input
          type="text"
          placeholder={action == "List" ? "List tittle" : "Note title"}
          autoFocus
          autoCapitalize="words"
          className="flex bg-transparent text-center text-2xl mt-1 font-bold focus:outline-none"
        />
        <span className="opacity-50">
          Created at: <span className="font-bold">{createdAt}</span>
        </span>{" "}
        {/* Lembrar de colocar isso apenas quando o usuário salvar */}
        {/* <EmojiPicker /> */}
      </div>
      {action == "List" && (
        <div className="flex flex-row items-center gap-1 content-center mt-28">
          {/* <h2 className="text-2xl font-bold mt-5">Tasks</h2> */}
          <button
            className="flex items-center gap-1"
            name="addTask"
            onClick={() => {
              setCounter({
                ...counter,
                tasksCounter: counter.tasksCounter + 1,
              });
              isChecked[counter.tasksCounter] = false;
            }}
          >
            <Image src={add} width={20} height={20} alt="Add task button" />
            <label htmlFor="addTask" className="opacity-50 cursor-pointer">
              Add task
            </label>
          </button>
        </div>
      )}
      {action == "List" && (
        <ul className="flex flex-col gap-2 my-4 mx-5">{renderTasks()}</ul>
      )}
      {action == "Note" && (
        <form className="w-full h-full">
          <textarea
            id="note"
            required
            placeholder="Describe your note..."
            maxLength={1000}
            className="w-full h-full text-opacity-15 bg-transparent text-lg focus:outline-none"
          />
        </form>
      )}
      <div>
        <button className="w-full h-10 bg-[#FF5C5C] text-white font-bold rounded-lg">
          Save
        </button>
      </div>
    </div>
  );
}
