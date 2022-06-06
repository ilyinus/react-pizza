import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import qs from 'qs'

import Categories from '../components/Categories'
import PizzaBlock from '../components/PizzaBlock'
import Sort from '../components/Sort'
import Loader from '../components/PizzaBlock/Loader'
import { fetchItems, setFilters } from '../redux/slices/pizzasSlice'
import { setActiveCategory } from '../redux/slices/categoriesSlice'
import { setSortingBy, setSortingOrder } from '../redux/slices/sortingSlice'

function Home() {
  const { items, isLoading } = useSelector((state) => state.pizzas)
  const activeCategory = useSelector((state) => state.categories.activeCategory)
  const { sortingBy, orderBy } = useSelector((state) => state.sorting)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isRendered = useRef(false)

  console.log('Рендер', isLoading)

  React.useEffect(() => {
    console.log('Первый эффект')
    const search = window.location.search.substring(1)
    const filters = qs.parse(search)

    if (Object.keys(filters).includes('category') && filters.category !== '') {
      dispatch(setActiveCategory(parseInt(filters.category)))
    }

    if (Object.keys(filters).includes('sortBy') && filters.sortBy !== '') {
      dispatch(setSortingBy(filters.sortBy))
    }

    if (Object.keys(filters).includes('order') && filters.order !== '') {
      dispatch(setSortingOrder(filters.order))
    }

    dispatch(setFilters(search))
    dispatch(fetchItems())

    isRendered.current = true
  }, [])

  React.useEffect(() => {
    if (!isRendered.current) return

    console.log('Основной эффект')

    const filters = qs.stringify({
      category: activeCategory === 0 ? '' : activeCategory,
      sortBy: sortingBy,
      order: orderBy
    })

    //navigate('?' + filters)
    dispatch(setFilters(filters))
    dispatch(fetchItems())
    // eslint-disable-next-line
  }, [activeCategory, sortingBy, orderBy])

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? Array(8)
              .fill()
              .map((_, index) => <Loader key={index} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  )
}

export default Home
