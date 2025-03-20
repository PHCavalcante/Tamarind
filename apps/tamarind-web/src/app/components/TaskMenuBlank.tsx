import GetUserData from "@/utils/GetUserData";
import { UseTaskContext } from "@/hooks/taskContext";
import { useState, useEffect, useRef } from "react";
import TextFormatter from "./TextFormatter";
import Image from "next/image";
import { postList, postNote } from "@/services/fetchData";
import EmojiPicker from "./EmojiPicker";
import createdAt from "@/utils/getFormattedDateTime";
import { listTypes, taskTypes } from "@/types/dataTypes";
import add from "../../assets/add.svg";
import pencil from "../../assets/pencil.svg";

type TaskMenuBlankProps = {
  action: string;
};

export default function TaskMenuBlank({ action }: TaskMenuBlankProps) {
  const [counter, setCounter] = useState({
    tasksCounter: 0,
    // subtasksCounter: 0,
  });
  // const [tasks, setTasks] = useState([]);
  // const [isChecked, setIsChecked] = useState<any>({
  //   tasks: [],
  //   subtasks: [],
  // });
  const [isChecked, setIsChecked] = useState(Array(counter.tasksCounter).fill(false));
  const [showSubmenu, setShowSubmenu] = useState(false);
  // const [showSubtasks, setShowSubtasks] = useState();
  const [showPicker, setShowPicker] = useState(false);
  // const [showDescription, setShowDescription] = useState<boolean[]>([]);
  const [details, setDetails] = useState({
    userId: "",
    type: "note",
    title: "",
    description: "",
    createdAt: "",
  });
  const emoji = useRef("");
  const userFormattedTextInput = useRef("");
  const { selectedTask, setSelectedTask } = UseTaskContext();
  const user = GetUserData();
  if (user) {
    details.userId = user.id;
  }
  const list = useRef<listTypes>({
    userId: details.userId,
    type: "list",
    title: details.title,
    tasksTitles: [],
    createdAt: "",
    tasksCounter: counter.tasksCounter,
    tasksStatus: isChecked,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.stopPropagation();
      if (
        e.key === "Backspace" &&
        (e.target as HTMLInputElement).value === ""
        && typeof selectedTask == "string" && selectedTask == "List"
      ) {
        setCounter((prevCounter) => {
          const newCounter = prevCounter.tasksCounter - 1;
          isChecked.splice(newCounter, 1);
          document.getElementById(`task ${newCounter}`)?.focus();
          return { ...prevCounter, tasksCounter: newCounter };
        });
      } else if (e.key === "Enter") {
        setCounter((prevCounter) => ({
          ...prevCounter,
          tasksCounter: prevCounter.tasksCounter + 1,
        }));
        setIsChecked((prevIsChecked) => [...prevIsChecked, false]);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isChecked, selectedTask]);

  const isTask = (task: unknown): task is taskTypes =>
      typeof task === "object" && task !== null && "title" in task;

  const handleCheckboxChange = (index: number) => {
    const newIsChecked = [...isChecked];
    newIsChecked[index] = !newIsChecked[index];
    setIsChecked(newIsChecked);
  };

  function renderTasks() {
    const items = [];
    if (counter.tasksCounter == 0) return;
    for (let i = 1; i <= counter.tasksCounter; i++) {
      items.push(
        <li key={i} className="flex items-center gap-2">
          <div className="flex flex-col">
            <div className="flex items-center">
              {/* <Image
                onClick={() => setShowSubmenu(!showSubmenu)}
                src={dots}
                width={20}
                alt="Submenu icon"
                className="cursor-pointer"
                id={`submenuIcon ${i}`}
              /> */}
              <input
                type="checkbox"
                checked={isChecked[i - 1]}
                onChange={() => handleCheckboxChange(i - 1)}
                className="w-5 h-5 peer mr-2 accent-[#201335bb]"
              />
              <label
                htmlFor={`task ${i}`}
                className="peer-checked:line-through peer-checked:decoration-dashed"
              >
                <input
                  id={`task ${i}`}
                  type="text"
                  placeholder="Task title"
                  autoFocus
                  autoCapitalize="words"
                  autoComplete="off"
                  onChange={(e) =>
                    (list.current.tasksTitles[i - 1] = e.target.value)
                  }
                  className={`${
                    isChecked[i - 1] && "line-through decoration-dashed"
                  } bg-transparent focus:outline-none text-xl font-bold w-full`}
                />
              </label>
            </div>
            {/* <p className={showDescription[i] ? "mx-10" : "hidden"}>
              <span className="opacity-50 font-bold">Description: </span>
              <input
                type="text"
                className="bg-transparent focus:outline-none"
              />
            </p> */}
            {/* <ul className={showSubtasks ? "flex items-center mx-10" : "hidden"}>
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
            </ul> */}
          </div>
        </li>
      );
    }
    return items;
  }
  return (
    <div className="flex flex-col w-full h-full bg-[#F3EDED] py-[14px] px-3 shadow-lg shadow-gray-500/50 gap-10 overflow-auto">
      <div className="flex flex-col w-auto content-center items-center justify-center">
        <div className="flex items-center gap-2">
          {showPicker && (
            <EmojiPicker
              showPicker={showPicker}
              setShowPicker={setShowPicker}
              parentEmoji={emoji}
            />
          )}
          <button
            className="ml-auto"
            onClick={() => setShowPicker(!showPicker)}
          >
            {emoji.current == "" ? (
              <Image
                src={pencil}
                className="opacity-40"
                alt="Icon picker button"
              />
            ) : (
              <p
                dangerouslySetInnerHTML={{ __html: emoji.current }}
                className="text-2xl"
              ></p>
            )}
          </button>
          <input
            type="text"
            placeholder={action == "List" ? "List tittle" : "Note title"}
            autoFocus
            required
            autoCapitalize="words"
            onChange={(e) => setDetails({ ...details, title: e.target.value })}
            maxLength={100}
            size={details.title.length == 0 ? 6 : details.title.length}
            className="bg-transparent text-2xl font-bold focus:outline-none"
          />
        </div>
        {isTask(selectedTask) && selectedTask?.createdAt && (
          <span className="opacity-50">
            Created at: <span className="font-bold">{createdAt}</span>
          </span>
        )}
      </div>
      {action == "List" && (
        <div className="flex flex-row items-center gap-1 content-center mt-28">
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
        <ul className="flex flex-col gap-2 my-4 mx-5">
          {renderTasks()}
          {/* This is just for have something to click to close the submenu modal */}
          {showSubmenu && (
            <div
              className="w-full h-full absolute bg-transparent top-0 left-0 translate-x-1 translate-y-1 overflow-hidden"
              onClick={() => setShowSubmenu(false)}
            />
          )}
          {/* <div>
            <div
              className={
                showSubmenu
                  ? "flex flex-col absolute w-max z-10 bg-[#dfdbdb] rounded border border-black"
                  : "hidden"
              }
            >
              <button
                className="p-2 hover:bg-red-400 border border-black"
                onClick={() => {
                  // setShowDescription(true);
                  setShowSubmenu(false);
                  setShowDescription((prev) => [...prev, true])
                }}
              >
                Add description
              </button>
              <button
                className="p-2 hover:bg-red-400 border border-black"
                onClick={() =>
                  setCounter({
                    ...counter,
                    subtasksCounter: counter.subtasksCounter + 1,
                  })
                }
              >
                Add subtask
              </button>
            </div>
          </div> */}
        </ul>
      )}
      <div className="scrollbar flex-1 overflow-scroll ">
        {action == "Note" && (
          <TextFormatter
            readOnly={false}
            text={""}
            inputText={userFormattedTextInput}
          />
        )}
      </div>
      <button
        className="w-full h-10 bg-[#201335bb] text-white font-bold rounded-lg hover:bg-[#201335dd]"
        onClick={
          action === "List"
            ? () => {
                list.current.userId = details.userId;
                list.current.createdAt = createdAt;
                list.current.title = details.title;
                list.current.tasksCounter = counter.tasksCounter;
                list.current.tasksStatus = isChecked;
                postList(list.current);
                setSelectedTask(null);
              }
            : () => {
                const prev = details.title;
                details.title = emoji.current + " " + prev;
                details.createdAt = createdAt;
                details.description = userFormattedTextInput.current;
                postNote(details);
              }
        }
      >
        Save
      </button>
    </div>
  );
}
