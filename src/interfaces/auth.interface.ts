export interface AuthUser {
  id: string
  username: string
  fullName: string
  role: 'admin' | 'user'
  picture: string
}

export interface AuthResponse {
  accessToken: string
  user: AuthUser
}
