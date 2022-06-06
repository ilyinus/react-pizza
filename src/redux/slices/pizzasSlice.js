import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  items: [],
  isLoading: true,
  filters: ''
}

export const fetchItems = createAsyncThunk(
  'pizzas/fetchItems',
  async (_, thunkAPI) => {
    const filters = thunkAPI.getState().pizzas.filters
    const dispatch = thunkAPI.dispatch
    dispatch(pizzasSlice.actions.setLoading())
    const response = await axios.get(
      'https://6292a273cd0c91932b74548a.mockapi.io/items?' + filters
    )
    return response.data
  }
)

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setLoading(state) {
      state.isLoading = true
    },
    setFilters(state, action) {
      state.filters = action.payload
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.items = action.payload
      state.isLoading = false
    })
  }
})

export const { setFilters } = pizzasSlice.actions
export default pizzasSlice.reducer
