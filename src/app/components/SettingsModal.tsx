import { Dispatch, SetStateAction } from "react";

type SettingsModalProps = {
  openSettingsModal: boolean;
  setOpenSettingsModal: Dispatch<SetStateAction<boolean>>;
};

export default function SettingsModal({
  openSettingsModal,
  setOpenSettingsModal,
}: SettingsModalProps) {
  return (
    <div
      className={
        openSettingsModal
          ? "block content-center fixed z-10 left-0 top-0 w-full h-full overflow-auto bg-[rgba(0,0,0,0.4)] backdrop-blur-sm"
          : "hidden"
      }
      onClick={() => setOpenSettingsModal(false)}
    >
        <div onClick={(e) => e.stopPropagation()}
        className="flex flex-col bg-[#F3EDED] w-[50%] mx-auto rounded-xl py-5 px-5 transform transition-all duration-300 animate-modal z-10"
        >
            <div className="flex">
                <input type="checkbox"></input>
                <label>Dark Mode</label>
            </div>
        </div>
    </div>
  );
}
