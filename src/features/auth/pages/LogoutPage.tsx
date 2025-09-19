import FullPageLoader from '@/components/feedback/FullPageLoader'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

export default function LogoutPage() {
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')

    navigate('/login', { replace: true })
  }, [])

  return <FullPageLoader />
}
