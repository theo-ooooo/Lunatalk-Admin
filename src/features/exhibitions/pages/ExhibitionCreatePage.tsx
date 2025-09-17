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
import { useExhibitionSubmit } from '../hooks/useExhibitionSubmit'
import ExhibitionDateTimeInput from '../components/ExhibitionDateTimeInput'

export default function ExhibitionCreatePage() {
  const [visible, setVisible] = useState(true)
  const [productIds, setProductIds] = useState<number[]>([])
  const { data: products } = useProductsQuery(0, undefined, 1000)

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

  const handleSelectProduct = (id: number) => {
    if (!productIds.includes(id)) setProductIds((prev) => [...prev, id])
  }
  const handleRemoveProduct = (id: number) => {
    setProductIds((prev) => prev.filter((pid) => pid !== id))
  }

  const onSubmit = useExhibitionSubmit()

  // watch for visibility / productIds changes
  useEffect(() => {
    setValue('productIds', productIds, { shouldValidate: true })
  }, [productIds])

  useEffect(() => {
    setValue('productIds', productIds, { shouldValidate: true })
  }, [productIds])

  return (
    <Card className="max-w-3xl mx-auto mt-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">🛒 기획전 등록</CardTitle>
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

        <CardFooter className="justify-end">
          <Button type="submit" className="w-32">
            기획전 등록
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
