import { imageData } from './imageData.js';

class ThemeManager {
  constructor() {
    this.lastIndex = -1;
    this.styleTag = null;
    this.preloadImages();
  }

  preloadImages() {
    imageData.forEach(item => {
      const img = new Image();
      img.src = item.image;
    });
  }

  getRandomIndex() {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * imageData.length);
    } while (randomIndex === this.lastIndex);
    
    this.lastIndex = randomIndex;
    return randomIndex;
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
    const index = this.getRandomIndex();
    const selectedTheme = imageData[index];
    
    const mainElement = document.getElementById('main');
    
    // Add transition class before changing background
    mainElement.classList.add('theme-transition');
    
    // Apply new background and styles
    mainElement.style.backgroundImage = `url(${selectedTheme.image})`;
    this.applyStyles(selectedTheme.styles);
    
    // Remove transition class after animation completes
    setTimeout(() => {
      mainElement.classList.remove('theme-transition');
    }, 600);
  }
}

export const themeManager = new ThemeManager();