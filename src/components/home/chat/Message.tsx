import React, { useContext } from "react"
import { AuthContext } from "../../../contexts/AuthContext"
import format from "date-fns/format"
import { IMessage } from "../../../contexts/UserDataContext"

interface IMessageComponent {
  message: IMessage
}

const Message: React.FC<IMessageComponent> = ({ message }) => {
  const { currentUser } = useContext(AuthContext)

  const formatTime = (time: number) => {
    return format(time, "yy/M/d, K:m aaa")
  }

  return (
    <React.Fragment>
      {message.from === currentUser?.displayName ? (
        <div className="flex flex-col my-2 p-2 max-w-3/4 w-max ml-auto bg-primary-800 rounded-t rounded-bl">
          <div className="break-words text-white">{message.message}</div>
          <div className="ml-auto mt-1 text-sm text-gray-300">
            {formatTime(message.time)}
          </div>
        </div>
      ) : (
        <div className="flex flex-col my-2 p-2 max-w-3/4 w-max mr-auto bg-gray-200 rounded-t rounded-br">
          <div className="break-words text-gray-900">{message.message}</div>
          <div className="mr-auto mt-1 text-sm text-gray-600">
            {formatTime(message.time)}
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

export default Message
