import GetUserData from "@/utils/GetUserData";
import { UseTaskContext } from "@/hooks/taskContext";
import { listTypes, noteTypes, taskTypes } from "@/types/dataTypes";
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
import { UseSnackbarContext } from "@/hooks/snackbarContext";

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
  const [descriptionLength, setDescriptionLength] = useState(0);
  const { setOpenSnackbar, setSnackbarMessage } = UseSnackbarContext();

  const isTask = (task: unknown): task is taskTypes =>
    typeof task === "object" && task !== null && "title" in task;

  const isList = (list: unknown): list is listTypes =>
    typeof list === "object" && list !== null && "tasksCounter" in list;

  const isNote = (note: unknown): note is noteTypes =>
    typeof note === "object" && note !== null && "description" in note;

  const formValues = useRef({
    _id:
      isTask(selectedTask) || isNote(selectedTask)
        ? (selectedTask._id ?? undefined)
        : undefined,
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

  function handleAction() {
    if (action == "Delete" || action == "Finished") {
      return (
        <div className="flex flex-col items-center text-center">
          <h1>
            {action == "Delete"
              ? `Are you sure you want to delete this ${isTask(selectedTask) && selectedTask.type}?`
              : "Mark task as done?"}
          </h1>
          <p>
            {action == "Delete"
              ? "This action cannot be undone!"
              : "Tasks marked as done are moved to Finished section"}
          </p>
          <div className="flex justify-between mt-3 w-full">
            <button
              className="w-24 py-2 px-2 rounded-lg mx-auto font-bold hover:scale-105"
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
                isTask(selectedTask) &&
                selectedTask.type == "task" &&
                !selectedTask.isCompleted
                  ? () => {
                      deleteTask(selectedTask._id!);
                      setOpenModal(false);
                      setSelectedTask(null);
                      setOpenSnackbar(true);
                      setSnackbarMessage("Delete");
                    }
                  : action == "Delete" &&
                      isTask(selectedTask) &&
                      selectedTask.isCompleted
                    ? () => {
                        deleteTask(selectedTask._id!);
                        setOpenModal(false);
                        setSelectedTask(null);
                        setOpenSnackbar(true);
                        setSnackbarMessage("Delete");
                      }
                    : action == "Delete" && isNote(selectedTask)
                      ? () => {
                          deleteNote(selectedTask._id!);
                          setSelectedTask(null);
                          setOpenSnackbar(true);
                          setSnackbarMessage("DeleteNote");
                        }
                      : action == "Delete" && isList(selectedTask)
                        ? () => {
                            deleteList(selectedTask._id!);
                            setSelectedTask(null);
                            setOpenSnackbar(true);
                            setSnackbarMessage("DeleteList");
                          }
                        : () => {
                            if (isTask(selectedTask)) {
                              selectedTask!.isCompleted = true;
                            }
                            updateTask(selectedTask as taskTypes);
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
            className="bg-white dark:bg-[var(--darkPaper)] h-10 rounded-lg px-2"
            required
            type="text"
            placeholder={
              action == "Edit"
                ? `New ${isTask(selectedTask) && selectedTask?.type} name`
                : "Task name"
            }
            autoFocus
            autoCapitalize="words"
            maxLength={60}
            onChange={(e) => (formValues.current.title = e.target.value)}
          />
          <textarea
            className="bg-white dark:bg-[var(--darkPaper)] min-h-40 rounded-lg p-2 max-h-[200px]"
            maxLength={500}
            placeholder={
              action == "Edit"
                ? `New ${isTask(selectedTask) && selectedTask?.type} description`
                : "Task description"
            }
            onChange={(e) => {
              formValues.current.description = e.target.value;
              setDescriptionLength(e.target.value.length);
            }}
          />
          <span className="self-end">{descriptionLength}/500</span>
          <div className="flex items-center justify-between max-w-[70%]">
            {action == "Add new task" && (
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
                  className="bg-white max-w-fit h-10 rounded-lg px-2 dark:bg-[var(--darkForeground)]"
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
                  }}
                />
              </div>
            )}
          </div>
          <div className="flex justify-between mt-3 md:w-[50%] md:mx-auto">
            <button
              className="text-[#FF5C5C] font-bold max-w-fit py-2 px-2 rounded-lg mx-auto hover:bg-[#FF5C5C22]"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                if (
                  action == "Edit" &&
                  isTask(selectedTask) &&
                  selectedTask?.type == "task"
                ) {
                  updateTask({
                    ...formValues.current,
                    type: "task",
                    _id: formValues.current._id ?? undefined,
                  });
                  setOpenModal(false);
                  setOpenSnackbar(true);
                  setSnackbarMessage("Update");
                } else if (action == "Add new task") {
                  postTask({ ...formValues.current, type: "task" });
                  setOpenModal(false);
                  setOpenSnackbar(true);
                  setSnackbarMessage("Add");
                } else if (
                  action == "Edit" &&
                  isTask(selectedTask) &&
                  selectedTask?.type == "note"
                ) {
                  updateNote(formValues.current);
                  setOpenSnackbar(true);
                  setSnackbarMessage("UpdateNote");
                }
              }}
              className="bg-[#201335bb] font-bold text-[#fff] max-w-fit py-2 px-2 rounded-lg mx-auto hover:bg-[#201335dd]"
            >
              {action}{" "}
              {isTask(selectedTask) && selectedTask?.type == "note"
                ? "note"
                : "task"}
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
        className={`flex flex-col max-h-full bg-[var(--background)] dark:bg-[var(--darkBackground)] min-w-fit ${action == "Delete" || action == "Finished" ? "w-fit" : "max-w-[50%]"} mx-auto rounded-xl py-5 px-5 transform transition-all duration-300 animate-modal`}
      >
        <div className="flex justify-between mb-5">
          <h2 className="font-bold text-2xl mx-auto">
            {action}{" "}
            {action === "Add new task" ? "" : 
              isTask(selectedTask) &&
              (selectedTask?.type == "note"
                ? "note"
                : selectedTask?.type == "task"
                  ? "task"
                  : selectedTask?.type == "list"
                    ? "list"
                    : "task")}
          </h2>
        </div>
        {handleAction()}
      </div>
    </div>
  );
}
