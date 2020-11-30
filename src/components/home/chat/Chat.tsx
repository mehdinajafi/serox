import React from "react"
import MessageForm from "./MessageForm"
import Messages from "./Messages"

const Chat = () => {
  return (
    <div className="w-full p-5 relative">
      <Messages />
      <MessageForm />
    </div>
  )
}

export default Chat
