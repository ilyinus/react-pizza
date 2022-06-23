import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { RootState, AppDispatch } from '../store'
import { showNotification } from '../notifications/slice'
import { NotificationType } from '../notifications/types'
import { PizzasState, Item } from './types'

const SRV = process.env.REACT_APP_SRV

const initialState: PizzasState = {
  items: [],
  isLoading: true,
  pagination: {
    curPage: 1,
    totalPages: 1,
    limit: 8
  },
  refetch: false
}

export const fetchItems = createAsyncThunk<
  Item[],
  string,
  {
    dispatch: AppDispatch
    state: RootState
  }
>('pizzas/fetchItems', async (filters, thunkApi) => {
  try {
    const response = await axios.get<Item[]>(SRV + 'items?' + filters, {
      timeout: 3000
    })
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
    setCurPage(state, action: PayloadAction<number>) {
      state.pagination.curPage = action.payload
    },
    setLimit(state, action: PayloadAction<number>) {
      state.pagination.limit = action.payload
    },
    setRefetch(state) {
      state.refetch = !state.refetch
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
        // TODO: Костыль, так-как mockapi не возвращает количество страниц
        state.pagination.totalPages = Math.ceil(10 / state.pagination.limit)
      }
    )
    builder.addCase(fetchItems.rejected, (state) => {
      state.items = []
      state.isLoading = true
    })
  }
})

export const { setCurPage, setLimit, setRefetch } = pizzasSlice.actions
export default pizzasSlice.reducer
