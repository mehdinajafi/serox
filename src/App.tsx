import React, { useEffect, useState } from "react"
import { firebase } from "./firebase/firebase"
import UserProvider from "./contexts/UserContext"
import Home from "./pages/Home"
import Join from "./pages/Join"
import ThemeProvider from "./contexts/ThemeContext"

const App = () => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user)
      }
    })
  }, [])

  return (
    <ThemeProvider>
      <UserProvider>{currentUser ? <Home /> : <Join />}</UserProvider>
    </ThemeProvider>
  )
}

export default App
