import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import AuthProvider from "./contexts/AuthContext"
import ThemeProvider from "./contexts/ThemeContext"
import { ReactNotifications } from "react-notifications-component"
import "react-notifications-component/dist/theme.css"
import "./index.css"

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <ReactNotifications />
        <App />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
