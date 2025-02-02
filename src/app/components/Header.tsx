"use client";

import GetUserData from "@/utils/GetUserData";
import { UserButton } from "@clerk/nextjs";

export default function Header(){
    const user = GetUserData();
    const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date = new Date();
    const weekDay = week[date.getDay()];
    return (
      <header className="flex w-full h-16 justify-between items-center bg-[#F3EDED] content-center px-3 rounded-2xl shadow-lg">
        <h1 className="text-xl">
          Hello! {user && user.firstName}
        </h1>
        {/* Padding apenas para o icone do menu se encaixar no header quando o menu é ocultado */}
        <div className="flex items-center gap-3">
          <p className="font-light">{weekDay}</p>
          <UserButton />
        </div>
      </header>
    );
}