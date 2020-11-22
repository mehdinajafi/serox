import * as React from "react"
import GoogleAuth from "../components/join/GoogleAuth"
import Login from "../components/join/Login"
import Signup from "../components/join/Signup"

const Join = () => {
  const [authMethod, setAuthMethod] = React.useState<"login" | "signup">(
    "login"
  )
  return (
    <div className="container">
      <div className="w-11/12 sm:w-3/6 mx-auto">
        <h1 className="my-2 text-center font-bold text-2xl text-gray-900">
          {authMethod === "login" ? "Log in" : "Create account"}
        </h1>
        <GoogleAuth />
        <hr></hr>
        {authMethod === "login" ? (
          <Login setAuthMethod={setAuthMethod} />
        ) : (
          <Signup setAuthMethod={setAuthMethod} />
        )}
      </div>
    </div>
  )
}

export default Join
