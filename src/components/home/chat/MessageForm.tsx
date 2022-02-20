import { useContext, useState } from "react"
import { useParams } from "react-router-dom"
import { UserDataContext } from "../../../contexts/UserDataContext"
import { ReactComponent as SendIcon } from "../../../assets/icons/send.svg"
import showNotification from "../../../helper/functions/showNotification"

const MessageForm = () => {
  const { sendNewMsg } = useContext(UserDataContext)
  const [msgInput, setMsgInput] = useState<string>("")
  const { targetUser }: { targetUser: string } = useParams()

  const writeNewMessage = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    const [messageInput] = e.target.elements
    let message = (messageInput as HTMLInputElement).value

    try {
      await sendNewMsg(targetUser, message)
      setMsgInput("")
      // Scrolls down to see the last message
      const messages = document.querySelector("#messages") as HTMLDivElement
      messages.scrollTop = messages.scrollHeight
    } catch (error: any) {
      showNotification({
        type: "danger",
        title: "Error",
        message: "Something went wrong!",
      })
    }
  }

  return (
    <div className="border-t border-gray-200">
      <form onSubmit={writeNewMessage} className="flex items-center relative">
        <label htmlFor="messageInput"></label>
        <input
          placeholder="Enter Your Message..."
          disabled={targetUser === undefined}
          value={msgInput}
          onChange={(e) => setMsgInput(e.target.value)}
          className="h-full w-full p-4 pr-10 disabled:cursor-not-allowed focus:outline-none dark:bg-transparent dark:text-gray-200"
        />
        <button
          type="submit"
          aria-label="send"
          disabled={targetUser === undefined || msgInput.trim() === ""}
          className="absolute right-1 disabled:cursor-not-allowed"
        >
          <SendIcon className="w-8 h-8 stroke-current text-blue-700" />
        </button>
      </form>
    </div>
  )
}

export default MessageForm
