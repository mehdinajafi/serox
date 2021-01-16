import React, { useContext } from "react"
import { UserDataContext } from "../../../contexts/UserDataContext"
import Message from "./Message"

const MessagesFrom: React.FC = () => {
  const { userData } = useContext(UserDataContext)
  return (
    <div className="flex-grow hide-scrollbar w-full overflow-y-scroll">
      {userData.chats
        ? Object.keys(userData.chats).map((user) => (
            <Message user={user} key={user} />
          ))
        : Array(6)
            .fill("")
            .map((loadingMessage, index) => (
              <div
                key={index}
                className="h-10vh w-full my-2 rounded animate-pulse bg-gray-300"
              ></div>
            ))}
    </div>
  )
}

export default MessagesFrom
