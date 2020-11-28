import * as React from "react"
import Account from "./Account"
import MessagesFrom from "./MessagesFrom"

const Chats = () => {
  return (
    <div className="min-w-96 h-screen">
      <Account />
      <MessagesFrom />
    </div>
  )
}

export default Chats
