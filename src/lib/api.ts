import { reissue } from '@/features/auth/api/authApi'
import axios from 'axios'

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) config.headers.Authorization = `Bearer ${token}`

  return config
})

let isRefreshing = false
let failedQueue: any[] = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })

  failedQueue = []
}

//TODO: 토큰만료 로직
instance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config
    const status = err?.response.status
    const errorName = err?.response.data?.data?.errorName
    const refreshToken = localStorage.getItem('refreshToken')

    if (refreshToken && status === 401 && errorName === 'AUTH_TOKEN_EXPIRED' && !originalRequest._retry) {
      if (isRefreshing) {
        // 다른 요청에서 refresh 중이면 대기
        return new Promise(function (resolve, reject) {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = 'Bearer ' + token
              resolve(instance(originalRequest))
            },
            reject: (err: any) => {
              reject(err)
            },
          })
        })
      }
      originalRequest._retry = true
      isRefreshing = true

      try {
        // 요청전 만료된 토큰 지운다.
        localStorage.removeItem('accessToken')
        const tokens = await reissue({ refreshToken })

        const newAccessToken = tokens.accessToken
        const newRefreshToken = tokens.refreshToken
        localStorage.setItem('accessToken', newAccessToken)
        localStorage.setItem('refreshToken', newRefreshToken)
        instance.defaults.headers.Authorization = `Bearer ${newAccessToken}`
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

        processQueue(null, newAccessToken)

        return instance(originalRequest) // 실패한 원래 요청 재시도
      } catch (err) {
        processQueue(err, null)
        // 여기서 로그아웃 처리 가능
        window.location.href = '/logout'
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }
    return Promise.reject(err)
  },
)
