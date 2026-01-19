import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import type { InquiryListParams } from '../interface'

interface Props {
  onSearch: (filters: InquiryListParams) => void
}

export default function InquiryFilterForm({ onSearch }: Props) {
  const [form, setForm] = useState<Partial<InquiryListParams>>({
    type: undefined,
    status: undefined,
    memberUsername: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch({
      ...form,
      page: 0,
      size: 10,
    } as InquiryListParams)
  }

  const handleReset = () => {
    setForm({
      type: undefined,
      status: undefined,
      memberUsername: '',
    })
    onSearch({
      page: 0,
      size: 10,
    })
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border shadow-sm p-6 mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">회원 아이디</label>
            <Input className="bg-white dark:bg-gray-800" name="memberUsername" placeholder="회원 아이디로 검색" value={form.memberUsername || ''} onChange={handleChange} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">문의 타입</label>
            <Select value={form.type || undefined} onValueChange={(val) => setForm({ ...form, type: val as any })}>
              <SelectTrigger className="bg-white dark:bg-gray-800">
                <SelectValue placeholder="전체" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PRODUCT">상품 문의</SelectItem>
                <SelectItem value="ORDER">주문 문의</SelectItem>
                <SelectItem value="GENERAL">일반 문의</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">처리 상태</label>
            <Select value={form.status || undefined} onValueChange={(val) => setForm({ ...form, status: val as any })}>
              <SelectTrigger className="bg-white dark:bg-gray-800">
                <SelectValue placeholder="전체" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENDING">대기중</SelectItem>
                <SelectItem value="ANSWERED">답변완료</SelectItem>
                <SelectItem value="CLOSED">종료</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end gap-2">
            <Button type="button" variant="outline" onClick={handleReset} className="flex-1">
              초기화
            </Button>
            <Button type="submit" className="flex-1">
              검색
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
