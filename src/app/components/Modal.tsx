import { Dispatch, SetStateAction, useState, useRef } from "react";
import { updateTask, deleteTask, postTask } from "@/services/fetchData";
import { UseTaskContext } from "@/hooks/taskContext";

type modalProps = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  action: string
};

export default function Modal({ openModal, setOpenModal, action }: modalProps) {
  const { selectedTask, setSelectedTask } = UseTaskContext();
  const [value, setValue] = useState(false);

  const formValues = useRef({
    id: "",
    title: "",
    description: "",
    scheduleTime: Date
  });

  if (selectedTask) {
    formValues.current.id = selectedTask._id;
  }

  const date = new Date();
  const formattedDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  function handleAction(){
    if (action == "Delete" || action == "Finished") {
      return (
      <div className="flex flex-col items-center">
        <h1 className="font-bold">{action == "Delete" ? "Are you sure you want to delete this task?" : "Mark task as done?"}</h1>
        <p>{action == "Delete" ? "This action cannot be undone!" : "Tasks marked as done are moved to done section"}</p>
        {action == "Finished" && <p>Tasks in done section are deleted in a few days</p>}
        <div className="flex justify-between mt-3 w-full">
          <button className="bg-black text-[#fff] w-24 py-2 px-2 rounded-lg mx-auto hover:scale-105" onClick={() => setOpenModal(false)}>Cancel</button>
          <button onClick={() => {deleteTask(formValues.current.id); setOpenModal(false); setSelectedTask(null)}}
             className="bg-black text-[#fff] w-24 py-2 px-2 rounded-lg mx-auto hover:scale-105" >{action == "Delete" ? "Delete" : "Yes!"}</button>
        </div>
      </div>);  
    }else{
      return(
        <form className="flex flex-col gap-5">
        <input
          className="bg-white h-10 rounded-lg px-2"
          required
          type="text"
          placeholder="Task name"
          autoFocus
          autoCapitalize="words"
          maxLength={60}
          onChange={(e) => (formValues.current.title = e.target.value)}
        />
        <input
          className="bg-white h-40 rounded-lg px-2 w-[800px] max-w-full"
          required
          multiple={true}
          type="text"
          placeholder="Task Description"
          onChange={(e) => formValues.current.description = e.target.value}
        ></input>
        <div className="flex items-center justify-between max-w-[70%]">
          <div className="flex items-center gap-2">
            <input
              className="w-5 h-5 "
              type="checkbox"
              checked={value}
              onChange={() => setValue(!value)}
            />
            <label>Schedule Task?</label>
          </div>
          {value && <div className="flex items-center gap-3">
          <label>Schedule Time</label>
          <input
            className="bg-white max-w-fit h-10 rounded-lg px-2"
            type="datetime-local"
            required
            min={formattedDate}
            defaultValue={formattedDate}
            max="2024-12-22"
            // onChange={(e) => (formValues.current.scheduleTime = e.target.value)}
          />
          </div>}
        </div>
        <button
          type="submit"
          onClick={() => action == "Edit" ? updateTask(formValues.current) : action == "Add new" ? postTask(formValues.current) : null}
          className="bg-black text-[#fff] max-w-fit py-2 px-2 rounded-lg mx-auto hover:scale-105"
        >
          {action} task
        </button>
      </form>
      );
    }
  }

  return (
    <div
      className={
        openModal
          ? "block content-center fixed z-10 left-0 top-0 w-full h-full overflow-auto bg-[rgba(0,0,0,0.4)]"
          : "hidden"
      }
      onClick={() => setOpenModal(false)}
    >
      <div onClick={(e) => e.stopPropagation()} className="flex flex-col bg-[#F3EDED] w-fit max-w-[50%] mx-auto rounded-xl py-5 px-5 transform transition-all duration-300 animate-modal">
        <div className="flex justify-between mb-5">
          <h2 className="font-bold text-2xl">{action} task</h2>
          <span
            onClick={() => setOpenModal(false)}
            className="text-3xl font-bold hover:cursor-pointer"
            >
            &times;
          </span>
        </div>
            {handleAction()}
      </div>
    </div>
  );
}
