import { instance } from '@/lib/api'
import type { Category } from '../interface'

export async function getCategories(): Promise<Category[]> {
  const { data } = await instance.get('/categories')
  return data.data
}

export async function deleteCategory(categoryId: number): Promise<void> {
  await instance.delete(`/categories/${categoryId}`)
}

export async function createCategory({ categoryName, visibility }: { categoryName: string; visibility: 'VISIBLE' | 'HIDDEN' }): Promise<void> {
  await instance.post('/categories/create', { name: categoryName, visibility })
}

export async function updateCategory({ categoryId, categoryName, visibility }: { categoryId: number; categoryName: string; visibility: 'VISIBLE' | 'HIDDEN' }) {
  await instance.put(`/categories/${categoryId}`, { name: categoryName, visibility })
}

export async function getCategory({ categoryId }: { categoryId: number }): Promise<Category> {
  const { data } = await instance.get(`/categories/${categoryId}`)

  return data.data
}
