"use client";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "next-themes";
export default function DarkModeButton() {
  const { resolvedTheme, setTheme } = useTheme();
  const toggleMode = resolvedTheme === "dark" ? "light" : "dark";
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        className={`w-12 h-12 rounded-full flex items-center justify-center border dark:border-slate-600 border-slate-50 drop-shadow dark:bg-[#121212] bg-white ${
          resolvedTheme === "dark" ? "text-white" : "text-black"
        }`}
        onClick={() => setTheme(toggleMode)}
      >
        <IconSun
          className={`absolute w-5 h-5 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
            resolvedTheme === "dark" ? "opacity-100 visible" : "opacity-0"
          }`}
        />
        <IconMoon
          className={`absolute w-5 h-5 left-1/2 transform -translate-x-1/2 transition-all duration-300  ${
            resolvedTheme === "light" ? "opacity-100 visible" : "opacity-0"
          }`}
        />
      </button>
    </div>
  );
}
