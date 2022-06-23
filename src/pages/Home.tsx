import React from 'react'
import { useNavigate } from 'react-router-dom'
import qs from 'qs'

import { Categories, PizzaBlock, Sort, Pagination } from '../components'
import Loader from '../components/PizzaBlock/Loader'
import {
  fetchItems,
  setCurPage,
  setLimit,
  setRefetch
} from '../redux/pizzas/slice'
import { setActiveCategory } from '../redux/categories/slice'
import { setSortingBy, setSortingOrder } from '../redux/sorting/slice'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { selectItems } from '../redux/pizzas/selectors'

type ParamsType = {
  category: string
  sortBy: string
  order: string
  page: string
  limit: string
}

const Home: React.FC = () => {
  const { items, isLoading, curPage, totalPages, limit, refetch } =
    useAppSelector(selectItems())
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

    if (Object.keys(params).includes('page') && params.page !== '') {
      dispatch(setCurPage(parseInt(params.page)))
    }

    if (Object.keys(params).includes('limit') && params.limit !== '') {
      dispatch(setLimit(parseInt(params.limit)))
    }

    dispatch(setRefetch())
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
      page: curPage,
      limit: limit
    })
    navigate('?' + filters)
    dispatch(fetchItems(filters))
    // eslint-disable-next-line
  }, [activeCategory, sortingBy, orderBy, curPage, limit, refetch])

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
      <Pagination
        totalPages={totalPages}
        curPage={curPage}
        handler={(page) => dispatch(setCurPage(page))}
      />
    </div>
  )
}

export default Home
