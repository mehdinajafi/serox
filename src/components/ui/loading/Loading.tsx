import * as React from "react"
import "./Loading.css"

const Loading = () => {
  return (
    <div className="bg-white">
      <div className="min-h-screen w-screen flex items-center justify-center">
        <div className="sk-cube-grid">
          <div className="sk-cube sk-cube1 bg-yellow"></div>
          <div className="sk-cube sk-cube2 bg-yellow"></div>
          <div className="sk-cube sk-cube3 bg-yellow"></div>
          <div className="sk-cube sk-cube4 bg-yellow"></div>
          <div className="sk-cube sk-cube5 bg-yellow"></div>
          <div className="sk-cube sk-cube6 bg-yellow"></div>
          <div className="sk-cube sk-cube7 bg-yellow"></div>
          <div className="sk-cube sk-cube8 bg-yellow"></div>
          <div className="sk-cube sk-cube9 bg-yellow"></div>
        </div>
      </div>
    </div>
  )
}

export default Loading
