export interface Usuario {
  id: string
  username: string
  fullName: string
  role: 'admin' | 'user'
  picture: string
  password?: string
}
