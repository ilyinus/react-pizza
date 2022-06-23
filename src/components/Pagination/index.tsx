import React from 'react'

import styles from './Pagination.module.scss'

type PaginationProps = {
  totalPages: number
  curPage: number
  handler: (page: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  curPage,
  handler
}) => {
  if (totalPages === 1) return null

  const block = Math.min(totalPages, 3)
  const rest = curPage % block
  const start = curPage - (rest === 0 ? block - 1 : rest - 1)
  const end = start + block - 1
  const shift = start - Math.max(end - totalPages, 0)

  return (
    <div className={styles.pagination}>
      <ul>
        <li
          className={styles.arrow}
          onClick={() => handler(Math.max(1, curPage - 1))}
        >
          &lt;
        </li>
        {start > 1 && <li onClick={() => handler(1)}>1</li>}
        {start - 1 > 1 && <li className={styles.gap}>...</li>}
        {Array(block)
          .fill(0)
          .map((_, index) => {
            return (
              <li
                key={index}
                onClick={() => handler(shift + index)}
                className={shift + index === curPage ? styles.active : ''}
              >
                {shift + index}
              </li>
            )
          })}
        {totalPages - end > 1 && <li className={styles.gap}>...</li>}
        {totalPages > end && (
          <li onClick={() => handler(totalPages)}>{totalPages}</li>
        )}
        <li
          className={styles.arrow}
          onClick={() => handler(Math.min(curPage + 1, totalPages))}
        >
          &gt;
        </li>
      </ul>
    </div>
  )
}
