import React, { useContext, useEffect } from "react"
import Loading from "../components/ui/loading/Loading"
import { firebase } from "../firebase/firebase"
import { LoadingContext } from "./LoadContext"
import { UserContext } from "./UserContext"

export interface userData<T extends keyof any = keyof any> {
  chats: {
    [key in T]: {
      message: string
      time: number
      from: string
    }[]
  }
}

type UserDataContext = {
  userData: userData
}

export const UserDataContext = React.createContext<UserDataContext>({
  userData: { chats: {} },
})

type UserDataProviderProps = {
  children: React.ReactNode
}

const UserDataProvider: React.FC<UserDataProviderProps> = ({ children }) => {
  const [userData, setUserData] = React.useState<userData>({
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
