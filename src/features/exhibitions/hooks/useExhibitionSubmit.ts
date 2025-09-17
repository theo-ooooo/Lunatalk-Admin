import { toast } from 'sonner'
import type { FormValues } from './schema'
import { exhibitionMutation } from './mutation/exhibition'

export const useExhibitionSubmit = () => {
  const { createMutate } = exhibitionMutation()
  return async (data: FormValues) => {
    try {
      console.log('✅ 제출 데이터', data)
      createMutate({ ...data, description: data.description ?? '' })
      toast.success('기획전 등록 완료')
    } catch {
      toast.error('등록 실패')
    }
  }
}
