import { instance } from '@/lib/api'

export interface LoginRequest {
  username: string
  password: string
}

export async function login({ username, password }: LoginRequest) {
  const { data } = await instance.post('/auth/admin/login', { username, password })
  return data.data
}
