import { Icon } from '@iconify/react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav className="universal-pagination" aria-label="Paginación de contenido">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-btn arrow-btn"
        aria-label="Página anterior"
      >
        <Icon icon="mdi:chevron-left" />
      </button>

      <div className="pagination-numbers">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`pagination-btn number-btn ${currentPage === page ? 'active' : ''}`}
            aria-label={`Ir a página ${page}`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-btn arrow-btn"
        aria-label="Página siguiente"
      >
        <Icon icon="mdi:chevron-right" />
      </button>
    </nav>
  )
}
