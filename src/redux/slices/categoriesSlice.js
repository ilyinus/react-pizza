import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categories: [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ],
  active: 0,
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setActive: (state, action) => {
      state.active = action.payload
    },
  },
})

export const { setActive } = categoriesSlice.actions
export default categoriesSlice.reducer
