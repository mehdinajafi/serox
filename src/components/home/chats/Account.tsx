import * as React from "react"
import { UserContext } from "../../../contexts/UserContext"
import { firebase } from "../../../firebase/firebase"
import avatar from "../../../assets/images/avatar.png"
import { ReactComponent as Signout } from "../../../assets/images/signout.svg"

const Account = () => {
  const { currentUser } = React.useContext(UserContext)

  const signout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => window.location.assign("/#/join"))
  }

  return (
    <div className="flex flex-col items-center justify-center py-4 border-b-2 border-gray-300">
      <img
        src={currentUser?.photoURL ? currentUser?.photoURL : avatar}
        className="w-20 h-20 rounded-full"
        alt={currentUser?.displayName ? currentUser?.displayName : "photo"}
      />
      <div className="my-4 text-2xl font-bold text-gray-900">
        {currentUser?.displayName}
      </div>
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
