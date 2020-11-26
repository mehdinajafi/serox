import * as React from "react"

type LoadingContextType = {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const LoadingContext = React.createContext<LoadingContextType>({
  loading: false,
  setLoading: () => {},
})

type LoadingProviderProps = {
  children: React.ReactNode
}

const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [loading, setLoading] = React.useState<boolean>(false)
  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  )
}

export default LoadingProvider
