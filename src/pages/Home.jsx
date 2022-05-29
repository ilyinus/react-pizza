import React from 'react'

import Categories from '../components/Categories'
import PizzaBlock from '../components/PizzaBlock'
import Sort from '../components/Sort'
import Loader from '../components/PizzaBlock/Loader'

function Home() {
  const [items, setItems] = React.useState([])
  const [isLoading, setLoading] = React.useState(true)

  React.useEffect(() => {
    fetch('https://6292a273cd0c91932b74548a.mockapi.io/items')
      .then((response) => {
        return response.json()
      })
      .then((items) => {
        setItems(items)
        setLoading(false)
      })
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
