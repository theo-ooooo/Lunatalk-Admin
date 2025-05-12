interface Props {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function OrderPagination({ currentPage, totalPages, onPageChange }: Props) {
  return (
    <div className="flex justify-center gap-2 mt-4">
      {Array.from({ length: totalPages }).map((_, i) => (
        <button key={i} type="button" onClick={() => onPageChange(i)} className={`px-3 py-1 rounded ${i === currentPage ? 'bg-black text-white' : 'bg-gray-200'}`}>
          {i + 1}
        </button>
      ))}
    </div>
  )
}
