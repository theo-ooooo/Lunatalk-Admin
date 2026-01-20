export default function DashboardHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">대시보드</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">Lunatalk 관리자 대시보드에 오신 것을 환영합니다</p>
      </div>
    </div>
  )
}

