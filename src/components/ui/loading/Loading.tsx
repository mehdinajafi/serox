import * as React from "react"
import "./Loading.css"

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <div className="sk-cube-grid">
        <div className="sk-cube sk-cube1 bg-blue-600"></div>
        <div className="sk-cube sk-cube2 bg-blue-600"></div>
        <div className="sk-cube sk-cube3 bg-blue-600"></div>
        <div className="sk-cube sk-cube4 bg-blue-600"></div>
        <div className="sk-cube sk-cube5 bg-blue-600"></div>
        <div className="sk-cube sk-cube6 bg-blue-600"></div>
        <div className="sk-cube sk-cube7 bg-blue-600"></div>
        <div className="sk-cube sk-cube8 bg-blue-600"></div>
        <div className="sk-cube sk-cube9 bg-blue-600"></div>
      </div>
    </div>
  )
}

export default Loading
