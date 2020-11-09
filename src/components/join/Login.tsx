import * as React from "react"
import { withRouter, RouteComponentProps } from "react-router-dom"
import { firebase } from "../../firebase/firebase"

interface LoginProps extends RouteComponentProps<any> {}

const Login: React.FC<LoginProps> = ({ history }) => {
  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault()
    const [
      userNameInput,
      emailInput,
      passwordInput,
    ]: HTMLFormControlsCollection = (e.target as HTMLFormElement).elements
    await firebase
      .auth()
      .signInWithEmailAndPassword(
        (emailInput as HTMLInputElement).value,
        (passwordInput as HTMLInputElement).value
      )
      .then((userCredential) => {
        if (userCredential.user?.displayName) {
          userCredential.user.displayName = (userNameInput as HTMLInputElement).value
        }
      })
      .then(() => {
        history.push("/")
      })
      .catch((err) => {
        throw new Error(err)
      })
  }
  return (
    <div>
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
        <button
          type="submit"
          className="p-4 rounded bg-primary-700 hover:bg-primary-800 text-white focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default withRouter(Login)
