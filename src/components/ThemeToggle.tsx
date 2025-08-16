"use client";

import { useTheme } from "./ThemeProvider";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  const handleClick = () => {
    console.log(`Theme toggle clicked. Current theme: ${theme}`); // Debug log
    toggleTheme();
  };

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <div className="p-2 rounded-lg bg-gray-100 border border-gray-300 w-10 h-10 animate-pulse">
        {/* Placeholder while mounting */}
      </div>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 border border-gray-300 dark:border-gray-600 active:scale-95"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <MoonIcon className="h-5 w-5 text-gray-700 transition-transform duration-200" />
      ) : (
        <SunIcon className="h-5 w-5 text-yellow-400 transition-transform duration-200" />
      )}
    </button>
  );
}
