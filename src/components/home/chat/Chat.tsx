import * as React from "react"
import { useParams } from "react-router-dom"

const Chat = () => {
  const { username }: { username: string } = useParams()
  return <div className="w-full bg-primary-800">{username}</div>
}

export default Chat
