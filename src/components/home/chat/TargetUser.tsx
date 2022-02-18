import React, { useContext, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { validate as uuidValidate } from "uuid"
import { UserDataContext } from "../../../contexts/UserDataContext"
import { ReactComponent as TrashIcon } from "../../../assets/icons/trash.svg"
import { ReactComponent as XIcon } from "../../../assets/icons/x.svg"

interface ITargetUser {
  showChat: boolean
  changeShowChat: (showChat: boolean) => void
}

const TargetUser: React.FC<ITargetUser> = ({ showChat, changeShowChat }) => {
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
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
    <div className="flex justify-between items-center p-2 border-b border-gray-200">
      <div className="font-bold text-2xl text-gray-900 dark:text-gray-200">
        {uuidValidate(targetUser)
          ? `U-${targetUser.slice(24, 36)}`
          : targetUser}
      </div>
      <div className="flex items-center">
        <Link to="/" title="delete" onClick={deleteChat} className="mr-2">
          <TrashIcon className="w-6 text-red-600" />
        </Link>
        <Link to="/" title="close" onClick={() => changeShowChat(false)}>
          <XIcon className="w-10 text-red-600" />
        </Link>
      </div>
    </div>
  )
}

export default TargetUser
