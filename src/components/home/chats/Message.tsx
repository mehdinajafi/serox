import React, { useContext, useEffect, useState } from "react"
import format from "date-fns/format"
import { AuthContext } from "../../../contexts/AuthContext"
import { IMessage, UserDataContext } from "../../../contexts/UserDataContext"
import { Link } from "react-router-dom"
import { validate as uuidValidate } from "uuid"
import chatTitle from "../../../helper/functions/chatTitle"

interface IMessageComponent {
  user: string
  changeShowChat: (showChat: boolean) => void
}

const Message: React.FC<IMessageComponent> = ({ user, changeShowChat }) => {
  const { userData } = useContext(UserDataContext)
  const { currentUser } = useContext(AuthContext)
  const [lastMessage, setLastMessage] = useState<IMessage | null>(null)

  useEffect(() => {
    // Sort from first to last and select the last message
    if (userData.chats) {
      setLastMessage(
        userData.chats[user].sort((a, b) => a.time - b.time)[
          userData.chats[user].length - 1
        ]
      )
    }
  }, [user, userData.chats])

  const lastMsgFrom = (lastMessage: IMessage) => {
    if (lastMessage.from === currentUser?.displayName) {
      return "You: "
    } else if (uuidValidate(user)) {
      return "Anonymous user: "
    } else {
      return lastMessage.from
    }
  }

  return (
    <React.Fragment>
      <Link
        to={user}
        onClick={() => changeShowChat(true)}
        className="flex flex-col p-2 mx-2 rounded-2xl hover:bg-gray-100 dark:hover:bg-transparent"
      >
        {lastMessage && (
          <React.Fragment>
            <div className="flex justify-between items-center">
              <div className="font-bold text-gray-900 dark:text-gray-200">
                {chatTitle(user, currentUser?.displayName)}
              </div>
              <div className="text-sm text-gray-500">
                {new Date(lastMessage.time).getDay() === new Date().getDay()
                  ? format(lastMessage.time, "K:m aaa")
                  : format(lastMessage.time, "yy/M/d, K:m aaa")}
              </div>
            </div>

            <div className="flex items-center text-gray-500">
              <div className="mr-1">{lastMsgFrom(lastMessage)}</div>
              <div>
                {lastMessage.message.length >= 20
                  ? `${lastMessage.message.slice(0, 20)}...`
                  : lastMessage.message.slice(0, 20)}
              </div>
            </div>
          </React.Fragment>
        )}
      </Link>
    </React.Fragment>
  )
}

export default Message
