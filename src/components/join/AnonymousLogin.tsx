import * as React from "react"
import { v4 as uuidv4 } from "uuid"
import { UserContext } from "../../contexts/UserContext"
import { firebase } from "../../firebase/firebase"
import Loading from "../ui/loading/Loading"

const AnonymousLogin = () => {
  const { dispatch } = React.useContext(UserContext)
  const [loading, setLoading] = React.useState<boolean>(false)

  const signInAnonymously = () => {
    setLoading(true)

    firebase
      .auth()
      .signInAnonymously()
      .then(async (userCredential) => {
        if (userCredential.user) {
          await userCredential.user.updateProfile({ displayName: uuidv4() })
          dispatch({
            type: "SET_USER",
            payload: { user: userCredential.user },
          })
        }
      })
      .catch(() => {
        alert("Something went wrong. Please try again.")
        setLoading(false)
      })
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="dark:bg-dark-800 dark:text-gray-400">
      <button
        onClick={signInAnonymously}
        className="w-full py-2 mt-4 flex flex-col items-center border rounded hover:bg-gray-300 dark:border-gray-400 dark:hover:bg-dark-900"
      >
        <div className="text-2xl font-bold">Enter Anonymously</div>
        <div className="text-sm">No Information Needed</div>
      </button>
    </div>
  )
}

export default AnonymousLogin
