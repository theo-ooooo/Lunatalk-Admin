import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronDown, Filter } from 'lucide-react'
import type { InquiryListParams } from '../interface'

interface Props {
  onSearch: (filters: InquiryListParams) => void
}

export default function InquiryFilterForm({ onSearch }: Props) {
  const [isOpen, setIsOpen] = useState(false)
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
            <div className="sm:col-span-2">
              <label className="block text-xs sm:text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">회원 아이디</label>
              <Input className="bg-white dark:bg-gray-800 text-sm" name="memberUsername" placeholder="회원 아이디로 검색" value={form.memberUsername || ''} onChange={handleChange} />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">문의 타입</label>
              <Select value={form.type || undefined} onValueChange={(val) => setForm({ ...form, type: val as any })}>
                <SelectTrigger className="bg-white dark:bg-gray-800 text-sm">
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
              <label className="block text-xs sm:text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">처리 상태</label>
              <Select value={form.status || undefined} onValueChange={(val) => setForm({ ...form, status: val as any })}>
                <SelectTrigger className="bg-white dark:bg-gray-800 text-sm">
                  <SelectValue placeholder="전체" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">대기중</SelectItem>
                  <SelectItem value="ANSWERED">답변완료</SelectItem>
                  <SelectItem value="CLOSED">종료</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-2">
              <Button type="button" variant="outline" onClick={handleReset} className="flex-1 text-sm">
                초기화
              </Button>
              <Button type="submit" className="flex-1 text-sm">
                검색
              </Button>
            </div>
          </div>
        </form>
      </CollapsibleContent>
    </Collapsible>
  )
}
