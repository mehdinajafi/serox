import React from "react"
import { Link, useParams } from "react-router-dom"
import { ReactComponent as XIcon } from "../../../assets/icons/x.svg"

const TargetUser = () => {
  const { targetUser }: { targetUser: string } = useParams()

  return (
    <div className="h-10vh flex justify-between items-center p-2">
      <div className="font-bold text-2xl text-gray-900">{targetUser}</div>
      <Link to="/">
        <XIcon className="w-10 text-red-600" />
      </Link>
    </div>
  )
}

export default TargetUser
