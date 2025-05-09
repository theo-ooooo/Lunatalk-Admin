import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { useLoginForm } from '../hooks/useLogin'

export default function LoginPage() {
  const { register, handleSubmit, errors, loading, error } = useLoginForm()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <Card className="py-6">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">관리자 로그인</CardTitle>
            <CardDescription>관리자 계정으로 로그인 해주세요.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <Input {...register('username', { required: '아이디를 입력하세요.' })} placeholder="아이디" autoComplete="username" />
              {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>}
            </div>

            <div>
              <Input {...register('password', { required: '비밀번호를 입력하세요.' })} type="password" placeholder="비밀번호" autoComplete="current-password" />
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
            </div>

            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full cursor-pointer" disabled={loading}>
              {loading ? <Spinner className="text-white w-4 h-4" /> : '로그인'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
