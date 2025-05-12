interface Props {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function MemberPagination({ currentPage, totalPages, onPageChange }: Props) {
  return (
    <div className="flex justify-center mt-4 gap-2">
      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          key={i}
          type="button" // 중요!
          onClick={() => {
            console.log('clicked page:', i) // 디버깅용
            onPageChange(i)
          }}
          className={`px-3 py-1 rounded ${i === currentPage ? 'bg-black text-white' : 'bg-gray-200'}`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  )
}
