export const getItem = <T>(key: string): T => {
  const item = localStorage.getItem(key)
  return item !== null ? JSON.parse(item) : null
}

export const setItem = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value))
}
