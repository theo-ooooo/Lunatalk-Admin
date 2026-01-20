export interface DailyOrderCount {
  date: string
  orderCount: number
}

export interface DashboardResponse {
  productCount: number
  memberCount: number
  todayOrderCount: number
  activeExhibitionCount: number
  categoryCount: number
  todaySales: number
  dailyOrderCounts: DailyOrderCount[]
}

