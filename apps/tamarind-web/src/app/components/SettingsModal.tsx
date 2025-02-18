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
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col bg-[#F3EDED] w-[50%] mx-auto rounded-xl py-5 px-5 transform transition-all duration-300 animate-modal z-10"
      >
        <h1 className="font-bold text-2xl text-center">Settings</h1>
        <div className="flex">
          <label className="relative inline-flex cursor-pointer items-center">
            <input id="switch" type="checkbox" className="peer sr-only" />
            <label htmlFor="switch" className="hidden"></label>
            <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
            <span className="text-black ml-1">Dark Mode</span>
          </label>
        </div>
      </div>
    </div>
  );
}
