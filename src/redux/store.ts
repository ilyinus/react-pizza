import { configureStore } from '@reduxjs/toolkit'
import categories from './categories/slice'
import pizzas from './pizzas/slice'
import sorting from './sorting/slice'
import cart from './cart/slice'
import notifications from './notifications/slice'

export const store = configureStore({
  reducer: {
    categories,
    pizzas,
    sorting,
    cart,
    notifications
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
