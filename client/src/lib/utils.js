export function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1);
}

export function toLocalStorage(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function fromLocalStorage(key) {
  return JSON.parse(window.localStorage.getItem(key));
}

export function removeLocalStorage(key) {
  window.localStorage.removeItem(key);
}
