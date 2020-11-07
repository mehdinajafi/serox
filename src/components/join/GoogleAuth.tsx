import * as React from "react"
import { firebase } from "../../firebase/firebase"
import { withRouter, RouteComponentProps } from "react-router-dom"
import { ReactComponent as GoogleLogo } from "../../assets/icons/google.svg"

interface ChildComponentProps extends RouteComponentProps<any> {}

const GoogleAuth: React.FC<ChildComponentProps> = ({ history }) => {
  const signInWithGoogle = async () => {
    await firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
    history.push("/")
  }
  return (
    <div className="flex justify-center my-4">
      <button
        onClick={signInWithGoogle}
        className="w-full flex items-center justify-center rounded border border-gray-300 hover:bg-gray-300 focus:outline-none p-4"
      >
        <GoogleLogo className="w-10 h-10" />
        <span className="ml-2 font-bold text-gray-900">Google</span>
      </button>
    </div>
  )
}

export default withRouter(GoogleAuth)
