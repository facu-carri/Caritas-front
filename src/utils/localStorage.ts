const ID: string = 'uuid'
let id: number = 0

const setID = () => {
  const localId = getItem(ID, true)
  id = localId != null ? parseInt(localId) + 1 : 1
  console.log('Set id', localId, id)
  setItem(ID, id.toString(), true)
}

const getKey = (key: string) => {
  return `${id.toString()}_${key}`
}

const setItem = (key: string, value: string, force?: boolean) => {
  localStorage.setItem(force ? key : getKey(key), value);
}

const getItem = (key: string, force?: boolean) => {
  const value = localStorage.getItem(force ? key : getKey(key));
  return value;
}

const removeItem = (key: string) => {
  localStorage.removeItem(getKey(key));
}

export { setID, setItem, getItem, removeItem}