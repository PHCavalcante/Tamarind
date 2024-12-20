import { Dispatch, SetStateAction, useState, useRef } from "react";
import { updateTask } from "@/services/fetchData";
import { UseTaskContext } from "@/hooks/taskContext";

type modalProps = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  action: string
};

export default function Modal({ openModal, setOpenModal, action }: modalProps) {
  const { selectedTask } = UseTaskContext();
  const [value, setValue] = useState(false);

  const formValues = useRef({
    id: "",
    title: "",
    description: "",
    scheduleTime: Date
  });

  if (selectedTask) {
    formValues.current.id = selectedTask._id;
    console.log("selectedTask is not null");
    console.log(selectedTask._id);
  }else{
    return null;
  }

  const date = new Date();
  const formattedDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  console.log(formattedDate);
  return (
    <div
      className={
        openModal
          ? "block content-center fixed z-10 left-0 top-0 w-full h-full overflow-auto bg-[rgba(0,0,0,0.4)]"
          : "hidden"
      }
      onClick={() => setOpenModal(false)}
    >
      <div onClick={(e) => e.stopPropagation()} className="flex flex-col bg-[#F3EDED] w-[50%] mx-auto rounded-xl py-5 px-5 transform transition-all duration-300 animate-modal">
        <div className="flex justify-between mb-5">
          <h2 className="font-bold text-2xl">{action} task</h2>
          <span
            onClick={() => setOpenModal(false)}
            className="text-3xl font-bold hover:cursor-pointer"
          >
            &times;
          </span>
        </div>
        <form className="flex flex-col gap-5">
          <input
            className="bg-white h-10 rounded-lg px-2"
            required
            type="text"
            placeholder="Task name"
            autoFocus
            autoCapitalize="words"
            onChange={(e) => (formValues.current.title = e.target.value)}
          />
          <input
            className="bg-white h-40 rounded-lg px-2"
            required
            multiple={true}
            type="text"
            placeholder="Task Description"
            onChange={(e) => formValues.current.description = e.target.value}
          ></input>
          <div className="flex items-center justify-between max-w-[50%]">
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
              type="date"
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
            onClick={() => action == "Edit" ? updateTask(formValues.current) : null}
            className="bg-black text-[#fff] max-w-fit py-2 px-2 rounded-lg mx-auto"
          >
            {action} task
          </button>
        </form>
      </div>
    </div>
  );
}
