import * as React from "react"
import { HashRouter as Router, Route, Switch } from "react-router-dom"
import Chat from "../components/home/chat/Chat"
import Chats from "../components/home/chats/Chats"
import ShowChatProvider from "../contexts/ShowChatContext"
import UserDataProvider from "../contexts/UserDataContext"
import UsersDataProvider from "../contexts/UsersDataContext"

const Home = () => {
  return (
    <div className="flex h-screen">
      <UsersDataProvider>
        <UserDataProvider>
          <ShowChatProvider>
            <Router basename="#user">
              <Chats />
              <Switch>
                <Route path="/:targetUser" component={Chat} />
              </Switch>
            </Router>
          </ShowChatProvider>
        </UserDataProvider>
      </UsersDataProvider>
    </div>
  )
}

export default Home
