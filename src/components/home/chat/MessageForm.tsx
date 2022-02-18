import { useContext, useState } from "react"
import { useParams } from "react-router-dom"
import { UserDataContext } from "../../../contexts/UserDataContext"
import { ReactComponent as SendIcon } from "../../../assets/icons/send.svg"

const MessageForm = () => {
  const { sendNewMsg } = useContext(UserDataContext)
  const [msgInput, setMsgInput] = useState<string>("")
  const { targetUser }: { targetUser: string } = useParams()

  const writeNewMessage = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    const [messageInput] = e.target.elements
    let message = (messageInput as HTMLInputElement).value

    if (!message.trim()) {
      alert("Enter Your Message...")
    } else {
      try {
        await sendNewMsg(targetUser, message)
        // Scrolls down to see the last message
        const messages = document.querySelector("#messages") as HTMLDivElement
        messages.scrollTop = messages.scrollHeight
      } catch (error: any) {
        alert(error.message)
      }
    }
  }

  return (
    <div className="w-full flex items-center justify-center border-t border-gray-200">
      <form
        onSubmit={writeNewMessage}
        className="flex items-center w-full relative"
      >
        <label htmlFor="messageInput"></label>
        <input
          className="h-full w-full p-4 focus:outline-none dark:bg-transparent dark:text-gray-200"
          value={msgInput}
          onChange={(e) => setMsgInput(e.target.value)}
          placeholder="Enter Your Message..."
        />
        <button type="submit" aria-label="send" className="absolute right-1">
          <SendIcon className="w-8 h-8 stroke-current text-blue-700" />
        </button>
      </form>
    </div>
  )
}

export default MessageForm
