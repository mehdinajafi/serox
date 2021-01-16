import * as React from "react"
import { UserContext } from "../../../contexts/UserContext"
import { firebase } from "../../../firebase/firebase"
import { ReactComponent as Signout } from "../../../assets/images/signout.svg"
import { validate as uuidValidate } from "uuid"

const Account: React.FC = () => {
  const { currentUser } = React.useContext(UserContext)

  const signout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => window.location.assign("/"))
  }

  return (
    <div className="flex justify-between items-center p-2">
      {currentUser?.displayName ? (
        <div className="my-1 text-2xl font-bold text-gray-900">
          {uuidValidate(currentUser.displayName)
            ? `U-${currentUser.displayName.slice(24, 36)}`
            : currentUser?.displayName}
        </div>
      ) : (
        <div className="h-10 w-48 rounded animate-pulse bg-gray-300"></div>
      )}
      <button
        onClick={signout}
        title="Signout"
        className="flex p-2 rounded-full bg-red-600 hover:bg-red-700 text-white"
      >
        <Signout className="w-6 h-6 m-auto" />
      </button>
    </div>
  )
}

export default Account
