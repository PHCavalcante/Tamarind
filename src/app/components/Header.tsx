import Image from "next/image";
import defaultUserPicture from "../../assets/defaultUserPicture.svg"

export default function Header(){
    const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date = new Date();
    const weekDay = week[date.getDay()];
    return (
        <header className="flex w-full h-16 justify-between bg-[#F3EDED] content-center py-4 px-3 rounded-2xl shadow-lg">
            <h1 className="text-2xl font-bold">Tasks</h1>
            <div className="flex items-center gap-3">
                <p>{weekDay}</p>
                <Image src={defaultUserPicture} alt="User Picture" />
            </div>
        </header>
    );
}