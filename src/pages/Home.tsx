import React from 'react'
import { useNavigate } from 'react-router-dom'
import qs from 'qs'

import { Categories, PizzaBlock, Sort } from '../components'
import Loader from '../components/PizzaBlock/Loader'
import { fetchItems, setFilters } from '../redux/pizzas/slice'
import { setActiveCategory } from '../redux/categories/slice'
import { setSortingBy, setSortingOrder } from '../redux/sorting/slice'
import { useAppDispatch, useAppSelector } from '../redux/hooks'

type ParamsType = {
  category: string
  sortBy: string
  order: string
}

const Home: React.FC = () => {
  const { items, isLoading, filters } = useAppSelector((state) => state.pizzas)
  const { categories, activeCategory } = useAppSelector(
    (state) => state.categories
  )
  const { sortingBy, orderBy } = useAppSelector((state) => state.sorting)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const isRendered = React.useRef(false)

  React.useEffect(() => {
    const search = window.location.search.substring(1)
    const params = qs.parse(search) as qs.ParsedQs as ParamsType

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
      order: orderBy
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
              .fill(undefined)
              .map((_, index) => <Loader key={index} />)
          : items.map((item) => <PizzaBlock key={item.id} {...item} />)}
      </div>
    </div>
  )
}

export default Home
