import { createContext, Dispatch, SetStateAction } from 'react'

import { UserToken } from '../../types'

export type User = {
  id: number
  email: string
  role: string
}

export interface AuthContextInterface {
  user: User | undefined
  setUser: Dispatch<SetStateAction<User | undefined>>
  setLocalStorageToken: (authToken: UserToken) => void
  removeLocalStorageToken: () => void
}

export const AuthContext = createContext<AuthContextInterface | undefined>(
  undefined
)
