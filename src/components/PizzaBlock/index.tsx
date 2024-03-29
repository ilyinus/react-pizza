import React from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'

import { addToCart } from '../../redux/cart/slice'
import { selectItemById } from '../../redux/cart/selectrors'

type PizzaBlockProps = {
  id: number
  title: string
  price: number
  imageUrl: string
  types: number[]
  sizes: number[]
}

export const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  title,
  price,
  imageUrl,
  types,
  sizes
}) => {
  const item = useAppSelector(selectItemById(id))
  const dispatch = useAppDispatch()

  const allSizes = [26, 30, 40]
  const allTypes = ['тонкое', 'традиционное']

  const [size, setSize] = React.useState(sizes[0])
  const [type, setType] = React.useState(types[0])

  const addItem = () => {
    dispatch(
      addToCart({
        id,
        title,
        price,
        imageUrl,
        type: allTypes[type],
        size: size,
        typeIndex: type,
        sizeIndex: allSizes.indexOf(size),
        count: 1,
        amount: price
      })
    )
  }

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          <div
            className="active-type"
            style={{
              transform: `translateX(${100 * type}%)`
            }}
          ></div>
          {allTypes.map((value, index) => (
            <li
              key={index}
              onClick={() => setType(index)}
              className={!types.includes(index) ? 'disable' : ''}
            >
              {value}
            </li>
          ))}
        </ul>
        <ul>
          <div
            className="active-size"
            style={{
              transform: `translateX(${100 * allSizes.indexOf(size)}%)`
            }}
          ></div>
          {allSizes.map((value, index) => (
            <li
              key={index}
              onClick={() => setSize(value)}
              className={!sizes.includes(value) ? 'disable' : ''}
            >
              {value} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">{price} ₽</div>
        <div onClick={addItem} className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {!!item && <i>{item.count}</i>}
        </div>
      </div>
    </div>
  )
}
