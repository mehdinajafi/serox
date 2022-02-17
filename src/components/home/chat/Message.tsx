import React, { useContext } from "react"
import { AuthContext } from "../../../contexts/AuthContext"
import moment from "moment"

interface MessageProps {
  message: {
    message: string
    time: number
    from: string
  }
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const { currentUser } = useContext(AuthContext)
  return (
    <>
      {message.from === currentUser?.displayName ? (
        <div className="flex flex-col my-2 p-2 max-w-3/4 w-max ml-auto bg-primary-800 rounded-t rounded-bl">
          <div className="break-words text-white">{message.message}</div>
          <div className="ml-auto mt-1 text-sm text-gray-300">
            {moment(message.time).format("DD MMM, h:mm a")}
          </div>
        </div>
      ) : (
        <div className="flex flex-col my-2 p-2 max-w-3/4 w-max mr-auto bg-gray-200 rounded-t rounded-br">
          <div className="break-words text-gray-900">{message.message}</div>
          <div className="mr-auto mt-1 text-sm text-gray-600">
            {moment(message.time).format("DD MMM, h:mm a")}
          </div>
        </div>
      )}
    </>
  )
}

export default Message
