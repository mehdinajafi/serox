import * as React from "react"
import { AuthContext } from "../../../contexts/AuthContext"
import { firebase } from "../../../firebase/firebase"
import { ReactComponent as Signout } from "../../../assets/images/signout.svg"
import { validate as uuidValidate } from "uuid"
import { ThemeContext } from "../../../contexts/ThemeContext"
import { ReactComponent as SunIcon } from "../../../assets/icons/sun.svg"
import { ReactComponent as MoonIcon } from "../../../assets/icons/moon.svg"

const Account: React.FC = () => {
  const { currentUser } = React.useContext(AuthContext)
  const { theme, changeTheme } = React.useContext(ThemeContext)

  const signout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => window.location.assign("/"))
  }

  return (
    <div className="flex justify-between items-center p-2">
      {currentUser?.displayName ? (
        <div className="my-1 text-2xl font-bold text-gray-900 dark:text-gray-200">
          {uuidValidate(currentUser.displayName)
            ? `U-${currentUser.displayName.slice(24, 36)}`
            : currentUser?.displayName}
        </div>
      ) : (
        <div className="h-10 w-48 rounded animate-pulse bg-gray-300"></div>
      )}
      <div className="flex space-x-4">
        <button
          className="p-2"
          onClick={() => changeTheme()}
          title={theme === "dark" ? "disable dark mode" : "enabel dark mode"}
        >
          {theme === "dark" ? (
            <SunIcon className="text-white w-5" />
          ) : (
            <MoonIcon className="w-5" />
          )}
        </button>
        <button
          onClick={signout}
          title="Signout"
          className="flex p-2 rounded-full bg-red-600 hover:bg-red-700 text-white"
        >
          <Signout className="w-6 h-6 m-auto" />
        </button>
      </div>
    </div>
  )
}

export default Account
