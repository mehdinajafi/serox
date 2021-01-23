import * as React from "react"
import AnonymousLogin from "../components/join/AnonymousLogin"
import Login from "../components/join/Login"
import Signup from "../components/join/Signup"

const Join = () => {
  const [authMethod, setAuthMethod] = React.useState<"login" | "signup">(
    "login"
  )
  return (
    <div className="container h-full flex items-center">
      <div className="w-11/12 sm:w-3/6 mx-auto">
        <AnonymousLogin />
        <div>
          <h1 className="my-2 text-center font-bold text-2xl text-gray-900 dark:text-gray-400">
            {authMethod === "login" ? "Or Log in" : "Or Create account"}
          </h1>
        </div>
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
