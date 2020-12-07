import React, { useContext } from "react"
import { ShowChatContext } from "../../../contexts/ShowChatContext"
import Account from "./Account"
import MessagesFrom from "./MessagesFrom"

const Chats: React.FC = () => {
  const { showChat } = useContext(ShowChatContext)

  return (
    <div
      className={`${
        showChat ? "hidden min-w-96" : "block w-full"
      } md:block md:w-96`}
    >
      <Account />
      <MessagesFrom />
    </div>
  )
}

export default Chats
