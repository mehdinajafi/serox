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
    <div className="h-20vh w-full flex flex-col items-center justify-evenly pt-2">
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
        className="flex items-center p-3 rounded bg-red-600 hover:bg-red-700 text-white"
      >
        <Signout className="w-6 h-6 mr-2" />
        <span>Sign out</span>
      </button>
    </div>
  )
}

export default Account
