export interface SortingState {
  options: {
    [key: string]: { name: string }
  }
  sortingBy: string
  orderBy: string
}
