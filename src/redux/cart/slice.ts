import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Item, CartState } from './types'
import { getItem } from '../../utils/localStorage'

const initialState =
  getItem<CartState>('cart') ||
  ({
    items: {},
    count: 0,
    amount: 0
  } as CartState)

const getKey = (action: PayloadAction<Item>) => {
  return (
    action.payload.id +
    '_' +
    action.payload.typeIndex +
    '_' +
    action.payload.sizeIndex
  )
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Item>) {
      const id = '_' + action.payload.id
      const key = getKey(action)

      if (!Object.keys(state.items).includes(id)) {
        state.items[id] = {
          details: {},
          count: 0,
          amount: 0
        }
      }

      if (Object.keys(state.items[id].details).includes(key)) {
        state.items[id].details[key].count += action.payload.count
        state.items[id].details[key].amount += action.payload.amount
      } else {
        state.items[id].details[key] = action.payload
      }

      state.items[id].count += action.payload.count
      state.items[id].amount += action.payload.amount

      state.count += action.payload.count
      state.amount += action.payload.count * action.payload.price
    },
    removeFromCart(state, action: PayloadAction<Item>) {
      const id = '_' + action.payload.id
      const key = getKey(action)

      state.items[id].count -= state.items[id].details[key].count
      state.items[id].amount -= state.items[id].details[key].amount

      state.count -= state.items[id].details[key].count
      state.amount -= state.items[id].details[key].amount

      delete state.items[id].details[key]

      if (state.items[id].count === 0) {
        delete state.items[id]
      }
    },
    increaseCount(state, action: PayloadAction<Item>) {
      const id = '_' + action.payload.id
      const key = getKey(action)

      state.items[id].count++
      state.items[id].amount += action.payload.price

      state.items[id].details[key].count++
      state.items[id].details[key].amount += action.payload.price

      state.count++
      state.amount += action.payload.price
    },
    decreaseCount(state, action: PayloadAction<Item>) {
      const id = '_' + action.payload.id
      const key = getKey(action)

      if (state.items[id].details[key].count === 1) {
        return
      }

      state.items[id].count--
      state.items[id].amount -= action.payload.price

      state.items[id].details[key].count--
      state.items[id].details[key].amount -= action.payload.price

      state.count--
      state.amount -= action.payload.price
    },
    clearCart(state) {
      state.items = {}
      state.count = 0
      state.amount = 0
    }
  }
})

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseCount,
  decreaseCount
} = cartSlice.actions
export default cartSlice.reducer
