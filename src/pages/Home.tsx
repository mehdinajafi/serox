import * as React from "react"
import { firebase } from "../firebase/firebase"

const Home = () => {
  return (
    <div>
      <button onClick={() => firebase.auth().signOut()}>sign out</button>
    </div>
  )
}

export default Home
