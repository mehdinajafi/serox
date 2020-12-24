import React, { useContext, useEffect } from "react"
import { firebase } from "../firebase/firebase"
import { UserContext } from "./UserContext"

export interface userDataType {
  chats: {
    [targetUser: string]: {
      message: string
      time: number
      from: string
    }[]
  } | null
}

interface UserDataContextType {
  userData: userDataType
}

export const UserDataContext = React.createContext<UserDataContextType>({
  userData: { chats: null },
})

interface UserDataProviderProps {
  children: React.ReactNode
}

const UserDataProvider: React.FC<UserDataProviderProps> = ({ children }) => {
  const [userData, setUserData] = React.useState<userDataType>({
    chats: null,
  })
  const { currentUser } = useContext(UserContext)

  useEffect(() => {
    const listner = firebase
      .database()
      .ref(`users/${currentUser?.displayName}`)
      .on("value", (data) => {
        if (data.val()) {
          setUserData(data.val())
        } else {
          setUserData({ chats: {} })
        }
      })
    return () =>
      firebase
        .database()
        .ref(`users/${currentUser?.displayName}`)
        .off("value", listner)
  }, [currentUser?.displayName])

  return (
    <UserDataContext.Provider value={{ userData }}>
      {children}
    </UserDataContext.Provider>
  )
}

export default UserDataProvider
