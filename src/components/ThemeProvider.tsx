"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  mounted: boolean;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
  mounted: false,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  // Initialize theme immediately on mount
  useEffect(() => {
    setMounted(true);

    // Get initial theme from DOM (set by script) or localStorage
    const savedTheme = localStorage.getItem("theme") as Theme;
    const isDarkClass = document.documentElement.classList.contains("dark");

    let initialTheme: Theme = "light";

    if (savedTheme === "dark" || savedTheme === "light") {
      initialTheme = savedTheme;
    } else if (isDarkClass) {
      initialTheme = "dark";
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      initialTheme = "dark";
    }

    setTheme(initialTheme);

    // Ensure DOM is in sync
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Update DOM when theme changes
  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem("theme", theme);

        if (theme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }

        console.log(`Theme changed to: ${theme}`); // Debug log
      } catch (error) {
        console.log("Theme update error:", error);
      }
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    console.log(`Toggling theme from ${theme} to ${newTheme}`); // Debug log
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  return context;
}
