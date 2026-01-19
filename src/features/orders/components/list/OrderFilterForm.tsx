import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'

import type { OrderFilterParams } from '../../interface'

interface Props {
  onSearch: (filters: OrderFilterParams) => void
}

export default function OrderFilterForm({ onSearch }: Props) {
  const [form, setForm] = useState<OrderFilterParams>({
    orderNumber: '',
    status: '',
    nickname: '',
    email: '',
    phone: '',
    username: '',
    // fromDate: '',
    // toDate: '',
  })

  // const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
  //   from: undefined,
  //   to: undefined,
  // })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(form)
  }

  const handleReset = () => {
    setForm({
      orderNumber: '',
      status: '',
      nickname: '',
      email: '',
      phone: '',
      username: '',
      // fromDate: '',
      // toDate: '',
    })
    // setDateRange({ from: undefined, to: undefined })
    onSearch({})
  }

  // const handleDateRangeChange = (range: { from?: Date; to?: Date }) => {
  //   setDateRange(range)
  //   setForm({
  //     ...form,
  //     fromDate: range.from ? format(range.from, 'yyyy-MM-dd') : '',
  //     toDate: range.to ? format(range.to, 'yyyy-MM-dd') : '',
  //   })
  // }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border shadow-sm p-6 mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">주문번호</label>
            <Input
              className="bg-white dark:bg-gray-800"
              name="orderNumber"
              placeholder="주문번호 검색"
              value={form.orderNumber}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">닉네임</label>
            <Input
              className="bg-white dark:bg-gray-800"
              name="nickname"
              placeholder="닉네임 검색"
              value={form.nickname}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">이메일</label>
            <Input
              className="bg-white dark:bg-gray-800"
              name="email"
              placeholder="이메일 검색"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">전화번호</label>
            <Input
              className="bg-white dark:bg-gray-800"
              name="phone"
              placeholder="전화번호 검색"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">아이디</label>
            <Input
              className="bg-white dark:bg-gray-800"
              name="username"
              placeholder="아이디 검색"
              value={form.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">주문 상태</label>
            <Select value={form.status} onValueChange={(val) => setForm({ ...form, status: val })}>
              <SelectTrigger className="bg-white dark:bg-gray-800">
                <SelectValue placeholder="전체" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ORDERED">주문완료</SelectItem>
                <SelectItem value="PAYMENT_FAILED">결제실패</SelectItem>
                <SelectItem value="CANCELLED">결제취소</SelectItem>
                <SelectItem value="SHIPPED">배송중</SelectItem>
                <SelectItem value="DELIVERED">배송완료</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-2 border-t">
          <Button type="button" variant="outline" onClick={handleReset}>
            초기화
          </Button>
          <Button type="submit">검색</Button>
        </div>
      </form>
    </div>
  )
}
