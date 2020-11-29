import React, { useContext } from "react"
import { UserDataContext } from "../../../contexts/UserDataContext"
import Message from "./Message"

const MessagesFrom = () => {
  const { userData } = useContext(UserDataContext)
  return (
    <div>
      {Object.keys(userData.chats).map((user) => (
        <Message user={user} key={user} />
      ))}
    </div>
  )
}

export default MessagesFrom
