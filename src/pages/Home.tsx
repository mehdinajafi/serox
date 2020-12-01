import * as React from "react"
import { HashRouter as Router, Route, Switch } from "react-router-dom"
import Chat from "../components/home/chat/Chat"
import Chats from "../components/home/chats/Chats"
import UserDataProvider from "../contexts/UserDataContext"

const Home = () => {
  return (
    <div className="flex min-h-screen">
      <UserDataProvider>
        <Router basename="#user">
          <Chats />
          <Switch>
            <Route path="/:targetUser" component={Chat} />
          </Switch>
        </Router>
      </UserDataProvider>
    </div>
  )
}

export default Home
