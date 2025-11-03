import ThemeContext from './createContext'
import { useState,useEffect } from 'react'

function ThemeProvider({children}) {
    const [theme,setTheme] = useState('light')
    const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.documentElement.className = theme; // Applies theme to <html>
  }, [theme]);
  return (
   <ThemeContext.Provider value={{theme,toggleTheme}} >
    {children}
   </ThemeContext.Provider>
  )
}

export default ThemeProvider