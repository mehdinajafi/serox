import React, { useEffect, useState } from "react"
import { firebase } from "./firebase/firebase"
import UserProvider from "./contexts/UserContext"
import Home from "./pages/Home"
import Join from "./pages/Join"

const App = () => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user)
      }
    })
  }, [])

  return <UserProvider>{currentUser ? <Home /> : <Join />}</UserProvider>
}

export default App
