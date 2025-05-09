import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <Card className="w-[30rem]">
        <CardHeader>
          <CardTitle>로그인</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-2 pb-4">
          <Input placeholder="아이디를 입력하세요." />
          <Input placeholder="비밀번호를 입력하세요." type="password" />
        </CardContent>
        <CardFooter className="block">
          <Button className="w-full cursor-pointer">로그인</Button>
        </CardFooter>
      </Card>
    </main>
  )
}
