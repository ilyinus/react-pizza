import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { RootState, AppDispatch } from '../store'
import { showNotification } from '../notifications/slice'
import { NotificationType } from '../notifications/types'
import { PizzasState, Item } from './types'

const initialState: PizzasState = {
  items: [],
  isLoading: true,
  filters: ''
}

export const fetchItems = createAsyncThunk<
  Item[],
  void,
  {
    dispatch: AppDispatch
    state: RootState
  }
>('pizzas/fetchItems', async (_, thunkApi) => {
  const filters = thunkApi.getState().pizzas.filters
  try {
    const response = await axios.get<Item[]>(
      'https://6292a273cd0c91932b74548a.mockapi.io/items?' + filters
    )
    return response.data
  } catch (e) {
    const message = axios.isAxiosError(e)
      ? JSON.stringify(e.toJSON())
      : 'Unknown error'
    thunkApi.dispatch(
      showNotification({
        type: NotificationType.ALERT,
        message: message
      })
    )
    return thunkApi.rejectWithValue([])
  }
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
      state.items = []
      state.isLoading = true
    })
  }
})

export const { setFilters } = pizzasSlice.actions
export default pizzasSlice.reducer
