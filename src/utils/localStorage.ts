//const ID: string = 'uuid'
const id: number = null

const setID = () => {
  //const localId = getItem(ID, true)
  //id = localId != null ? parseInt(localId) + 1 : 1
  //setItem(ID, id.toString(), true)
}

const getKey = (key: string) => {
  return id != null ? `${id.toString()}_${key}` : key
}

const setItem = (key: string, value: string, force?: boolean) => {
  sessionStorage.setItem(force ? key : getKey(key), value);
}

const getItem = (key: string, force?: boolean) => {
  const value = sessionStorage.getItem(force ? key : getKey(key));
  return value;
}

const removeItem = (key: string) => {
  sessionStorage.removeItem(getKey(key));
}

export { setID, setItem, getItem, removeItem}