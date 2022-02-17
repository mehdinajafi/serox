import { useContext } from "react"
import { AuthContext } from "./contexts/AuthContext"
import Home from "./pages/Home"
import Join from "./pages/Join"

const App = () => {
  const { currentUser } = useContext(AuthContext)

  if (currentUser) {
    return <Home />
  } else {
    return <Join />
  }
}

export default App
