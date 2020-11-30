import React, { useContext } from "react"
import { UserContext } from "../../../contexts/UserContext"

interface MessageProps {
  message: {
    message: string
    time: number
    from: string
  }
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const { currentUser } = useContext(UserContext)
  return (
    <>
      {message.from === currentUser?.displayName ? (
        <div className="my-2 p-2 w-max ml-auto bg-primary-800 text-white rounded-t rounded-bl">
          {message.message}
        </div>
      ) : (
        <div className="my-2 p-2 w-max mr-auto bg-gray-200 text-gray-900 rounded-t rounded-br">
          {message.message}
        </div>
      )}
    </>
  )
}

export default Message
