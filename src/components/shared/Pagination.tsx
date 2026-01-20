import { Button } from '@/components/ui/button'

interface Props {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  const generatePageNumbers = () => {
    const pages = []

    const start = Math.max(0, currentPage - 2)
    const end = Math.min(totalPages - 1, currentPage + 2)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    return pages
  }

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 mt-4 flex-wrap">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 0}
        className="text-xs sm:text-sm"
      >
        이전
      </Button>

      {generatePageNumbers().map((pageNum) => (
        <Button 
          key={pageNum} 
          variant={pageNum === currentPage ? 'default' : 'outline'} 
          size="sm" 
          onClick={() => onPageChange(pageNum)}
          className="min-w-[32px] sm:min-w-[36px] text-xs sm:text-sm"
        >
          {pageNum + 1}
        </Button>
      ))}

      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage >= totalPages - 1}
        className="text-xs sm:text-sm"
      >
        다음
      </Button>
    </div>
  )
}
