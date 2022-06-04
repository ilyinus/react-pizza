import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActive } from '../redux/slices/categoriesSlice'

function Categories() {
  const { categories, active } = useSelector((state) => state.categories)
  const dispatch = useDispatch()

  return (
    <div className="categories">
      <ul>
        {categories.map((value, index) => (
          <li
            key={index}
            onClick={() => dispatch(setActive(index))}
            className={index === active ? 'active' : ''}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories
