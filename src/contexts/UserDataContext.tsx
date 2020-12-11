import React, { useContext, useEffect } from "react"
import Loading from "../components/ui/loading/Loading"
import { firebase } from "../firebase/firebase"
import { LoadingContext } from "./LoadContext"
import { UserContext } from "./UserContext"

export interface userDataType {
  chats: {
    [targetUser: string]: {
      message: string
      time: number
      from: string
    }[]
  }
}

interface UserDataContextType {
  userData: userDataType
}

export const UserDataContext = React.createContext<UserDataContextType>({
  userData: { chats: {} },
})

interface UserDataProviderProps {
  children: React.ReactNode
}

const UserDataProvider: React.FC<UserDataProviderProps> = ({ children }) => {
  const [userData, setUserData] = React.useState<userDataType>({
    chats: {},
  })
  const { currentUser } = useContext(UserContext)
  const { loading, setLoading } = useContext(LoadingContext)

  useEffect(() => {
    setLoading(true)
    const listner = firebase
      .database()
      .ref(`users/${currentUser?.displayName}`)
      .on("value", (data) => {
        if (data.val()) {
          setUserData(data.val())
          setLoading(false)
        } else {
          setUserData({ chats: {} })
          setLoading(false)
        }
      })
    return () =>
      firebase
        .database()
        .ref(`users/${currentUser?.displayName}`)
        .off("value", listner)
  }, [currentUser?.displayName, setLoading])

  if (loading) {
    return <Loading />
  }

  return (
    <UserDataContext.Provider value={{ userData }}>
      {children}
    </UserDataContext.Provider>
  )
}

export default UserDataProvider
