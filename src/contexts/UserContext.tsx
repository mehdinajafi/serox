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
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null)
  const [userData] = useState<firebase.firestore.DocumentData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user)
        setLoading(false)
      }
    })
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <UserContext.Provider value={{ currentUser, userData }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
