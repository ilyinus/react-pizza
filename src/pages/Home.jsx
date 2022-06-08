import React from 'react'
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
  const { items, isLoading, filters } = useSelector((state) => state.pizzas)
  const { categories, activeCategory } = useSelector(
    (state) => state.categories
  )
  const { sortingBy, orderBy } = useSelector((state) => state.sorting)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isRendered = React.useRef(false)

  React.useEffect(() => {
    const search = window.location.search.substring(1)
    const params = qs.parse(search)

    if (Object.keys(params).includes('category') && params.category !== '') {
      dispatch(setActiveCategory(parseInt(params.category)))
    }

    if (Object.keys(params).includes('sortBy') && params.sortBy !== '') {
      dispatch(setSortingBy(params.sortBy))
    }

    if (Object.keys(params).includes('order') && params.order !== '') {
      dispatch(setSortingOrder(params.order))
    }

    if (filters.length !== 0) navigate('?' + filters)
    if (search.length !== 0) dispatch(setFilters(search))
    dispatch(fetchItems())
    // eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    if (!isRendered.current) {
      isRendered.current = true
      return
    }

    const filters = qs.stringify({
      category: activeCategory === 0 ? '' : activeCategory,
      sortBy: sortingBy,
      order: orderBy,
    })

    navigate('?' + filters)
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
      <h2 className="content__title">{`${categories[activeCategory]} пиццы`}</h2>
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
