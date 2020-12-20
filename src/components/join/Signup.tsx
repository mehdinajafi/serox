import * as React from "react"
import { firebase } from "../../firebase/firebase"
import { ReactComponent as ErrorLogo } from "../../assets/icons/error.svg"
import Loading from "../ui/loading/Loading"

interface SignupProps {
  setAuthMethod: React.Dispatch<React.SetStateAction<"login" | "signup">>
}

const Signup: React.FC<SignupProps> = ({ setAuthMethod }) => {
  const [loading, setLoading] = React.useState<boolean>(true)
  const [error, setError] = React.useState<null | string>(null)

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault()
    const [
      userNameInput,
      emailInput,
      passwordInput,
    ]: HTMLFormControlsCollection = (e.target as HTMLFormElement).elements
    const username = (userNameInput as HTMLInputElement).value.trim()
    const email = (emailInput as HTMLInputElement).value.trim()
    const password = (passwordInput as HTMLInputElement).value.trim()

    if (!username || !email || !password) {
      setError("You need to enter your username, email and password.")
      setLoading(false)
    } else {
      firebase
        .firestore()
        .collection("users")
        .doc(username)
        .get()
        .then((val) => {
          // If the username was not taken
          if (val.data() === undefined) {
            firebase
              .auth()
              .createUserWithEmailAndPassword(email, password)
              // Save username in displayName
              .then((userCredential) => {
                if (userCredential.user) {
                  userCredential.user.updateProfile({ displayName: username })
                }
              })
              // Save username in firestore
              .then(() =>
                firebase
                  .firestore()
                  .collection("users")
                  .doc(username)
                  .set({})
                  .catch((err) => {
                    setError(err.message)
                    setLoading(false)
                  })
              )
              .catch((error) => {
                setError(error.message)
                setLoading(false)
              })
            // If the username was taken
          } else {
            setError("This username is already taken.")
            setLoading(false)
          }
        })
        .catch((error) => {
          setError(error.message)
          setLoading(false)
        })
    }
  }

  if (loading) {
    return <Loading />
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

export default Signup
