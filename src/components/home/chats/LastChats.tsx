import React, { useContext } from "react"
import { UserDataContext } from "../../../contexts/UserDataContext"
import Message from "./Message"

interface ILastChats {
  changeShowChat: (showChat: boolean) => void
}

const LastChats: React.FC<ILastChats> = ({ changeShowChat }) => {
  const { userData } = useContext(UserDataContext)

  return (
    <div className="hide-scrollbar overflow-y-scroll">
      {userData.chats ? (
        Object.keys(userData.chats).map((user) => (
          <Message user={user} key={user} changeShowChat={changeShowChat} />
        ))
      ) : (
        <div className="px-2">
          {Array(6)
            .fill("")
            .map((_, index) => (
              <div
                key={index}
                className="h-10vh w-full my-2 rounded-2xl animate-pulse cursor-progress bg-gray-300 -z-10"
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default LastChats
