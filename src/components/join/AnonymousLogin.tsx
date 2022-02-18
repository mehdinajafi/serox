import * as React from "react"
import { AuthContext } from "../../contexts/AuthContext"
import Loading from "../ui/loading/Loading"

const AnonymousLogin = () => {
  const { loginAnonymously } = React.useContext(AuthContext)
  const [loading, setLoading] = React.useState<boolean>(false)

  const signInAnonymously = async () => {
    setLoading(true)

    try {
      await loginAnonymously()
    } catch (error) {
      setLoading(false)
    }
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="dark:bg-dark-800 dark:text-gray-400">
      <button
        onClick={signInAnonymously}
        className="w-full py-2 mt-4 flex flex-col items-center border rounded hover:bg-gray-300 dark:border-gray-400 dark:hover:bg-black"
      >
        <div className="text-2xl font-bold">Enter Anonymously</div>
        <div className="text-sm">No Information Needed</div>
      </button>
    </div>
  )
}

export default AnonymousLogin
