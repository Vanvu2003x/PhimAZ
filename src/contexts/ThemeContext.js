"use client";
import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(null); 

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const defaultTheme = storedTheme || (prefersDark ? "dark" : "light");
    setTheme(defaultTheme);
  }, []);

  useEffect(() => {
    if (theme) localStorage.setItem("theme", theme);
  }, [theme]);

 if (!theme) return (
  <div className="flex justify-center items-center h-screen">
    <div className="md:w-20 md:h-20 w-10 h-10 border-4 border-t-transparent border-blue-500 rounded-full animate-spin" />
  </div>
);


  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
