import React, { useContext } from "react"
import { Link, useParams } from "react-router-dom"
import { UserContext } from "../../../contexts/UserContext"
import { firebase } from "../../../firebase/firebase"
import { ReactComponent as TrashIcon } from "../../../assets/icons/trash.svg"
import { ReactComponent as XIcon } from "../../../assets/icons/x.svg"
import { ShowChatContext } from "../../../contexts/ShowChatContext"
import { validate as uuidValidate } from "uuid"

const TargetUser: React.FC = () => {
  const { currentUser } = useContext(UserContext)
  const { setShowChat } = useContext(ShowChatContext)
  const { targetUser }: { targetUser: string } = useParams()

  const deleteChat = () => {
    firebase
      .database()
      .ref(`users/${currentUser?.displayName}/chats/${targetUser}`)
      .remove()
      .catch((error) => {
        alert(error.message)
      })
  }

  return (
    <div className="flex justify-between items-center p-2">
      <div className="font-bold text-2xl text-gray-900">
        {uuidValidate(targetUser)
          ? `U-${targetUser.slice(24, 36)}`
          : targetUser}
      </div>
      <div className="flex items-center">
        <Link to="/" title="delete" onClick={deleteChat} className="mr-2">
          <TrashIcon className="w-6 text-red-600" />
        </Link>
        <Link to="/" title="close" onClick={() => setShowChat(false)}>
          <XIcon className="w-10 text-red-600" />
        </Link>
      </div>
    </div>
  )
}

export default TargetUser
