export interface Item {
  id: number
  title: string
  price: number
  imageUrl: string
  type: string
  size: number
  typeIndex: number
  sizeIndex: number
  count: number
  amount: number
}

export interface CartState {
  items: {
    [key: string]: {
      details: {
        [key: string]: Item
      }
      count: number
      amount: number
    }
  }
  count: number
  amount: number
}
