import { Dispatch, SetStateAction, useState } from "react";

type modalProps = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

export default function Modal({ openModal, setOpenModal }: modalProps) {
  const [value, setValue] = useState(false);

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
          <h2 className="font-bold text-2xl">Add new task</h2>
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
          />
          <input
            className="bg-white h-40 rounded-lg px-2"
            required
            multiple={true}
            type="text"
            placeholder="Task Description"
          ></input>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                className="w-5 h-5"
                type="checkbox"
                value={value}
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
            />
            </div>}
          </div>
          {/* {value &&
          <div className="flex items-center gap-3">
            <label>Schedule Time</label>
            <input
              className="bg-white max-w-fit h-10 rounded-lg px-2"
              type="date"
              placeholder="Schedule Time"
            />
          </div>
          } */}
          <button
            type="submit"
            className="bg-black text-[#fff] max-w-fit py-2 px-2 rounded-lg mx-auto"
          >
            Add task
          </button>
        </form>
      </div>
    </div>
  );
}
