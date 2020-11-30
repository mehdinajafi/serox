import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../contexts/UserContext"
import { UserDataContext } from "../../../contexts/UserDataContext"

interface MessageProps {
  user: string
}

const Message: React.FC<MessageProps> = ({ user }) => {
  const { userData } = useContext(UserDataContext)
  const { currentUser } = useContext(UserContext)
  const [lastMessage, setLastMessage] = useState<{
    message: string
    time: number
    from: string
  }>()

  useEffect(() => {
    setLastMessage(
      userData.chats[user].sort((a, b) => a.time - b.time)[
        userData.chats[user].length - 1
      ]
    )
  }, [user, userData.chats])

  return (
    <>
      <div className="flex flex-col p-4">
        {lastMessage && (
          <>
            <div className="font-bold text-gray-900">{user}</div>
            <div className="flex justify-between items-center text-gray-500">
              <div className="flex items-center">
                <div className="mr-1">
                  {lastMessage.from === currentUser?.displayName
                    ? "you:"
                    : lastMessage.from}
                </div>
                <div>{lastMessage.message.slice(0, 30)}...</div>
              </div>
              <div>20 min ago</div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Message
