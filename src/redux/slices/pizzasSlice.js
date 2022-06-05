import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  items: [],
  isLoading: true,
}

export const fetchItems = createAsyncThunk(
  'pizzas/fetchItems',
  async (_, thunkAPI) => {
    const categories = thunkAPI.getState().categories
    const dispatch = thunkAPI.dispatch
    const params =
      categories.active === 0 ? '' : '?category=' + categories.active
    dispatch(pizzasSlice.actions.setLoading())
    const response = await axios.get(
      'https://6292a273cd0c91932b74548a.mockapi.io/items' + params
    )
    return response.data
  }
)

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.items = action.payload
      state.isLoading = false
    })
  },
})

export default pizzasSlice.reducer
