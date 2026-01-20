import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronDown, Filter } from 'lucide-react'

import type { OrderFilterParams } from '../../interface'

interface Props {
  onSearch: (filters: OrderFilterParams) => void
}

export default function OrderFilterForm({ onSearch }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [form, setForm] = useState<OrderFilterParams>({
    orderNumber: '',
    status: '',
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
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="bg-white dark:bg-gray-900 rounded-lg border shadow-sm mb-4 sm:mb-6">
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-between p-4 sm:p-6 hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">필터 검색</span>
          </div>
          <ChevronDown className={`w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <form onSubmit={handleSubmit} className="space-y-4 px-4 pb-4 sm:px-6 sm:pb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">주문번호</label>
              <Input
                className="bg-white dark:bg-gray-800 text-sm"
                name="orderNumber"
                placeholder="주문번호 검색"
                value={form.orderNumber}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">이메일</label>
              <Input
                className="bg-white dark:bg-gray-800 text-sm"
                name="email"
                placeholder="이메일 검색"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">전화번호</label>
              <Input
                className="bg-white dark:bg-gray-800 text-sm"
                name="phone"
                placeholder="전화번호 검색"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">아이디</label>
              <Input
                className="bg-white dark:bg-gray-800 text-sm"
                name="username"
                placeholder="아이디 검색"
                value={form.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">주문 상태</label>
              <Select value={form.status} onValueChange={(val) => setForm({ ...form, status: val })}>
                <SelectTrigger className="bg-white dark:bg-gray-800 text-sm">
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
          <div className="flex flex-col sm:flex-row justify-end gap-2 pt-2 border-t">
            <Button type="button" variant="outline" onClick={handleReset} className="w-full sm:w-auto text-sm">
              초기화
            </Button>
            <Button type="submit" className="w-full sm:w-auto text-sm">검색</Button>
          </div>
        </form>
      </CollapsibleContent>
    </Collapsible>
  )
}
