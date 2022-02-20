import React, { useContext, useEffect } from "react"
import { RouteComponentProps, useParams, withRouter } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import { UserDataContext } from "../../../contexts/UserDataContext"
import { ReactComponent as TrashIcon } from "../../../assets/icons/trash.svg"
import { ReactComponent as XIcon } from "../../../assets/icons/x.svg"
import chatTitle from "../../../helper/functions/chatTitle"
import showNotification from "../../../helper/functions/showNotification"

interface ITargetUser extends RouteComponentProps {
  showChat: boolean
  changeShowChat: (showChat: boolean) => void
}

const TargetUser: React.FC<ITargetUser> = ({
  showChat,
  changeShowChat,
  history,
}) => {
  const { currentUser } = useContext(AuthContext)
  const { removeChat } = useContext(UserDataContext)
  const { targetUser }: { targetUser: string } = useParams()

  useEffect(() => {
    if (targetUser) {
      changeShowChat(true)
    } else {
      changeShowChat(false)
    }
  }, [changeShowChat, showChat, targetUser])

  const deleteChat = async () => {
    try {
      await removeChat(targetUser)
      changeShowChat(false)
      history.push("/")
    } catch (error: any) {
      if (error && error.message) {
        showNotification({
          type: "danger",
          title: "Error",
          message: error.message,
        })
      } else {
        showNotification({
          type: "danger",
          title: "Error",
          message: "Something went wrong!",
        })
      }
    }
  }

  const closeChat = () => {
    changeShowChat(false)
    history.push("/")
  }

  if (!targetUser) {
    return <div></div>
  }

  return (
    <div className="flex justify-between items-center p-2 border-b border-gray-200">
      <div className="font-bold text-2xl text-gray-900 dark:text-gray-200">
        {chatTitle(targetUser, currentUser?.displayName)}
      </div>

      <div className="flex items-center">
        <button
          title="delete"
          onClick={deleteChat}
          className="flex items-center text-red-600 mr-6"
        >
          <TrashIcon className="w-6 mr-1" />
          <span className="hidden md:inline-block font-bold">Delete</span>
        </button>

        <button
          title="close"
          onClick={closeChat}
          className="flex items-center dark:text-gray-200"
        >
          <XIcon className="w-7" />
          <span className="hidden md:inline-block font-bold">Close</span>
        </button>
      </div>
    </div>
  )
}

export default withRouter(TargetUser)
