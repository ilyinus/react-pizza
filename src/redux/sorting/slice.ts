import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { SortingState } from './types'

const initialState: SortingState = {
  options: {
    raitng: { name: 'популярности' },
    price: { name: 'цене' },
    title: { name: 'алфавиту' }
  },
  sortingBy: 'raitng',
  orderBy: 'asc'
}

const sortingSlice = createSlice({
  name: 'sorting',
  initialState,
  reducers: {
    setSortingBy(state, action: PayloadAction<string>) {
      state.sortingBy = action.payload
    },
    setSortingOrder(state, action: PayloadAction<string>) {
      state.orderBy = action.payload
    }
  }
})

export const { setSortingBy, setSortingOrder } = sortingSlice.actions
export default sortingSlice.reducer
