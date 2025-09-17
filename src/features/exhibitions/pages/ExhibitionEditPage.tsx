import { useParams, useNavigate } from 'react-router'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { useProductsQuery } from '@/features/products/hooks/query/useProductsQuery'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { VISIBILITY } from '@/interface/common'
import { useDateTimeInput } from '../hooks/useDateTimeInput'
import ProductSelector from '../components/ExhibitionProductSeleter'
import { type FormValues, exhibitionSchema } from '../hooks/schema'
import ExhibitionDateTimeInput from '../components/ExhibitionDateTimeInput'
import { useExhibitionDetail } from '../hooks/useExhibitionDetail'
import { updateExhibition } from '../api/exhibitionApi'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { exhibitionKeys } from '@/lib/constants/queryKeys/exhibitions'

export default function ExhibitionEditPage() {
  const { exhibitionId } = useParams<{ exhibitionId: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: exhibition, isLoading, error } = useExhibitionDetail(Number(exhibitionId))
  const { data: products } = useProductsQuery(0, undefined, 1000)

  const [visible, setVisible] = useState(true)
  const [productIds, setProductIds] = useState<number[]>([])

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(exhibitionSchema),
    defaultValues: {
      visibility: visible ? VISIBILITY.VISIBLE : VISIBILITY.HIDDEN,
    },
  })

  const { date: startDate, time: startTime, setDate: setStartDate, setTime: setStartTime } = useDateTimeInput('startAt', setValue)
  const { date: endDate, time: endTime, setDate: setEndDate, setTime: setEndTime } = useDateTimeInput('endAt', setValue)

  const updateMutation = useMutation({
    mutationFn: (data: FormValues) =>
      updateExhibition(Number(exhibitionId), {
        ...data,
        description: data.description || '',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: exhibitionKeys.all })
      queryClient.invalidateQueries({ queryKey: exhibitionKeys.detail(Number(exhibitionId)) })
      navigate(`/exhibitions/${exhibitionId}`)
    },
  })

  // 전시회 데이터로 폼 초기화
  useEffect(() => {
    if (exhibition) {
      setValue('title', exhibition.title)
      setValue('description', exhibition.description)
      setValue('visibility', exhibition.visibility === 'VISIBLE' ? VISIBILITY.VISIBLE : VISIBILITY.HIDDEN)
      setVisible(exhibition.visibility === 'VISIBLE')

      const startDate = new Date(exhibition.startAt)
      const endDate = new Date(exhibition.endAt)

      setStartDate(startDate)
      setStartTime(startDate.toTimeString().slice(0, 5))
      setEndDate(endDate)
      setEndTime(endDate.toTimeString().slice(0, 5))

      const ids = exhibition.products.map((p) => p.product.productId)
      setProductIds(ids)
    }
  }, [exhibition, setValue, setStartDate, setStartTime, setEndDate, setEndTime])

  const handleSelectProduct = (id: number) => {
    if (!productIds.includes(id)) setProductIds((prev) => [...prev, id])
  }

  const handleRemoveProduct = (id: number) => {
    setProductIds((prev) => prev.filter((pid) => pid !== id))
  }

  // visible 상태가 변경될 때 setValue 호출
  useEffect(() => {
    setValue('visibility', visible ? VISIBILITY.VISIBLE : VISIBILITY.HIDDEN)
  }, [visible, setValue])

  const onSubmit = (data: FormValues) => {
    updateMutation.mutate(data)
  }

  // watch for visibility / productIds changes
  useEffect(() => {
    setValue('productIds', productIds, { shouldValidate: true })
  }, [productIds, setValue])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">로딩 중...</div>
      </div>
    )
  }

  if (error || !exhibition) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-500">전시회를 찾을 수 없습니다.</div>
      </div>
    )
  }

  return (
    <Card className="max-w-3xl mx-auto mt-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">✏️ 기획전 수정</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">기획전 제목</Label>
            <Input id="title" {...register('title' as const)} />
            <p className="text-destructive text-sm">{errors.title?.message}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">기획전 설명</Label>
            <Textarea id="description" {...register('description' as const)} />
          </div>

          <div className="flex items-center justify-between">
            <Label>노출 여부</Label>
            <Switch checked={visible} onCheckedChange={setVisible} />
          </div>

          <ExhibitionDateTimeInput label="시작일시" date={startDate} time={startTime} setDate={setStartDate} setTime={setStartTime} error={errors.startAt?.message} />

          <ExhibitionDateTimeInput label="종료일시" date={endDate} time={endTime} setDate={setEndDate} setTime={setEndTime} error={errors.endAt?.message} />

          <ProductSelector
            products={products?.content ?? []}
            selected={productIds}
            onSelect={handleSelectProduct}
            onRemove={handleRemoveProduct}
            onClear={() => setProductIds([])}
            error={errors.productIds?.message}
          />
        </CardContent>

        <CardFooter className="justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => navigate(`/exhibitions/${exhibitionId}`)}>
            취소
          </Button>
          <Button type="submit" className="w-32" disabled={updateMutation.isPending}>
            {updateMutation.isPending ? '수정 중...' : '기획전 수정'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
