import { createContext, ReactNode, useEffect, useState } from "react"

export const ThemeContext = createContext({
  theme: "light",
  changeTheme: () => {},
})

interface ThemeProviderProps {
  children: ReactNode
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  const changeTheme = () => {
    setTheme((prevTheme) => {
      const theme = prevTheme === "light" ? "dark" : "light"
      localStorage.setItem("theme", theme)
      return theme
    })
  }

  useEffect(() => {
    const localStorageTheme = localStorage.getItem("theme") as
      | ("light" | "dark")
      | null

    if (localStorageTheme) {
      setTheme(localStorageTheme)
    }

    if (localStorageTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
