import { instance } from '@/lib/api'

export async function aggregatePaymentStatistics(date: string): Promise<void> {
  await instance.post(`/admin/payment-statistics/aggregate?date=${date}`)
}

