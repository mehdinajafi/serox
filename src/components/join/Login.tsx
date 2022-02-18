import * as React from "react"
import Loading from "../ui/loading/Loading"
import { AuthMethod } from "../../pages/Join"
import { AuthContext } from "../../contexts/AuthContext"
import { ReactComponent as ErrorLogo } from "../../assets/icons/error.svg"

interface ILogin {
  setAuthMethod: (method: AuthMethod) => void
}

const Login: React.FC<ILogin> = ({ setAuthMethod }) => {
  const { login } = React.useContext(AuthContext)
  const [error, setError] = React.useState<null | string>(null)
  const [loading, setLoading] = React.useState<boolean>(false)

  const submitForm = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    const [emailInput, passwordInput] = e.target.elements
    const email = (emailInput as HTMLInputElement).value.trim()
    const password = (passwordInput as HTMLInputElement).value.trim()

    if (!email || !password) {
      setError("You need to enter your email and password.")
    } else {
      setLoading(true)

      try {
        await login(email, password)
        setLoading(false)
      } catch (error: any) {
        if (error && error.message) {
          setError(error.message)
        } else {
          setError("Something went wrong! Please try again.")
        }
        setLoading(false)
      }
    }
  }

  return (
    <div className="my-4">
      {loading && <Loading />}

      <form onSubmit={submitForm} className="flex flex-col">
        <input
          type="email"
          placeholder="Email"
          autoComplete="email"
          className="p-4 mb-2 rounded border border-gray-300 focus:outline-none focus:shadow-outline dark:bg-transparent dark:text-gray-300"
        />
        <input
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          className="p-4 mb-2 rounded border border-gray-300 focus:outline-none focus:shadow-outline dark:bg-transparent dark:text-gray-300"
        />
        {error && (
          <div className="flex items-center mb-2 p-2 rounded border border-red-700">
            <ErrorLogo className="h-12 fill-current" />
            <div className="ml-2 text-red-700">{error}</div>
          </div>
        )}
        <button
          type="submit"
          className="p-4 rounded font-bold uppercase bg-primary-700 hover:bg-primary-800 text-white focus:outline-none focus:shadow-outline"
        >
          Log in
        </button>
      </form>

      <div className="my-4 font-bold text-center text-gray-900 dark:text-gray-400">
        New to Serox?{" "}
        <button
          className="font-bold text-blue-700 hover:underline focus:outline-none"
          onClick={() => setAuthMethod(AuthMethod.Signup)}
        >
          Create an account
        </button>
      </div>
    </div>
  )
}

export default Login
