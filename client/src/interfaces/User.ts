export interface UserI {
  email: string
  firstName: string
  lastName: string
  password: string
}

export interface CompleteUserI extends UserI {
  id: number
  createdAt: Date
}
