import React, { useEffect, useState } from "react"
import Loading from "../components/ui/loading/Loading"
import { firebase } from "../firebase/firebase"

interface IAuthContext {
  currentUser: firebase.User | null
  setCurrentUser: (user: firebase.User) => void
}

export const AuthContext = React.createContext<IAuthContext>({
  currentUser: null,
  setCurrentUser: (user: firebase.User) => {},
})

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const setCurrentUser = (user: firebase.User) => setUser(user)

  if (loading) {
    return <Loading />
  }

  return (
    <AuthContext.Provider value={{ currentUser: user, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
