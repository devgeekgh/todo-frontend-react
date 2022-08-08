export type UserLoginPayload = {
  email: string
  password: string
}

export type UserRegisterPayload = {
  email: string
  password: string
  confirm_password?: string
}

export type User = {
  id: number
  role: string
  email: string
}

export type UserToken = {
  access_token: string
  token_type: string
}

export type Todo = {
  id: number
  title: string
  description: string
}
