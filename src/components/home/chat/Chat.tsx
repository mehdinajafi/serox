import React, { useContext } from "react"
import { UserDataContext } from "../../../contexts/UserDataContext"
import MessageForm from "./MessageForm"
import Messages from "./Messages"
import TargetUser from "./TargetUser"

const Chat = () => {
  const { userData } = useContext(UserDataContext)

  return (
    <div className="w-full">
      {userData.chats && (
        <>
          <TargetUser />
          <Messages />
          <MessageForm />
        </>
      )}
    </div>
  )
}

export default Chat
