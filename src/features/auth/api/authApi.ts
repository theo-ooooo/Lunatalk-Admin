import { instance } from '@/lib/api'
import type { AuthLoginResponse } from '../interface/response'

export interface LoginRequest {
  username: string
  password: string
}

export async function login({ username, password }: LoginRequest): Promise<AuthLoginResponse> {
  const { data } = await instance.post('/auth/admin/login', { username, password })
  return data.data
}

export async function reissue({ refreshToken }: { refreshToken: string }): Promise<AuthLoginResponse> {
  const { data } = await instance.post('/auth/reissue', { refreshToken })
  return data.data
}
