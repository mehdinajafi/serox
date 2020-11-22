import * as React from "react"
import { withRouter, RouteComponentProps } from "react-router-dom"
import { firebase } from "../../firebase/firebase"
import { ReactComponent as ErrorLogo } from "../../assets/icons/error.svg"

interface SignupProps extends RouteComponentProps<any> {
  setAuthMethod: React.Dispatch<React.SetStateAction<"login" | "signup">>
}

const Signup: React.FC<SignupProps> = ({ history, setAuthMethod }) => {
  const [error, setError] = React.useState<null | string>(null)

  const submitForm = React.useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      const [
        userNameInput,
        emailInput,
        passwordInput,
      ]: HTMLFormControlsCollection = (e.target as HTMLFormElement).elements

      if (
        (userNameInput as HTMLInputElement).value.trim() &&
        (emailInput as HTMLInputElement).value.trim() &&
        (passwordInput as HTMLInputElement).value.trim()
      ) {
        firebase
          .firestore()
          .collection("users")
          .doc((userNameInput as HTMLInputElement).value.trim())
          .get()
          .then(async (val) => {
            // If the username was not taken
            if (val.data() === undefined) {
              await firebase
                .auth()
                .createUserWithEmailAndPassword(
                  (emailInput as HTMLInputElement).value.trim(),
                  (passwordInput as HTMLInputElement).value.trim()
                )
                .then((userCredential) => {
                  if (userCredential.user?.displayName) {
                    const username = (userNameInput as HTMLInputElement).value.trim()
                    userCredential.user.displayName = username
                  }
                })
                .catch((error) => {
                  setError(error.message)
                })
              history.push("/")
            } else {
              setError("This username is already taken.")
            }
          })
          .catch((error) => {
            setError(error.message)
          })
      } else {
        setError("You need to enter your username, email and password.")
      }
    },
    [history]
  )

  return (
    <div className="my-4">
      <form onSubmit={submitForm} className="flex flex-col">
        <input
          type="text"
          placeholder="Username"
          className="p-4 mb-2 rounded border border-gray-300 focus:outline-none focus:shadow-outline"
        />
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
          className="p-4 rounded uppercase font-bold bg-green-600 hover:bg-green-700 text-white focus:outline-none"
        >
          Create account
        </button>
      </form>
      <div className="my-4 font-bold text-center text-gray-900">
        Already a seroxer?{" "}
        <button
          className="font-bold text-blue-700 hover:underline focus:outline-none"
          onClick={() => setAuthMethod("login")}
        >
          Log in
        </button>
      </div>
    </div>
  )
}

export default withRouter(Signup)
