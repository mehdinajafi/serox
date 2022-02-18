import { useState } from "react"
import { HashRouter as Router, Route, Switch } from "react-router-dom"
import MessageForm from "../components/home/chat/MessageForm"
import Messages from "../components/home/chat/Messages"
import TargetUser from "../components/home/chat/TargetUser"
import Account from "../components/home/chats/Account"
import MessagesFrom from "../components/home/chats/MessagesFrom"
import Search from "../components/home/chats/Search"
import UserDataProvider from "../contexts/UserDataContext"

const Home = () => {
  const [showChat, setShowChat] = useState(false)

  const changeShowChat = (showChat: boolean) => setShowChat(showChat)

  const Chat = () => (
    <div
      className={`${
        showChat ? "flex flex-col" : "hidden"
      } md:flex md:flex-col md:w-full-96 w-full h-full border-l border-gray-200 `}
    >
      <TargetUser showChat={showChat} changeShowChat={changeShowChat} />
      <Messages />
      <MessageForm />
    </div>
  )

  const Chats = () => (
    <div
      className={`${
        !showChat ? "flex flex-col w-full" : "hidden w-96"
      } md:w-96 md:flex md:flex-col h-full`}
    >
      <Account />
      <Search changeShowChat={changeShowChat} />
      <MessagesFrom changeShowChat={changeShowChat} />
    </div>
  )

  return (
    <UserDataProvider>
      <div className="flex h-full">
        <Router>
          <Chats />

          <Switch>
            <Route path="/:targetUser" component={Chat}></Route>
          </Switch>
        </Router>
      </div>
    </UserDataProvider>
  )
}

export default Home
