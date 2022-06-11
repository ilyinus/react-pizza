import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { RootState } from '../store'

interface Item {
  id: number
  imageUrl: string
  title: string
  types: number[]
  sizes: number[]
  price: number
  category: number
  rating: number
}

interface PizzasState {
  items: Item[]
  isLoading: boolean
  filters: string
}

const initialState: PizzasState = {
  items: [],
  isLoading: true,
  filters: ''
}

export const fetchItems = createAsyncThunk<
  Item[],
  void,
  {
    state: RootState
  }
>('pizzas/fetchItems', async (_, thunkAPI) => {
  const filters = thunkAPI.getState().pizzas.filters
  const response = await axios.get(
    'https://6292a273cd0c91932b74548a.mockapi.io/items?' + filters
  )
  return response.data
})

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = action.payload
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchItems.pending, (state) => {
      state.items = []
      state.isLoading = true
    })
    builder.addCase(
      fetchItems.fulfilled,
      (state, action: PayloadAction<Item[]>) => {
        state.items = action.payload
        state.isLoading = false
      }
    )
    builder.addCase(fetchItems.rejected, (state) => {
      state.isLoading = false
    })
  }
})

export const { setFilters } = pizzasSlice.actions
export default pizzasSlice.reducer
