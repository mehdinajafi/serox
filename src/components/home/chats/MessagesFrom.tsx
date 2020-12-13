import React, { useContext } from "react"
import { UserDataContext } from "../../../contexts/UserDataContext"
import Message from "./Message"

const MessagesFrom: React.FC = () => {
  const { userData } = useContext(UserDataContext)
  return (
    <div className="h-60vh w-full overflow-y-scroll">
      {Object.keys(userData.chats).map((user) => (
        <Message user={user} key={user} />
      ))}
    </div>
  )
}

export default MessagesFrom
