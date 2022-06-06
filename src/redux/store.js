import { configureStore } from '@reduxjs/toolkit'
import categories from './slices/categoriesSlice'
import pizzas from './slices/pizzasSlice'
import sorting from './slices/sortingSlice'

export const store = configureStore({
  reducer: {
    categories,
    pizzas,
    sorting,
  },
})
