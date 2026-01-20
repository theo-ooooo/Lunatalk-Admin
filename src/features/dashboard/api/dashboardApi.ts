import { instance } from '@/lib/api'
import type { DashboardResponse } from '../interface'

export async function getDashboard(): Promise<DashboardResponse> {
  const { data } = await instance.get('/admin/dashboard')
  return data.data
}

