import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setActiveCategory } from '../redux/slices/categoriesSlice'

function Categories() {
  const { categories, activeCategory } = useSelector(
    (state) => state.categories
  )
  const dispatch = useDispatch()

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

export default Categories
