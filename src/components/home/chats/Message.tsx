import React, { useContext, useEffect, useState } from "react"
import moment from "moment"
import { UserContext } from "../../../contexts/UserContext"
import { UserDataContext } from "../../../contexts/UserDataContext"
import { Link } from "react-router-dom"
import { ShowChatContext } from "../../../contexts/ShowChatContext"

interface MessageProps {
  user: string
}

const Message: React.FC<MessageProps> = ({ user }) => {
  const { userData } = useContext(UserDataContext)
  const { currentUser } = useContext(UserContext)
  const { setShowChat } = useContext(ShowChatContext)
  const [lastMessage, setLastMessage] = useState<{
    message: string
    time: number
    from: string
  } | null>(null)

  useEffect(() => {
    // Sort from first to last and select the last message
    setLastMessage(
      userData.chats[user].sort((a, b) => a.time - b.time)[
        userData.chats[user].length - 1
      ]
    )
  }, [user, userData.chats])

  return (
    <>
      <Link
        to={user}
        onClick={() => setShowChat(true)}
        className="flex flex-col p-2 hover:bg-gray-100"
      >
        {lastMessage && (
          <>
            <div className="flex justify-between items-center">
              <div className="font-bold text-gray-900">
                {user === currentUser?.displayName ? "Saved Messages" : user}
              </div>
              <div className="text-sm text-gray-500">
                {new Date(lastMessage.time).getDay() === new Date().getDay()
                  ? moment(lastMessage.time).format("h:mm a")
                  : moment(lastMessage.time).format("Do MMM YY, h:mm a")}
              </div>
            </div>
            <div className="flex items-center text-gray-500">
              <div className="flex items-center">
                <div className="mr-1">
                  {lastMessage.from === currentUser?.displayName
                    ? "you:"
                    : lastMessage.from}
                </div>
                <div>
                  {lastMessage.message.length >= 40
                    ? `${lastMessage.message.slice(0, 40)}...`
                    : lastMessage.message.slice(0, 40)}
                </div>
              </div>
            </div>
          </>
        )}
      </Link>
    </>
  )
}

export default Message
