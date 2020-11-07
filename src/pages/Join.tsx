import * as React from "react"
import GoogleAuth from "../components/join/GoogleAuth"

const Join = () => {
  return (
    <div className="container">
      <div className="w-11/12 sm:w-3/6 mx-auto">
        <h1 className="text-center font-bold text-2xl text-gray-900">
          Hi, Join us
        </h1>
        <GoogleAuth />
        <hr></hr>
      </div>
    </div>
  )
}

export default Join
