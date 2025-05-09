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

//TODO: 토큰만료 로직
// instance.interceptors.response.use(
//   (res) => res,
//   (err) => err,
// )
