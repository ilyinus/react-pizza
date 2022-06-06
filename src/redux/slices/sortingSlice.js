import { createSlice } from '@reduxjs/toolkit'

const initialState = {
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
    setSortingBy(state, action) {
      state.sortingBy = action.payload
    },
    setSortingOrder(state, action) {
      state.orderBy = action.payload
    }
  }
})

export const { setSortingBy, setSortingOrder } = sortingSlice.actions
export default sortingSlice.reducer
