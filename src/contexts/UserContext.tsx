import React, { ReactNode, useEffect, useReducer, useState } from "react"
import Loading from "../components/ui/loading/Loading"
import { firebase } from "../firebase/firebase"

interface UserContextType {
  currentUser: null | firebase.User
  dispatch: React.Dispatch<{
    type: string
    payload: {
      user: firebase.User
    }
  }>
}

export const UserContext = React.createContext<UserContextType>({
  currentUser: null,
  dispatch: () => {},
})

interface UserProviderProps {
  children: ReactNode
}

const intialState = {
  user: null,
}

const reducer = (
  state: { user: firebase.User | null },
  action: { type: string; payload: { user: firebase.User } }
) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload.user,
      }
    default:
      return state
  }
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intialState)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch({ type: "SET_USER", payload: { user } })
      }
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <UserContext.Provider value={{ currentUser: state.user, dispatch }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
