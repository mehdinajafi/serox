import React, { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { firebase } from "../firebase/firebase"
import Loading from "../components/ui/Loading"

interface IAuthContext {
  currentUser: firebase.User | null
  setCurrentUser: (user: firebase.User) => void
  login: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential> | Promise<void>
  signup: (username: string, email: string, password: string) => Promise<void>
  loginAnonymously: () => Promise<void>
  signOut: () => Promise<void>
}

export const AuthContext = React.createContext<IAuthContext>({
  currentUser: null,
  setCurrentUser: (user: firebase.User) => {},
  login: async (email: string, password: string) => {},
  signup: async (username: string, email: string, password: string) => {},
  loginAnonymously: async () => {},
  signOut: async () => {},
})

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const setCurrentUser = (user: firebase.User) => setUser(user)

  const login = async (email: string, password: string) => {
    return await firebase.auth().signInWithEmailAndPassword(email, password)
  }

  const signup = async (username: string, email: string, password: string) => {
    return await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        if (userCredential.user) {
          await userCredential.user.updateProfile({ displayName: username })
          setCurrentUser({ ...userCredential.user, displayName: username })
        }
      })
  }

  const loginAnonymously = async () => {
    return await firebase
      .auth()
      .signInAnonymously()
      .then(async (userCredential) => {
        if (userCredential.user) {
          const username = uuidv4()
          await userCredential.user.updateProfile({ displayName: username })
          setCurrentUser({ ...userCredential.user, displayName: username })
        }
      })
  }

  const signOut = async () => {
    return await firebase.auth().signOut()
  }

  if (loading) {
    return <Loading />
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser: user,
        setCurrentUser,
        login,
        signup,
        loginAnonymously,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
