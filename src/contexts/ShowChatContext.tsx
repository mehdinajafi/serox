import React, { createContext, ReactNode, useState } from "react"

interface ShowChatContextProps {
  showChat: boolean
  setShowChat: React.Dispatch<React.SetStateAction<boolean>>
}

export const ShowChatContext = createContext<ShowChatContextProps>({
  showChat: false,
  setShowChat: () => {},
})

interface ShowChatProviderProps {
  children: ReactNode
}

const ShowChatProvider: React.FC<ShowChatProviderProps> = ({ children }) => {
  const [showChat, setShowChat] = useState<boolean>(false)
  return (
    <ShowChatContext.Provider value={{ showChat, setShowChat }}>
      {children}
    </ShowChatContext.Provider>
  )
}

export default ShowChatProvider
