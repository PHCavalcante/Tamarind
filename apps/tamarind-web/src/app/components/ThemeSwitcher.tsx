"use client";
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null;

const handleThemeChange = () => {
    if (theme === "dark") setTheme("light");
    else setTheme("dark");
}

return (
  <div className="flex flex-col gap-2">
  <h1 className="text-lg font-bold">Theming</h1>
  <div className="flex items-center gap-2">
  <p className="text-sm text-gray-500">Change the theme of the app</p>
  <label className="relative inline-flex cursor-pointer items-center">
    <input
      id="switch"
      type="checkbox"
      className="peer sr-only"
      onChange={handleThemeChange}
    />
    <label htmlFor="switch" className="hidden"></label>
    <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
    <span className="ml-2">
      {" "}
      {theme === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </span>
  </label>
  </div>
  </div>
);
}