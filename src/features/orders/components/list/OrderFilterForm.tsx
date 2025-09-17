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
    <form onSubmit={handleSubmit} className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
      <Input className="bg-white" name="orderNumber" placeholder="주문번호" value={form.orderNumber} onChange={handleChange} />
      <Input className="bg-white" name="nickname" placeholder="닉네임" value={form.nickname} onChange={handleChange} />
      <Input className="bg-white" name="email" placeholder="이메일" value={form.email} onChange={handleChange} />
      <Input className="bg-white" name="phone" placeholder="전화번호" value={form.phone} onChange={handleChange} />
      <Input className="bg-white" name="username" placeholder="아이디" value={form.username} onChange={handleChange} />

      <Select value={form.status} onValueChange={(val) => setForm({ ...form, status: val })}>
        <SelectTrigger className="bg-white">
          <SelectValue placeholder="주문 상태 선택" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="ORDERED">주문완료</SelectItem>
          <SelectItem value="PAYMENT_FAILED">결제실패</SelectItem>
          <SelectItem value="CANCELLED">결제취소</SelectItem>
          <SelectItem value="SHIPPED">배송중</SelectItem>
          <SelectItem value="DELIVERED">배송완료</SelectItem>
        </SelectContent>
      </Select>

      {/* <Popover> */}
      {/* <PopoverTrigger asChild>
          <Button variant="outline" className="bg-white text-left font-normal col-span-2">
            {dateRange.from && dateRange.to ? `${format(dateRange.from, 'yyyy-MM-dd')} ~ ${format(dateRange.to, 'yyyy-MM-dd')}` : '주문일 범위 선택'}
          </Button>
        </PopoverTrigger> */}
      {/* <PopoverContent align="start" className="w-auto p-0">
          <Calendar mode="range" selected={dateRange} onSelect={handleDateRangeChange} numberOfMonths={2} />
        </PopoverContent> */}
      {/* </Popover> */}

      <div className="col-span-2 md:col-span-3 flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={handleReset}>
          초기화
        </Button>
        <Button type="submit">검색</Button>
      </div>
    </form>
  )
}
