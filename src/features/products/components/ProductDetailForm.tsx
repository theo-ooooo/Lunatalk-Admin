import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import type { FormValues, Product } from '../interface'
import productMutation from '../hooks/mutation/product'
import ProductDeleteButton from './ProductDeleteButton'

interface Props {
  product: Product
}

export default function ProductDetailForm({ product }: Props) {
  const { register, control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      visibility: product.visibility,
      colors: product.colors.map((c) => ({ value: c })),
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'colors',
  })

  const { updateMutate } = productMutation(product.productId)

  const onSubmit = (data: FormValues) => {
    updateMutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
      <div className="flex gap-3 justify-end sticky top-0 right-0">
        <Button type="submit">저장</Button>
        <ProductDeleteButton productId={product.productId} />
      </div>
      <div className="space-y-1">
        <Label htmlFor="name">상품명</Label>
        <Input id="name" {...register('name')} />
      </div>

      <div className="space-y-1">
        <Label htmlFor="price">가격</Label>
        <Input id="price" type="number" {...register('price')} />
      </div>

      <div className="space-y-1">
        <Label htmlFor="quantity">수량</Label>
        <Input id="quantity" type="number" {...register('quantity')} />
      </div>

      <div className="space-y-1">
        <Label>노출 여부</Label>
        <Controller
          control={control}
          name="visibility"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="VISIBLE">노출</SelectItem>
                <SelectItem value="HIDDEN">숨김</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="space-y-1">
        <Label>색상</Label>
        {fields.map((field, idx) => (
          <div key={field.id} className="flex gap-2 mb-2">
            <Input {...register(`colors.${idx}.value` as const)} />
            {fields.length > 1 && (
              <Button type="button" variant="destructive" onClick={() => remove(idx)} size="sm">
                삭제
              </Button>
            )}
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={() => append({ value: '' })}>
          + 색상 추가
        </Button>
      </div>
    </form>
  )
}
