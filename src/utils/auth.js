import Cookies from 'js-cookie'
const storage = window.localStorage
export function getKey (key) {
  return Cookies.get(key)
}

export function setKey (key, value) {
  return Cookies.set(key, value)
}
export function removeKey (key) {
  return Cookies.remove(key)
}

export function getStorage (key) {
  return storage.getItem(key)
}

export function setStorage (key, value) {
  return storage.setItem(key, value)
}
export function removeStorage () {
  // 清除除了tokenid之外的缓存数据
  storage.removeItem('invoiceDetail')
  storage.removeItem('image')
  // storage.removeItem('userInfo')
}
export function removeItem (key) {
  // 清除除了tokenid之外的缓存数据
  storage.removeItem(key)
}
export function clear () {
  storage.clear()
}
