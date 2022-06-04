import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Categories from '../components/Categories'
import PizzaBlock from '../components/PizzaBlock'
import Sort from '../components/Sort'
import Loader from '../components/PizzaBlock/Loader'
import { fetchItems } from '../redux/slices/pizzasSlice'

function Home() {
  const { items, isLoading } = useSelector((state) => state.pizzas)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(fetchItems())
    // eslint-disable-next-line
  }, [])

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
