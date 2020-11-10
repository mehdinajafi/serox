import * as React from "react"
import { withRouter, RouteComponentProps } from "react-router-dom"
import { firebase } from "../../firebase/firebase"
import { ReactComponent as ErrorLogo } from "../../assets/icons/error.svg"

interface LoginProps extends RouteComponentProps<any> {}

const Signup: React.FC<LoginProps> = ({ history }) => {
  const [error, setError] = React.useState<null | string>(null)

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault()
    const [
      userNameInput,
      emailInput,
      passwordInput,
    ]: HTMLFormControlsCollection = (e.target as HTMLFormElement).elements
    if (
      (userNameInput as HTMLInputElement).value &&
      (emailInput as HTMLInputElement).value &&
      (passwordInput as HTMLInputElement).value
    ) {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(
          (emailInput as HTMLInputElement).value,
          (passwordInput as HTMLInputElement).value
        )
        .then(async (userCredential) => {
          if (userCredential.user?.displayName) {
            userCredential.user.displayName = (userNameInput as HTMLInputElement).value
          }
        })
        .then(() => {
          history.push("/")
        })
        .catch((err) => {
          setError(err.message)
        })
    } else {
      setError("You need to enter your username, email and password.")
    }
  }
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
          <div className="flex mb-2 text-red-600">
            <ErrorLogo className="h-6 w-6" />
            {error}
          </div>
        )}
        <button
          type="submit"
          className="p-4 rounded bg-primary-700 hover:bg-primary-800 text-white focus:outline-none focus:shadow-outline"
        >
          Signup
        </button>
      </form>
    </div>
  )
}

export default withRouter(Signup)
