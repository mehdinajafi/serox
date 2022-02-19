import { useState } from "react"
import AnonymousLogin from "../components/join/AnonymousLogin"
import Login from "../components/join/Login"
import Signup from "../components/join/Signup"

export enum AuthMethod {
  Login,
  Signup,
}

const Join = () => {
  const [authMethod, setAuthMethod] = useState<AuthMethod>(AuthMethod.Login)

  return (
    <div className="container h-full flex items-center">
      <div className="w-11/12 sm:w-1/4 mx-auto">
        <AnonymousLogin />

        <h1 className="my-2 text-center font-bold text-2xl text-gray-900 dark:text-gray-400">
          {authMethod === AuthMethod.Login ? "Login" : "Create New Account"}
        </h1>

        {authMethod === AuthMethod.Login ? (
          <Login
            setAuthMethod={(method: AuthMethod) => setAuthMethod(method)}
          />
        ) : (
          <Signup
            setAuthMethod={(method: AuthMethod) => setAuthMethod(method)}
          />
        )}
      </div>
    </div>
  )
}

export default Join
