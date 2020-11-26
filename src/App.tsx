import React from "react"
import { HashRouter as Router, Route, Switch } from "react-router-dom"
import LoadingProvider from "./contexts/LoadContext"
import UserProvider from "./contexts/UserContext"
import PrivateRoute from "./PrivateRoute"
import Home from "./pages/Home"
import Join from "./pages/Join"

const App = () => {
  return (
    <LoadingProvider>
      <UserProvider>
        <Router>
          <>
            {/* If the user is not authenticated, User will be redirected to the join page.
            Otherwise user will enter to Home. */}
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <Route exact path="/join" component={Join} />
            </Switch>
          </>
        </Router>
      </UserProvider>
    </LoadingProvider>
  )
}

export default App
