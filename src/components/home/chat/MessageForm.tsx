import React, { useContext } from "react"
import { firebase } from "../../../firebase/firebase"
import { ReactComponent as SendIcon } from "../../../assets/icons/send.svg"
import { UserContext } from "../../../contexts/UserContext"
import { useParams } from "react-router-dom"
import { UserDataContext } from "../../../contexts/UserDataContext"

const MessageForm: React.FC = () => {
  const { currentUser } = useContext(UserContext)
  const { userData } = useContext(UserDataContext)
  const { targetUser }: { targetUser: string } = useParams()

  const writeNewMessage = (e: React.FormEvent) => {
    e.preventDefault()
    const [
      messageInput,
    ]: HTMLFormControlsCollection = (e.target as HTMLFormElement).elements
    let message = (messageInput as HTMLInputElement).value

    if (!message.trim()) {
      alert("Enter Your Message...")
    } else {
      const newMessage = {
        message,
        time: new Date().getTime(),
        from: currentUser?.displayName,
      }

      // Save the new message in the current user and target user database
      firebase
        .database()
        .ref(`users/${currentUser?.displayName}/chats/${targetUser}`)
        .set([
          ...(userData.chats[targetUser] ? userData.chats[targetUser] : []),
          newMessage,
        ])
        .then(() => {
          firebase
            .database()
            .ref(`users/${targetUser}/chats/${currentUser?.displayName}`)
            .set([
              ...(userData.chats[targetUser] ? userData.chats[targetUser] : []),
              newMessage,
            ])
            .catch((error) => {
              alert(error.message)
            })
        })
        .then(() => {
          // Empty the form to fill out a new form
          const input = document.querySelector(
            "#messageInput"
          ) as HTMLInputElement
          input.value = ""

          // When a message is sent, it scrolls down to see the last message
          const messages = document.querySelector("#messages") as HTMLDivElement
          messages.scrollTop = messages.scrollHeight
        })
        .catch((error) => {
          alert(error.message)
        })
    }
  }

  return (
    <div className="h-10vh w-full py-1 px-2 flex items-center justify-center">
      <form
        onSubmit={writeNewMessage}
        className="flex items-center w-full relative"
      >
        <label htmlFor="messageInput"> </label>
        <input
          className="w-full p-3 border border-gray-400 rounded focus:outline-none"
          id="messageInput"
          placeholder="Enter Your Message..."
        />
        <button type="submit" aria-label="send" className="absolute right-1">
          <SendIcon className="w-8 h-8" />
        </button>
      </form>
    </div>
  )
}

export default MessageForm
