import * as React from "react"
import { withRouter, RouteComponentProps } from "react-router-dom"
import { firebase } from "../../firebase/firebase"
import { ReactComponent as ErrorLogo } from "../../assets/icons/error.svg"

interface LoginProps extends RouteComponentProps<any> {
  setAuthMethod: React.Dispatch<React.SetStateAction<"login" | "signup">>
}

const Login: React.FC<LoginProps> = ({ history, setAuthMethod }) => {
  const [error, setError] = React.useState<null | string>(null)

  const submitForm = React.useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      const [
        emailInput,
        passwordInput,
      ]: HTMLFormControlsCollection = (e.target as HTMLFormElement).elements
      if (
        (emailInput as HTMLInputElement).value.trim() &&
        (passwordInput as HTMLInputElement).value.trim()
      ) {
        try {
          await firebase
            .auth()
            .signInWithEmailAndPassword(
              (emailInput as HTMLInputElement).value.trim(),
              (passwordInput as HTMLInputElement).value.trim()
            )
          history.push("/")
        } catch (error) {
          setError(error.message)
        }
      } else {
        setError("You need to enter your email and password.")
      }
    },
    [history]
  )
  return (
    <div className="my-4">
      <form onSubmit={submitForm} className="flex flex-col">
        <input
          type="email"
          placeholder="Email"
          className="p-4 mb-2 rounded border border-gray-300 focus:outline-none focus:shadow-outline"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-4 mb-2 rounded border border-gray-300 focus:outline-none focus:shadow-outline"
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
      <div className="my-4 font-bold text-center text-gray-900">
        New to Serox?{" "}
        <button
          className="font-bold text-blue-700 hover:underline focus:outline-none"
          onClick={() => setAuthMethod("signup")}
        >
          Create an account
        </button>
      </div>
    </div>
  )
}

export default withRouter(Login)
