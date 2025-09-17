import * as z from 'zod'
import { VISIBILITY } from '@/interface/common'

export const exhibitionSchema = z
  .object({
    title: z.string().min(1, '기획전 이름을 입력해주세요.'),
    description: z.string().optional(),
    visibility: z.nativeEnum(VISIBILITY),
    productIds: z.array(z.number()).min(1, '상품을 1개 이상 선택해주세요.'),
    startAt: z.date(),
    endAt: z.date(),
  })
  .superRefine((data, ctx) => {
    if (data.endAt <= data.startAt) {
      ctx.addIssue({
        path: ['endAt'],
        code: z.ZodIssueCode.custom,
        message: '종료일은 시작일 이후여야 합니다.',
      })
    }
  })

export type FormValues = z.infer<typeof exhibitionSchema>
