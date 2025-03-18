import { UseTaskContext } from "@/hooks/taskContext";
import Image from "next/image";
import deleteIcon from "../../assets/deleteIcon.svg";
import edit from "../../assets/edit.svg";
import Modal from "./Modal";
import { useState, useRef, useEffect } from "react";
import timer from "../../assets/timer.svg";
import Pomodoro from "./Pomodoro";
import { updateList, updateTask, updateNote } from "@/services/fetchData";
import inProgress from "../../assets/inProgress.svg"
import TextFormatter from "./TextFormatter";
import { isTask, isNote, isList } from "@/utils/dataCheck";
import { taskTypes } from "@/types/dataTypes";

export default function TaskMenu() {
  const { selectedTask } = UseTaskContext();
  const [openModal, setOpenModal] = useState(false);
  const [openPomodoro, setOpenPomodoro] = useState(false);
  const [tasksStates, setTasksStates] = useState<boolean[]>(isList(selectedTask) && selectedTask?.tasksStatus || []);
  const [action, setAction] = useState("");
  const checkboxValue = useRef(false);
  const [editorReadOnly, setEditorReadOnly] = useState(true);
  const [openContextMenu, setOpenContextMenu] = useState(false);
  const userFormattedTextInput = useRef("");

  useEffect(() => {
    if (isList(selectedTask) && !selectedTask?.tasksStatus) return;
    if (isList(selectedTask)) setTasksStates(selectedTask.tasksStatus);
  },[selectedTask]);

  if (!selectedTask) return null;
  
  const handleCheckboxChange = (index: number) => {
    const newIsChecked = [...tasksStates];
    newIsChecked[index] = !newIsChecked[index];
    setTasksStates(newIsChecked);
    if (isList(selectedTask)) updateList(selectedTask._id!, newIsChecked);
  };
   function handleLists() {
    const items = [];
    if (isList(selectedTask) && selectedTask?.tasksCounter && selectedTask?.tasksStatus && selectedTask?.tasksTitles){
    for (let i = 1; i <= selectedTask!.tasksCounter; i++) {
      items.push(
        <li key={i - 1} className="flex items-center gap-2">
          <div className="flex flex-col">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={tasksStates[i - 1] || false}
                className="w-5 h-5 peer mr-2 hover:cursor-pointer"
                onChange={() => handleCheckboxChange(i - 1)}
              />
              <label
                htmlFor={`task ${i}`}
                className="text-xl font-bold peer-checked:line-through peer-checked:decoration-solid peer-checked:decoration-4"
              >
                {selectedTask?.tasksTitles[i - 1]}
              </label>
            </div>
          </div>
        </li>
      );
      }     
    }
    return (items);
   }
   function calculateCompletedListPercentage() {
    if (!tasksStates) return;
    const completedTasksCount = tasksStates.filter((task) => task === true).length;
    return (completedTasksCount / tasksStates.length) * 100;
   }
  function HandleVisual() {
    // condicionais usando selectedTask.scheduleDate apenas para verificar se foi passada uma note ao invés de uma task
    // porque notes não possuem scheduleDate
    if (isTask(selectedTask) && !selectedTask.isCompleted) {
      return (
        <div className="w-full absolute bottom-8">
          <button
            onClick={() => setOpenContextMenu((prev) => !prev)}
            className="flex items-center lg:hidden bg-[#201335bb] text-white font-bold p-2 gap-3 rounded-lg justify-between"
          >
            <span>Actions </span>
            <div className="h-7 border-l-2 border-white bg-white"></div>
            <span className={`text-lg transition-all ease-in-out duration-300 ${openContextMenu ? "rotate-180" : "rotate-0"}`}>▼</span>
          </button>
          <div
            className={`absolute bottom-12 md:bottom-0 lg:block bg-[#e4dede] lg:opacity-100 p-2 rounded-lg lg:bg-transparent transition-all ease-in-out duration-500 ${openContextMenu ? "block" : "opacity-0 transition-none"}`}
          >
            <div className="flex flex-col flex-wrap justify-center content-center gap-5 p-2 lg:flex-row">
              {selectedTask.type == "task" && !selectedTask.inProgress && (
                <button
                  className="flex items-center gap-2 hover:scale-105"
                  onClick={() => {
                    {
                      selectedTask.inProgress = true;
                      selectedTask.type = selectedTask.type;
                      updateTask(selectedTask);
                    }
                  }}
                >
                  <Image
                    width={40}
                    height={40}
                    src={inProgress}
                    alt="In progress button"
                  />
                  Set to in progress
                </button>
              )}
              {selectedTask.type == "task" && (
                <div className="flex items-center gap-2">
                  <input
                    className="w-[30px] h-[30px] hover:scale-105 accent-[#201335bb]"
                    id="checkbox"
                    type="checkbox"
                    checked={checkboxValue.current}
                    onChange={() => {
                      checkboxValue.current = !checkboxValue.current;
                      setOpenModal((prev) => !prev);
                      setAction("Finished");
                    }}
                  />
                  <label htmlFor="checkbox">Mark as done</label>
                </div>
              )}
              {["task", "note"].includes(selectedTask.type) &&
                editorReadOnly && (
                  <button
                    onClick={
                      selectedTask.type == "task"
                        ? () => {
                            setOpenModal(true);
                            setAction("Edit");
                          }
                        : () =>
                            selectedTask.type == "note"
                              ? setEditorReadOnly(false)
                              : null
                    }
                    className="flex items-center hover:scale-105 gap-2"
                  >
                    <Image src={edit} alt="Edit Task" />
                    Edit {selectedTask.type}
                  </button>
                )}
              {["task", "note", "list"].includes(selectedTask.type) &&
                editorReadOnly && (
                  <button
                    onClick={() => {
                      setOpenModal(true);
                      setAction("Delete");
                    }}
                    className="flex items-center hover:scale-105 gap-2"
                  >
                    <Image src={deleteIcon} alt="Delete Task Button" />
                    Delete {selectedTask.type}
                  </button>
                )}
              {selectedTask.type == "task" && (
                <button
                  className="flex items-center hover:scale-105 gap-2"
                  onClick={() => setOpenPomodoro(true)}
                >
                  <Image src={timer} alt="Pomodoro button" />
                  Start pomodoro
                </button>
              )}
              {!editorReadOnly && (
                <button
                  className="w-full h-10 bg-[#FF5C5C] text-white font-bold rounded-lg"
                  onClick={() => {
                    selectedTask.description = userFormattedTextInput.current;
                    updateNote(selectedTask);
                  }}
                >
                  Save changes
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }
    return (
      <button
        onClick={() => {
          setOpenModal(true);
          setAction("Delete");
        }}
        className="flex items-center hover:scale-105 absolute bottom-8 "
      >
        <Image
          src={deleteIcon}
          className="mr-3 ml-4"
          alt="Delete Task Button"
        />
        Delete {isTask(selectedTask) ? "task" : isNote(selectedTask) ? "note" : "list"}
      </button>
    );
  }
  return (
    <div className="relative w-full h-full bg-[#F3EDED] py-[14px] px-3 shadow-lg shadow-gray-500/50 rounded-2xl">
      <div
        className={
          !isNote(selectedTask)
            ? "flex flex-wrap items-center justify-between md:gap-[23px]"
            : "flex flex-col items-center"
        }
      >
        <h2
          className={
            isNote(selectedTask)
              ? "text-center font-bold text-2xl mx-auto"
              : "font-bold text-2xl"
          }
          dangerouslySetInnerHTML={(isTask(selectedTask) || isNote(selectedTask) || isList(selectedTask)) ? { __html: selectedTask.title } : { __html: "Unknown" }}
        ></h2>
        <div className="flex gap-3">
          {isTask(selectedTask) || isNote(selectedTask) && selectedTask.createdAt && (
            <span className="text-sm opacity-60">
              Created at:{" "}
              <span className="font-bold">{selectedTask.createdAt}</span>
            </span>
          )}
          {isTask(selectedTask) && selectedTask.scheduleDate && (
            <span className="text-sm opacity-60">
              Scheduled To:{" "}
              {selectedTask.scheduleDate ? (
                <b>{selectedTask.scheduleDate}</b>
              ) : (
                <b>Not scheduled</b>
              )}
            </span>
          )}
        </div>
      </div>
        <div>
          {isNote(selectedTask) &&
            <TextFormatter
              inputText={userFormattedTextInput}
              text={selectedTask.description}
              readOnly={editorReadOnly}
            />
          }
          {isTask(selectedTask) && <textarea
            name="description"
            value={selectedTask.description}
            className="w-full h-full bg-transparent mt-6 focus:outline-none"
            readOnly
          />
          }
        </div>
      {isList(selectedTask) && selectedTask.tasksStatus && (
        <ul className="flex flex-col gap-2 my-4 mx-5">{handleLists()}</ul>
      )}
      {isList(selectedTask) && (
        <div className="flex items-center gap-1 mx-4">
          <label className="italic opacity-50">
            {calculateCompletedListPercentage()}%
          </label>
          <div
            className="flex w-24 h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-300"
            role="progressbar"
          >
            <div
              className="flex flex-col justify-center rounded-full overflow-hidden bg-blue-600 text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-500"
              style={{ width: `${calculateCompletedListPercentage()}%` }}
            ></div>
          </div>
        </div>
      )}
      {HandleVisual()}
      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        action={action == "Add new" ? "" : action}
        checkboxValue={checkboxValue}
      />
      <Pomodoro
        minutes={25}
        openModal={openPomodoro}
        setOpenModal={setOpenPomodoro}
        content={selectedTask as taskTypes}
      />
    </div>
  );
}
