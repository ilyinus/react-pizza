export interface Item {
  id: number
  imageUrl: string
  title: string
  types: number[]
  sizes: number[]
  price: number
  category: number
  rating: number
}

export interface PizzasState {
  items: Item[]
  isLoading: boolean
  filters: string
}
