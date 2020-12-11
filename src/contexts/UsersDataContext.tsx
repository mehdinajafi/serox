import React, { createContext, ReactNode, useEffect, useState } from "react"
import { firebase } from "../firebase/firebase"
import { userDataType } from "./UserDataContext"

interface usersData {
  [user: string]: userDataType
}

interface UsersContextType {
  usersData: usersData | null
  setUsersData: React.Dispatch<React.SetStateAction<usersData | null>>
}

export const UsersContext = createContext<UsersContextType>({
  usersData: null,
  setUsersData: () => {},
})

interface UsersProviderProps {
  children: ReactNode
}

const UsersDataProvider: React.FC<UsersProviderProps> = ({ children }) => {
  const [usersData, setUsersData] = useState<usersData | null>(null)

  useEffect(() => {
    const listner = firebase
      .database()
      .ref("users")
      .on("value", (data) => {
        setUsersData(data.val())
      })
    return () => firebase.database().ref("users").off("value", listner)
  }, [])

  return (
    <UsersContext.Provider value={{ usersData, setUsersData }}>
      {children}
    </UsersContext.Provider>
  )
}

export default UsersDataProvider
