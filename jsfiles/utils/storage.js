// Utility functions for local storage operations
export const StorageKeys = {
  THEME_INDEX: 'themeIndex',
  LAST_CHANGE: 'lastThemeChange'
};

export const storage = {
  get: (key) => localStorage.getItem(key),
  set: (key, value) => localStorage.setItem(key, value),
  remove: (key) => localStorage.removeItem(key)
};