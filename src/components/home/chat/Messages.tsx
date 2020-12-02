import React, { useContext } from "react"
import { useParams } from "react-router-dom"
import { UserDataContext } from "../../../contexts/UserDataContext"
import Message from "./Message"

const Messages = () => {
  const { userData } = useContext(UserDataContext)
  const { targetUser }: { targetUser: string } = useParams()

  return (
    <div className="h-80vh w-full overflow-x-hidden overflow-y-scroll p-2">
      {userData.chats[targetUser] &&
        userData.chats[targetUser].map((message) => {
          return <Message key={message.time} message={message} />
        })}
    </div>
  )
}

export default Messages
