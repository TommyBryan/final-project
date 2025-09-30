import { useEffect, useState } from "react";

function ThemeToggle() {
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark" ||
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      onClick={() => setDark((prev) => !prev)}
      className="px-3 py-1 bg-gray-800 text-white rounded mt-4"
    >
      Toggle {dark ? "Light" : "Dark"} Mode
    </button>
  );
}

export default ThemeToggle;
