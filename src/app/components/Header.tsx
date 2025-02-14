"use client";

import GetUserData from "@/utils/GetUserData";
import { UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const greetings = [
  "Hello!",
  "Hi!",
  "Howdy!",
  "What's new?",
  "What's up?",
  "Yo!"
];

export default function Header(){
    const [isPageLoaded, setIsPageLoaded] = useState(false);
    const user = GetUserData();
    const date = new Date();
    const weekDay = week[date.getDay()];

    useEffect(() => {
      if (document.readyState === "complete") {
        setIsPageLoaded(true);
      } else {
        window.addEventListener("load", () => setIsPageLoaded(true));
        return () => window.removeEventListener("load", () => setIsPageLoaded(true));
      }
    }, []);

    return (
      <header className="flex w-full h-16 justify-between items-center bg-[#F3EDED] content-center px-3 rounded-2xl shadow-lg">
        {isPageLoaded && <div className="flex items-center justify-center">
          <div className="w-max">
            <h1 className="animate-typing overflow-hidden whitespace-nowrap text-xl">
              {greetings.at(Math.floor(Math.random() * greetings.length))} {user && user.firstName}
            </h1>
          </div>
        </div>
        }
        <div className="flex ml-auto items-center gap-3">
          <p className="font-light">{weekDay}</p>
          <UserButton />
        </div>
      </header>
    );
}