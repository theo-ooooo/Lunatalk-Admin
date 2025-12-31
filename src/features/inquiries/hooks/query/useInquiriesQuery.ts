import { useQuery } from '@tanstack/react-query'
import { getInquiries } from '../../api/inquiryApi'
import { inquiriesKey } from '@/lib/constants/queryKeys/inquiries'
import type { InquiryListParams } from '../../interface'

export function useInquiriesQuery(params: InquiryListParams) {
  return useQuery({
    queryKey: inquiriesKey.all(params),
    queryFn: () => getInquiries(params),
  })
}
