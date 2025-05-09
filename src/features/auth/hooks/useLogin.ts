import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router'
import { login } from '../api/authApi'
import { useState } from 'react'

export function useLoginForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (data: any) => {
    setLoading(true)
    setError(null)
    try {
      const res = await login(data)
      localStorage.setItem('accessToken', res.accessToken)
      localStorage.setItem('refreshToken', res.refreshToken)
      navigate(from, { replace: true })
    } catch (err: any) {
      console.log(err)
      setError(err.response?.data?.data.message || '서버에 에러가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    loading,
    error,
  }
}
