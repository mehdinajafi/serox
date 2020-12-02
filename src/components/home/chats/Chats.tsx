import * as React from "react"
import Account from "./Account"
import MessagesFrom from "./MessagesFrom"

const Chats = () => {
  return (
    <div className="min-w-96">
      <Account />
      <MessagesFrom />
    </div>
  )
}

export default Chats
