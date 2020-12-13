import React, { useContext } from "react"
import { ShowChatContext } from "../../../contexts/ShowChatContext"
import { UserDataContext } from "../../../contexts/UserDataContext"
import MessageForm from "./MessageForm"
import Messages from "./Messages"
import TargetUser from "./TargetUser"

const Chat = () => {
  const { userData } = useContext(UserDataContext)
  const { showChat } = useContext(ShowChatContext)

  return (
    <div
      className={`${
        showChat ? "flex flex-col" : "hidden"
      } md:flex md:flex-col h-full w-full`}
    >
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
