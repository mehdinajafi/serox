import React, { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { ShowChatContext } from "../../../contexts/ShowChatContext"
import { UserDataContext } from "../../../contexts/UserDataContext"
import MessageForm from "./MessageForm"
import Messages from "./Messages"
import TargetUser from "./TargetUser"

const Chat = () => {
  const { userData } = useContext(UserDataContext)
  const { showChat, setShowChat } = useContext(ShowChatContext)
  const { targetUser }: { targetUser: string } = useParams()

  useEffect(() => {
    if (targetUser) {
      setShowChat(true)
    } else {
      setShowChat(false)
    }
  }, [setShowChat, showChat, targetUser])

  return (
    <div
      className={`${
        showChat ? "flex flex-col" : "hidden"
      } md:flex md:flex-col md:w-full-96 w-full h-full border-l border-gray-200 `}
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
