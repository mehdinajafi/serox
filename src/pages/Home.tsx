import * as React from "react"
import { HashRouter as Router, Route, Switch } from "react-router-dom"
import Chat from "../components/home/chat/Chat"
import Chats from "../components/home/chats/Chats"

const Home = () => {
  return (
    <div className="flex">
      <Router basename="#user">
        <Chats />
        <Switch>
          <Route path="/:username" component={Chat} />
        </Switch>
      </Router>
    </div>
  )
}

export default Home
