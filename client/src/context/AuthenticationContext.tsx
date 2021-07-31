import { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import { CompleteUserI } from '../interfaces/User'
import { getUserDetails } from '../services/apiClient'

interface AuthenticationProviderI {
  user: CompleteUserI | null
  setAuth: Function
}

// this context will be used to validate the user each time a component is loaded and redirect to either the public or private routes

const AuthenticationContext = createContext<AuthenticationProviderI>({} as AuthenticationProviderI)

export const AuthenticationProvider: React.FC = ({ children }) => {
  // this will store our current user that was retrieved by the server on the use Effect hook if the token is valid
  const [user, setUser] = useState<CompleteUserI | null>(null)

  useEffect(() => {
    getUserDetails()
      .then((res) => {
        setUser(res.user)
      })
      .catch((err) => setUser(null))
  }, [])

  // this will be used to alter the context when we either login or register
  const setAuth = (currentUser: CompleteUserI) => {
    setUser(currentUser)
  }
  return (
    <AuthenticationContext.Provider value={{ user, setAuth }}>
      {children}
    </AuthenticationContext.Provider>
  )
}

export const Authenticate = () => {
  const context = useContext(AuthenticationContext)
  return context
}
