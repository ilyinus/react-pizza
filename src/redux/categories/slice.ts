import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CategoriesState } from './types'

const initialState: CategoriesState = {
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
    setActiveCategory(state, action: PayloadAction<number>) {
      state.activeCategory = action.payload
    }
  }
})

export const { setActiveCategory } = categoriesSlice.actions
export default categoriesSlice.reducer
