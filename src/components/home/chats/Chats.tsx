import React, { useContext } from "react"
import { ShowChatContext } from "../../../contexts/ShowChatContext"
import Account from "./Account"
import MessagesFrom from "./MessagesFrom"
import Search from "./Search"

const Chats: React.FC = () => {
  const { showChat } = useContext(ShowChatContext)

  return (
    <div
      className={`${
        !showChat ? "flex flex-col w-full" : "hidden w-96"
      } md:w-96 md:flex md:flex-col h-full`}
    >
      <Account />
      <Search />
      <MessagesFrom />
    </div>
  )
}

export default Chats
