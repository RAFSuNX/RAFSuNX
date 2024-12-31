import { imageData } from './imageData.js';

class ThemeManager {
  constructor() {
    this.lastIndex = parseInt(localStorage.getItem('lastThemeIndex')) || -1;
    console.log('Initialized lastIndex from localStorage:', this.lastIndex); // Debugging log
    console.log('localStorage.getItem(\'lastThemeIndex\'):', localStorage.getItem('lastThemeIndex')); // Debugging log
    this.styleTag = null;
    this.preloadImages();
    this.themeSet = false; // Flag to prevent multiple calls to setTheme
    this.setTheme();
  }

  preloadImages() {
    imageData.forEach(item => {
      const img = new Image();
      img.src = item.image;
    });
  }

  getRandomIndex() {
    console.log('Before getRandomIndex, lastIndex:', this.lastIndex); // Debugging log
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * imageData.length);
    } while (randomIndex === this.lastIndex);
    
    this.lastIndex = randomIndex;
    localStorage.setItem('lastThemeIndex', this.lastIndex);
    console.log('New lastIndex:', this.lastIndex); // Debugging log
    console.log('localStorage.getItem(\'lastThemeIndex\') after setItem:', localStorage.getItem('lastThemeIndex')); // Debugging log
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
    if (this.themeSet) {
      console.log('setTheme already called, skipping'); // Debugging log
      return;
    }
    console.log('Before setTheme, lastIndex:', this.lastIndex); // Debugging log
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
    
    console.log('Theme set with index:', index, 'and image:', selectedTheme.image); // Debugging log
    this.themeSet = true; // Set the flag to true after setting the theme
  }
}

export const themeManager = new ThemeManager();
