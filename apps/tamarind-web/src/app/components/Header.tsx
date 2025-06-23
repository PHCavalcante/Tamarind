"use client";

import GetUserData from "@/utils/GetUserData";
import { UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export const week = [
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
const date = new Date();
export const weekDay = week[date.getDay()];
export default function Header(){
    const [isPageLoaded, setIsPageLoaded] = useState(false);
    const user = GetUserData();
    useEffect(() => {
      if (document.readyState === "complete") {
        setIsPageLoaded(true);
      } else {
        window.addEventListener("load", () => setIsPageLoaded(true));
        return () => window.removeEventListener("load", () => setIsPageLoaded(true));
      }
    }, []);

    return (
      <header className="flex flex-col w-full h-16 items-center bg-[var(--background)] dark:bg-[var(--darkBackground)] dark:text-[var(--darkText)] content-center px-3 rounded-l-xl shadow-lg sm:justify-between sm:flex-row">
        {isPageLoaded && <div className="flex items-center justify-center">
          <div className="w-max">
            <h1 className="animate-typing overflow-hidden whitespace-nowrap text-lg md:text-xl">
              {greetings.at(Math.floor(Math.random() * greetings.length))} {user && user.firstName}
            </h1>
          </div>
        </div>
        }
        <div className="flex items-center gap-3">
          <p className="text-sm md:text-base opacity-60">{weekDay}</p>
          <UserButton />
        </div>
      </header>
    );
}