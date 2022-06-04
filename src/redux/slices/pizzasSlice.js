import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  isLoading: true,
}

export const fetchItems = createAsyncThunk('pizzas/fetchItems', async () => {
  pizzasSlice.actions.setLoading()
  const response = await fetch(
    'https://6292a273cd0c91932b74548a.mockapi.io/items'
  )
  return await response.json()
})

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
