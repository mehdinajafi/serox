import { createContext, useEffect, useState } from "react"

export const ThemeContext = createContext({
  theme: "light",
  changeTheme: () => {},
})

export type Theme = "light" | "dark"

const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("light")

  const changeTheme = () => {
    setTheme((prevTheme) => {
      const theme = prevTheme === "light" ? "dark" : "light"
      localStorage.setItem("theme", theme)
      return theme
    })
  }

  useEffect(() => {
    const localTheme = localStorage.getItem("theme") as Theme | null
    const htmlTag = document.documentElement

    if (localTheme) {
      setTheme(localTheme)
    }

    if (localTheme === "dark") {
      htmlTag.classList.add("dark")
    } else {
      htmlTag.classList.remove("dark")
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
