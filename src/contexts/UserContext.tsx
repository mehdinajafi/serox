import React, { ReactNode, useEffect, useState } from "react"
import { firebase } from "../firebase/firebase"

type UserContextType = {
  currentUser: null | firebase.User
  userData: null | firebase.firestore.DocumentData
}

export const UserContext = React.createContext<Partial<UserContextType>>({
  currentUser: null,
  userData: null,
})

type UserProviderProps = {
  children: ReactNode
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [pending, setPending] = useState<boolean>(true)
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null)
  const [
    userData,
    setUserData,
  ] = useState<firebase.firestore.DocumentData | null>(null)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user)
      }
      setPending(false)
    })
  }, [])

  if (pending) {
    return <div>Loading...</div>
  }

  return (
    <UserContext.Provider value={{ currentUser, userData }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
