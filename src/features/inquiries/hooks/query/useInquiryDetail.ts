import { useQuery } from '@tanstack/react-query'
import { getInquiryDetail } from '../../api/inquiryApi'
import { inquiriesKey } from '@/lib/constants/queryKeys/inquiries'

export function useInquiryDetail(inquiryId: number) {
  return useQuery({
    queryKey: inquiriesKey.detail(inquiryId),
    queryFn: () => getInquiryDetail(inquiryId),
  })
}
