import { ReactNode, useState, useEffect } from 'react'

import { AuthContext } from '.'
import {
  getProfile,
  removeAuthorizationHeader,
  setAuthorizationHeader,
} from '../../services/api'
import { UserToken } from '../../types'
import { getAuthToken, removeAuthToken, setAuthToken } from '../../utils'

type User = {
  id: number
  email: string
  role: string
}

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined)
  const handleTokenVerify = () => {
    const localStorageToken = getAuthToken()

    if (localStorageToken) {
      setAuthorizationHeader(localStorageToken)
      getProfile()
        .then(({ data: user }) => {
          setUser(user)
        })
        .catch((error) => {
          removeAuthToken()
          removeAuthorizationHeader()
          console.log(error)
        })
    }
  }
  const setLocalStorageToken = (authToken: UserToken) => {
    setAuthToken(authToken)
    handleTokenVerify()
  }
  const removeLocalStorageToken = () => {
    removeAuthToken()
    setUser(undefined)
  }

  useEffect(() => {
    handleTokenVerify()
  }, [])

  return (
    <div>
      <AuthContext.Provider
        value={{ user, setUser, setLocalStorageToken, removeLocalStorageToken }}
      >
        {children}
      </AuthContext.Provider>
    </div>
  )
}
