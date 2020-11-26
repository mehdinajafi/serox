import React, { ReactNode, useEffect, useState } from "react"
import Loading from "../components/ui/loading/Loading"
import { firebase } from "../firebase/firebase"

type UserContextType = {
  currentUser: null | firebase.User
  userData: null | firebase.firestore.DocumentData
}

export const UserContext = React.createContext<UserContextType>({
  currentUser: null,
  userData: null,
})

type UserProviderProps = {
  children: ReactNode
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [pending, setPending] = useState<boolean>(true)
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null)
  const [userData] = useState<firebase.firestore.DocumentData | null>(null)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user)
      }
      setPending(false)
    })
  }, [])

  if (pending) {
    return <Loading />
  }

  return (
    <UserContext.Provider value={{ currentUser, userData }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
