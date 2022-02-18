import React, { useContext, useEffect } from "react"
import { firebase } from "../firebase/firebase"
import { AuthContext } from "./AuthContext"

export interface IMessage {
  message: string
  time: number
  from: string
}

export interface IUserData {
  chats: {
    [targetUser: string]: IMessage[]
  }
}

interface IUserDataContext {
  userData: IUserData
  sendNewMsg: (targetUser: string, msg: string) => Promise<void>
  removeChat: (targetUser: string) => Promise<any>
}

export const UserDataContext = React.createContext<IUserDataContext>({
  userData: { chats: {} },
  sendNewMsg: async () => {},
  removeChat: async () => {},
})

const UserDataProvider: React.FC = ({ children }) => {
  const [userData, setUserData] = React.useState<IUserData>({
    chats: {},
  })
  const { currentUser } = useContext(AuthContext)

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

  const sendNewMsg = async (targetUser: string, msg: string) => {
    const msgObj = {
      time: new Date().getTime(),
      from: currentUser?.displayName,
      msg,
    }

    return await firebase
      .database()
      .ref(`users/${currentUser?.displayName}/chats/${targetUser}`)
      .set([
        ...(userData.chats[targetUser] ? userData.chats[targetUser] : []),
        msgObj,
      ])
      .then(() => {
        if (userData.chats) {
          firebase
            .database()
            .ref(`users/${targetUser}/chats/${currentUser?.displayName}`)
            .set([
              ...(userData.chats[targetUser] ? userData.chats[targetUser] : []),
              msgObj,
            ])
            .catch((error) => {
              alert(error.message)
            })
        }
      })
  }

  const removeChat = async (targetUser: string) => {
    return await firebase
      .database()
      .ref(`users/${currentUser?.displayName}/chats/${targetUser}`)
      .remove()
  }

  return (
    <UserDataContext.Provider value={{ userData, removeChat, sendNewMsg }}>
      {children}
    </UserDataContext.Provider>
  )
}

export default UserDataProvider
