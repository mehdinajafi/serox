import React, { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { UserDataContext } from "../../../contexts/UserDataContext"
import Message from "./Message"

const Messages = () => {
  const { userData } = useContext(UserDataContext)
  const { targetUser }: { targetUser: string } = useParams()

  useEffect(() => {
    const messages = document.querySelector("#messages") as HTMLDivElement
    messages.scrollTop = messages.scrollHeight
  }, [userData])

  return (
    <div
      id="messages"
      className="h-80vh w-full overflow-x-hidden overflow-y-scroll p-2"
    >
      {userData.chats[targetUser] &&
        userData.chats[targetUser].map((message) => {
          return <Message key={message.time} message={message} />
        })}
    </div>
  )
}

export default Messages
