import React from 'react'

export const Pagination: React.FC = ({ pag, handler }: any) => {
  if (pag.totalPages === 1 || pag.numberOfElements === 0) return null

  const block = Math.min(pag.totalPages, 5)
  const rest = pag.curPage % block
  const start = pag.curPage - (rest === 0 ? block - 1 : rest - 1)
  const end = start + block - 1
  const shift = start - Math.max(end - pag.totalPages, 0)

  return (
    <div className="pagination">
      <ul>
        <li className="arrow" onClick={() => handler('<')}>
          &lt;
        </li>
        {start > 1 && <li onClick={() => handler(1)}>1</li>}
        {start - 1 > 1 && <li className="gap">...</li>}
        {Array(block)
          .fill(0)
          .map((_, index) => {
            return (
              <li
                key={index}
                onClick={() => handler(shift + index)}
                className={shift + index === pag.curPage ? 'active' : ''}
              >
                {shift + index}
              </li>
            )
          })}
        {pag.totalPages - end > 1 && <li className="gap">...</li>}
        {pag.totalPages > end && (
          <li onClick={() => handler(pag.totalPages)}>{pag.totalPages}</li>
        )}
        <li className="arrow" onClick={() => handler('>')}>
          &gt;
        </li>
      </ul>
    </div>
  )
}
