import { instance } from '@/lib/api'
import type { CreateExhibitionRequest, Exhibition } from '../interface'

export async function getExhibitions(): Promise<Exhibition[]> {
  const { data } = await instance.get('/exhibitions')
  return data.data
}

export async function deleteExhibition({ exhibitionId }: { exhibitionId: number }): Promise<void> {
  await instance.delete(`/exhibitions/${exhibitionId}`)
}

export async function createExhibition(request: CreateExhibitionRequest): Promise<void> {
  await instance.post('/exhibitions', request)
}
