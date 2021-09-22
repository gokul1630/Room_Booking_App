export const storage = (key) => {
  const localData = localStorage.getItem(key)
  return JSON.parse(localData)
}

export const saveToStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data))
}
