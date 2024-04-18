"use client";

import { useEffect } from "react";

function ThemeButton() {
  useEffect(() => {
    const selectedTheme = localStorage.getItem("theme");
    if (selectedTheme) {
      document.body.classList.replace("dark", selectedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.replace("dark", "light");
    }
  }, []);

  function handleThemeChange() {
    const selectedTheme = localStorage.getItem("theme");
    if (selectedTheme) {
      localStorage.setItem(
        "theme",
        selectedTheme === "light" ? "dark" : "light",
      );
      document.body.classList.replace(
        selectedTheme,
        selectedTheme === "light" ? "dark" : "light",
      );
    } else {
      localStorage.setItem("theme", "dark");
      document.body.classList.add("dark");
    }
  }

  return (
    <button onClick={handleThemeChange}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-6 w-6"
      >
        <path
          fillRule="evenodd"
          d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
}
export default ThemeButton;
