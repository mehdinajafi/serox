import { useContext } from "react"
import { AuthContext } from "../../../contexts/AuthContext"
import { ReactComponent as Signout } from "../../../assets/images/signout.svg"
import { validate as uuidValidate } from "uuid"
import { ThemeContext } from "../../../contexts/ThemeContext"
import { ReactComponent as SunIcon } from "../../../assets/icons/sun.svg"
import { ReactComponent as MoonIcon } from "../../../assets/icons/moon.svg"
import showNotification from "../../../helper/functions/showNotification"

const Account = () => {
  const { signOut, currentUser } = useContext(AuthContext)
  const { theme, changeTheme } = useContext(ThemeContext)

  const signout = async () => {
    try {
      await signOut()
      window.location.assign("/")
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

  return (
    <div className="flex justify-between items-center p-2">
      {currentUser?.displayName ? (
        <div className="my-1 text-2xl font-bold text-gray-900 dark:text-gray-200">
          {uuidValidate(currentUser.displayName)
            ? "Anonymous"
            : currentUser?.displayName}
        </div>
      ) : (
        <div className="h-10 w-48 rounded animate-pulse cursor-progress bg-gray-300" />
      )}

      <div className="flex space-x-4">
        <button
          className="flex items-center justify-center w-10 h-10 p-2 hover:bg-slate-200 dark:hover:bg-neutral-900 rounded-full"
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
