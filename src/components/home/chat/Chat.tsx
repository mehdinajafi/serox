import React, { useContext } from "react"
import { UserDataContext } from "../../../contexts/UserDataContext"
import MessageForm from "./MessageForm"
import Messages from "./Messages"

const Chat = () => {
  const { userData } = useContext(UserDataContext)

  return (
    <div className="w-full p-1">
      {userData.chats && (
        <>
          <Messages />
          <MessageForm />
        </>
      )}
    </div>
  )
}

export default Chat
