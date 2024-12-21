import { UseTaskContext } from "@/hooks/taskContext";
import Image from "next/image";
import deleteIcon from "../../assets/deleteIcon.svg";
import edit from "../../assets/edit.svg";
import Modal from "./Modal";
import { useState } from "react";

export default function TaskMenu() {
  const { selectedTask } = UseTaskContext();
  const [openModal, setOpenModal] = useState(false);
  const [action, setAction] = useState("");

  if (!selectedTask) return null;

  return (
    <div className="relative w-full bg-[#F3EDED] py-[14px] px-3 shadow-lg shadow-gray-500/50">
      <div className="flex items-center gap-[23px]">
        <h2 className="font-bold text-2xl">{selectedTask.title}</h2>
        <p>Scheduled: Today 8 AM</p>
      </div>
      <h3 className="mt-[25px] font-semibold">{selectedTask.description}</h3>
      <div className="absolute bottom-8">
        <div className="flex flex-row items-center">
          <input
            className="w-[30px] h-[30px] mr-3"
            type="checkbox"
            onChange={() => {setOpenModal((prev) => !prev); setAction("Finished")}}
          />
          <label>Mark as done</label>
          <button onClick={() => {setOpenModal(true); setAction("Edit")}} className="flex items-center hover:scale-105">
            <Image src={edit} className="mr-1 ml-[29px]" alt="Edit Task" />
            Edit Task
          </button>
          <button onClick={() => {setOpenModal(true); setAction("Delete")}} className="flex items-center hover:scale-105">
            <Image
              src={deleteIcon}
              className="mr-3 ml-[29px]"
              alt="Delete Task Button"
            />
            Delete Task
          </button>
        </div>
      </div>
      <Modal openModal={openModal} setOpenModal={setOpenModal} action={action} />
    </div>
  );
}
