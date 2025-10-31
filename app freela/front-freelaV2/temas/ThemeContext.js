import React, { createContext, useContext, useState } from "react";
import { lightTheme, darkTheme, colorBlindTheme } from "./Theme";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = (type) => {
    if (type === "dark") {
      setTheme(darkTheme);
    } else if (type === "colorBlind") {
      setTheme(colorBlindTheme);
    } else {
      setTheme(lightTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
