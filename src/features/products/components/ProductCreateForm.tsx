import { useForm, Controller, useFieldArray, FormProvider } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import productMutation from '../hooks/mutation/product'
import type { FormValues } from '../interface'
import { CategorySelect } from './CategorySelect'

const visibilityOptions = [
  { value: 'VISIBLE', label: '노출' },
  { value: 'HIDDEN', label: '숨김' },
]

export default function ProductCreateForm() {
  const methods = useForm<FormValues>({
    defaultValues: {
      name: '',
      price: 0,
      quantity: 1,
      visibility: 'VISIBLE',
      colors: [{ value: '' }],
      categoryId: null,
    },
  })

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = methods

  const { createMutate } = productMutation()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'colors',
  })

  const onSubmit = (data: FormValues) => {
    const payload = {
      ...data,
      colors: data.colors.map((c) => c.value),
    }
    console.log('제출할 값:', payload)
    createMutate(payload)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label>상품명</Label>
          <Input {...register('name', { required: '상품명을 입력해주세요.' })} />
          {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <Label>가격</Label>
          <Input type="number" {...register('price', { min: 0 })} />
        </div>

        <div className="space-y-2">
          <Label>수량</Label>
          <Input type="number" {...register('quantity', { min: 1 })} />
        </div>

        <div className="space-y-2">
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
                  {visibilityOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <CategorySelect />

        <div className="space-y-2">
          <Label>색상</Label>
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 mb-2">
              <Input {...register(`colors.${index}.value` as const)} />
              {fields.length > 1 && (
                <Button type="button" variant="destructive" onClick={() => remove(index)} size="sm">
                  삭제
                </Button>
              )}
            </div>
          ))}
          <Button type="button" variant="outline" onClick={() => append({ value: '' })} size="sm">
            + 색상 추가
          </Button>
        </div>

        <Button type="submit">상품 등록</Button>
      </form>
    </FormProvider>
  )
}
