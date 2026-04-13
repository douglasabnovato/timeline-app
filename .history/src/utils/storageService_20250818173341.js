// utils/storageService.js

export const storageService = {
  get(key) {
    try {
      return JSON.parse(localStorage.getItem(key)) || null;
    } catch {
      return null;
    }
  },

  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  pushToArray(key, item) {
    const arr = storageService.get(key) || [];
    arr.push(item);
    storageService.set(key, arr);
  },

  updateArray(key, predicate, updater) {
    const arr = storageService.get(key) || [];
    const updated = arr.map((item) => (predicate(item) ? updater(item) : item));
    storageService.set(key, updated);
  },

  removeFromArray(key, predicate) {
    const arr = storageService.get(key) || [];
    const filtered = arr.filter((item) => !predicate(item));
    storageService.set(key, filtered);
  },
};
