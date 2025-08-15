"use client";

import { useTheme } from "./ThemeProvider";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-black/30 hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-200"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <MoonIcon className="h-5 w-5 text-gray-800 dark:text-gray-200" />
      ) : (
        <SunIcon className="h-5 w-5 text-gray-800 dark:text-gray-200" />
      )}
    </button>
  );
}
