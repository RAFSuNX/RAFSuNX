import { StorageKeys, storage } from '../utils/storage.js';
import { ImageLoader } from '../utils/imageLoader.js';
import { THEME_CONFIG, themes } from './themeData.js';

class ThemeManager {
  constructor() {
    this.styleTag = null;
    this.initialized = false;
    this.init();
  }

  async init() {
    if (this.initialized) return;
    
    // Preload images before initializing
    try {
      await Promise.all(ImageLoader.preloadImages(themes));
    } catch (error) {
      console.error('Failed to preload images:', error);
    }

    this.setTheme();
    this.initialized = true;
  }

  shouldChangeTheme() {
    const lastChange = parseInt(storage.get(StorageKeys.LAST_CHANGE)) || 0;
    return Date.now() - lastChange >= THEME_CONFIG.CHANGE_INTERVAL;
  }

  getThemeIndex() {
    if (this.shouldChangeTheme()) {
      const currentIndex = parseInt(storage.get(StorageKeys.THEME_INDEX)) || 0;
      const newIndex = (currentIndex + 1) % themes.length;
      
      storage.set(StorageKeys.THEME_INDEX, newIndex);
      storage.set(StorageKeys.LAST_CHANGE, Date.now());
      
      return newIndex;
    }
    
    return parseInt(storage.get(StorageKeys.THEME_INDEX)) || 0;
  }

  applyStyles(styles) {
    if (this.styleTag) {
      this.styleTag.remove();
    }
    
    this.styleTag = document.createElement('style');
    this.styleTag.textContent = styles;
    document.head.appendChild(this.styleTag);
  }

  setTheme() {
    const index = this.getThemeIndex();
    const theme = themes[index];
    
    const mainElement = document.getElementById('main');
    mainElement.classList.add('theme-transition');
    
    mainElement.style.backgroundImage = `url(${theme.image})`;
    this.applyStyles(theme.styles);
    
    setTimeout(() => {
      mainElement.classList.remove('theme-transition');
    }, THEME_CONFIG.TRANSITION_DURATION);
  }
}

export const themeManager = new ThemeManager();