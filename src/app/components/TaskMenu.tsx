import { UseTaskContext } from "@/hooks/taskContext";
import Image from "next/image";
import deleteIcon from "../../assets/deleteIcon.svg";
import edit from "../../assets/edit.svg";
import Modal from "./Modal";
import { useState, useRef } from "react";
import timer from "../../assets/timer.svg";
import Pomodoro from "./Pomodoro";
import { updateList, updateTask } from "@/services/fetchData";
import inProgress from "../../assets/inProgress.svg"

export default function TaskMenu() {
  const { selectedTask } = UseTaskContext();
  const [openModal, setOpenModal] = useState(false);
  const [openPomodoro, setOpenPomodoro] = useState(false);
  const [tasksStates, setTasksStates] = useState(selectedTask?.tasksStatus);
  const [action, setAction] = useState("");
  const checkboxValue = useRef(false);

  if (!selectedTask) return null;

  const handleCheckboxChange = (index: number) => {
    const newIsChecked = [...tasksStates as boolean[]];
    newIsChecked[index] = !newIsChecked[index];
    console.log(`valor do newIsChecked: ${newIsChecked}`);
    setTasksStates(newIsChecked);
    console.log(`valor do taskStates: ${tasksStates}`);
    updateList(selectedTask._id!, newIsChecked);
  };
   function handleLists() {
    const items = [];
    if (selectedTask!.tasksCounter && selectedTask!.tasksStatus && selectedTask!.tasksTitles){
    for (let i = 1; i <= selectedTask!.tasksCounter; i++) {
      items.push(
        <li key={i - 1} className="flex items-center gap-2">
          <div className="flex flex-col">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={tasksStates && tasksStates[i - 1]}
                className="w-5 h-5 peer mr-2 hover:cursor-pointer"
                onChange={() => handleCheckboxChange(i - 1)}
              />
              <label
                htmlFor={`task ${i}`}
                className="text-xl font-bold peer-checked:line-through peer-checked:decoration-solid peer-checked:decoration-4"
              >
                {/* <input
                  id={`task ${i}`}
                  type="text"
                  placeholder="Task title"
                  autoFocus
                  autoCapitalize="words"
                  autoComplete="off"
                  // onInput={(e: any) => handleKeyDown(e)}
                  className={`${
                    isChecked[i - 1] && "line-through decoration-dashed"
                  } bg-transparent focus:outline-none text-xl font-bold w-full`}
                /> */}
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
    if (selectedTask && !selectedTask.isCompleted) {
      return (
        <div className="absolute bottom-8">
          <div className="flex flex-row items-center">
            {selectedTask.type == "task" && !selectedTask.inProgress && (
              <button
                className="flex items-center gap-2 mr-4 hover:scale-105"
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
              <input
                className="w-[30px] h-[30px] mr-2 hover:scale-105"
                type="checkbox"
                name="checkbox"
                checked={checkboxValue.current}
                onChange={() => {
                  checkboxValue.current = !checkboxValue.current;
                  setOpenModal((prev) => !prev);
                  setAction("Finished");
                }}
              />
            )}
            {selectedTask.type == "task" && (
              <label htmlFor="checkbox">Mark as done</label>
            )}
            {(selectedTask.type == "task" || selectedTask.type == "note") && (
              <button
                onClick={() => {
                  setOpenModal(true);
                  setAction("Edit");
                }}
                className="flex items-center hover:scale-105"
              >
                <Image src={edit} className="mr-1 ml-4" alt="Edit Task" />
                Edit {selectedTask.type}
              </button>
            )}
            {(selectedTask.type == "task" ||
              selectedTask.type == "note" ||
              selectedTask.type == "list") && (
              <button
                onClick={() => {
                  setOpenModal(true);
                  setAction("Delete");
                }}
                className="flex items-center hover:scale-105"
              >
                <Image
                  src={deleteIcon}
                  className="mr-3 ml-4"
                  alt="Delete Task Button"
                />
                Delete {selectedTask.type}
              </button>
            )}
            {selectedTask.type == "task" && (
              <button
                className="flex items-center hover:scale-105"
                onClick={() => setOpenPomodoro(true)}
              >
                <Image
                  className="mr-2 ml-4"
                  src={timer}
                  alt="Pomodoro button"
                />
                Start pomodoro
              </button>
            )}
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
        Delete Task
      </button>
    );
  }
  return (
    <div className="relative w-full h-full bg-[#F3EDED] py-[14px] px-3 shadow-lg shadow-gray-500/50 rounded-2xl">
      <div
        className={
          selectedTask.type != "note"
            ? "flex items-center gap-[23px]"
            : "flex flex-col items-center"
        }
      >
        <h2
          className={
            selectedTask.type == "note"
              ? "text-center font-bold text-2xl mx-auto"
              : "font-bold text-2xl"
          }
          dangerouslySetInnerHTML={{ __html: selectedTask.title }}
        >
        </h2>
        {selectedTask.createdAt && (
          <span>
            Created at:{" "}
            <span className="font-bold">{selectedTask.createdAt}</span>
          </span>
        )}
        {selectedTask.scheduleDate && (
          <p>
            Scheduled To:{" "}
            {selectedTask.scheduleDate ? (
              <b>{selectedTask.scheduleDate}</b>
            ) : (
              <b>Not scheduled</b>
            )}
          </p>
        )}
      </div>
      <h3 className="mt-[25px] font-semibold">{selectedTask.description}</h3>
      <ul className="flex flex-col gap-2 my-4 mx-5">{handleLists()}</ul>
      {selectedTask.type == "list" && (
        <div className="flex items-center gap-1 mx-4">
          <label className="italic opacity-50">{calculateCompletedListPercentage()}%</label>
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
        content={selectedTask}
      />
    </div>
  );
}
