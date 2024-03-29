import React from 'react'

import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { setSortingBy, setSortingOrder } from '../redux/sorting/slice'

export const Sort: React.FC = () => {
  const { options, sortingBy, orderBy } = useAppSelector(
    (state) => state.sorting
  )
  const dispatch = useAppDispatch()

  const [open, setOpen] = React.useState(false)
  const popupRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handler = (event: MouseEvent) => {
      const _event = event as MouseEvent & { path: HTMLDivElement[] }
      if (popupRef.current && !_event.path.includes(popupRef.current)) {
        setOpen(false)
      }
    }
    document.body.addEventListener('click', handler)

    return () => {
      document.body.removeEventListener('click', handler)
    }
  }, [])

  return (
    <div ref={popupRef} className="sort">
      <div className="sort__label">
        <svg
          onClick={() =>
            dispatch(setSortingOrder(orderBy === 'asc' ? 'desc' : 'asc'))
          }
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={orderBy}
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{options[sortingBy].name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {Object.keys(options).map((key, index) => (
              <li
                key={index}
                onClick={() => {
                  dispatch(setSortingBy(key))
                  setOpen(!open)
                }}
                className={sortingBy === key ? 'active' : ''}
              >
                {options[key].name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
