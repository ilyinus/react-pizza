import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categories: [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые'
  ],
  activeCategory: 0
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setActiveCategory(state, action) {
      state.activeCategory = action.payload
    }
  }
})

export const { setActiveCategory } = categoriesSlice.actions
export default categoriesSlice.reducer
