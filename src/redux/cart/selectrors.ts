import { RootState } from '../store'

export const selectItemById = (id: number) => (state: RootState) =>
  state.cart.items['_' + id]
