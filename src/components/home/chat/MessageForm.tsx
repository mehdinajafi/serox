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
        .catch((error) => {
          alert(error.message)
        })

      let input = document.querySelector("#messageInput") as HTMLInputElement
      input.value = ""
    }
  }

  return (
    <div className="h-10vh w-full py-1 px-2 flex items-center justify-center">
      <form
        onSubmit={writeNewMessage}
        className="flex items-center w-full relative"
      >
        <input
          className="w-full p-3 border border-gray-400 rounded focus:outline-none"
          id="messageInput"
          placeholder="Enter Your Message..."
        />
        <div className="absolute right-1">
          <button type="submit">
            <SendIcon className="w-8 h-8" />
          </button>
        </div>
      </form>
    </div>
  )
}

export default MessageForm
