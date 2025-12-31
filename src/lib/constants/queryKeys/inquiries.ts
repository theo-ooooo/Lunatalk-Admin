export const inquiriesKey = {
  all: (params?: { type?: string; status?: string; memberUsername?: string; page: number }) => ['inquiries', params],
  detail: (inquiryId: number) => ['inquiry', inquiryId],
}
