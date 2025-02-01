import GetUserData from "@/utils/GetUserData";
import { UseTaskContext } from "@/hooks/taskContext";
import { taskTypes } from "@/types/dataTypes";
import { Dispatch, SetStateAction, useState, useRef, RefObject } from "react";
import {
  updateTask,
  deleteTask,
  postTask,
  deleteNote,
  updateNote,
  deleteList,
} from "@/services/fetchData";
import createdAt from "@/utils/getFormattedDateTime";

type modalProps = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  action: string;
  checkboxValue?: RefObject<boolean>;
};

export default function Modal({
  openModal,
  setOpenModal,
  action,
  checkboxValue,
}: modalProps) {
  const user = GetUserData();
  const { selectedTask, setSelectedTask } = UseTaskContext();
  const [value, setValue] = useState(false);
  const formValues = useRef({
    _id: selectedTask?._id,
    title: "",
    description: "",
    scheduleDate: "",
    userId: "",
    createdAt: createdAt,
    type: "",
    isCompleted: false,
    inProgress: false,
  });
  if (user) {
    formValues.current.userId = user.id ?? "";
  }
  function removeFromStorage() {
    if (selectedTask) {
      const existingTasks: taskTypes[] = JSON.parse(
        localStorage.getItem("tasks") || "[]"
      );
      const updatedTasks = existingTasks.filter(
        (task) => task._id !== String(selectedTask._id)
      );
      console.log(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  }
  function handleAction() {
    if (action == "Delete" || action == "Finished") {
      return (
        <div className="flex flex-col items-center">
          <h1>
            {action == "Delete"
              ? `Are you sure you want to delete this ${selectedTask?.type}?`
              : "Mark task as done?"}
          </h1>
          <p>
            {action == "Delete"
              ? "This action cannot be undone!"
              : "Tasks marked as done are moved to Finished section"}
          </p>
          <div className="flex justify-between mt-3 w-full">
            <button
              className="text-black w-24 py-2 px-2 rounded-lg mx-auto border-2 font-bold border-black hover:scale-105"
              onClick={() => {
                checkboxValue!.current = false;
                setOpenModal(false);
              }}
            >
              Cancel
            </button>
            <button
              onClick={
                action == "Delete" &&
                !selectedTask!.isCompleted &&
                selectedTask?.type == "task"
                  ? () => {
                      deleteTask(selectedTask._id!);
                      setOpenModal(false);
                      setSelectedTask(null);
                    }
                  : action == "Delete" && selectedTask?.isCompleted
                  ? () => {
                      removeFromStorage();
                      setOpenModal(false);
                      setSelectedTask(null);
                    }
                  : action == "Delete" && selectedTask?.type == "note"
                  ? () => {
                      deleteNote(selectedTask!._id!);
                      setSelectedTask(null);
                    }
                  : action == "Delete" && selectedTask?.type == "list"
                  ? () => {
                      deleteList(selectedTask._id!);
                      setSelectedTask(null);
                    }
                  : () => {
                      selectedTask!.isCompleted = true;
                      updateTask(selectedTask!);
                      setOpenModal(false);
                    }
              }
              className="bg-[#FF5C5C] text-white font-bold w-24 py-2 px-2 rounded-lg mx-auto hover:scale-105"
            >
              {action == "Delete" ? "Delete" : "Yes!"}
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <form className="flex flex-col gap-5">
          <input
            className="bg-white h-10 rounded-lg px-2"
            required
            type="text"
            placeholder={
              action == "Edit" ? `New ${selectedTask?.type} name` : "Task name"
            }
            autoFocus
            autoCapitalize="words"
            maxLength={60}
            onChange={(e) => (formValues.current.title = e.target.value)}
          />
          <textarea
            className="bg-white h-40 rounded-lg p-2 w-[800px] max-w-full"
            maxLength={500}
            placeholder={
              action == "Edit"
                ? `New ${selectedTask?.type} description`
                : "Task description"
            }
            onChange={(e) => (formValues.current.description = e.target.value)}
          />
          <div className="flex items-center justify-between max-w-[70%]">
            {action == "Add new" && (
              <div className="flex items-center gap-2">
                <input
                  className="w-5 h-5 "
                  type="checkbox"
                  checked={value}
                  onChange={() => setValue(!value)}
                />
                <label>Schedule Task?</label>
              </div>
            )}
            {value && (
              <div className="flex items-center gap-3">
                <label>Schedule Time</label>
                <input
                  className="bg-white max-w-fit h-10 rounded-lg px-2"
                  type="datetime-local"
                  required
                  min={createdAt}
                  defaultValue={createdAt}
                  max="2024-12-22"
                  onChange={(e) => {
                    formValues.current.scheduleDate =
                      new Date(e.target.value).toLocaleDateString() +
                      " " +
                      new Date(e.target.value).toLocaleTimeString();
                    console.log(formValues.current.scheduleDate);
                  }}
                />
              </div>
            )}
          </div>
          <div className="flex justify-between mt-3 w-[50%] mx-auto">
            <button
              className="text-black font-bold max-w-fit py-2 px-2 rounded-lg mx-auto border-2 border-black hover:scale-105"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </button>
            <button
              onClick={() =>
                action == "Edit" && selectedTask?.type == "task"
                  ? updateTask({ ...formValues.current, type: "task" })
                  : action == "Add new"
                  ? postTask({ ...formValues.current, type: "task" })
                  : action == "Edit" && selectedTask?.type == "note"
                  ? updateNote(formValues.current)
                  : null
              }
              className="bg-[#FF5C5C] font-bold text-[#fff] max-w-fit py-2 px-2 rounded-lg mx-auto hover:scale-105"
            >
              {action} {selectedTask?.type == "note" ? "note" : "task"}
            </button>
          </div>
        </form>
      );
    }
  }
  return (
    <div
      className={
        openModal
          ? "block content-center fixed z-10 left-0 top-0 w-full h-full overflow-auto bg-[rgba(0,0,0,0.4)] backdrop-blur-sm"
          : "hidden"
      }
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col bg-[#F3EDED] w-fit max-w-[50%] mx-auto rounded-xl py-5 px-5 transform transition-all duration-300 animate-modal"
      >
        <div className="flex justify-between mb-5">
          <h2 className="font-bold text-2xl mx-auto">
            {action}{" "}
            {selectedTask?.type == "note"
              ? "note"
              : selectedTask?.type == "task"
              ? "task"
              : selectedTask?.type == "list"
                ? "lsit"
              : "task"}
          </h2>
        </div>
        {handleAction()}
      </div>
    </div>
  );
}
