import { RootState } from '../store'

export const selectItems = () => (state: RootState) => {
  return {
    items: state.pizzas.items,
    isLoading: state.pizzas.isLoading,
    curPage: state.pizzas.pagination.curPage,
    totalPages: state.pizzas.pagination.totalPages,
    limit: state.pizzas.pagination.limit,
    refetch: state.pizzas.refetch
  }
}
