import React from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'

import { setActiveCategory } from '../redux/categories/slice'

export const Categories: React.FC = () => {
  const { categories, activeCategory } = useAppSelector(
    (state) => state.categories
  )
  const dispatch = useAppDispatch()

  return (
    <div className="categories">
      <ul>
        {categories.map((value, index) => (
          <li
            key={index}
            onClick={() => dispatch(setActiveCategory(index))}
            className={index === activeCategory ? 'active' : ''}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  )
}
