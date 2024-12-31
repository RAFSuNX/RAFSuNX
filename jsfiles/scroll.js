import { SCROLL_DEBOUNCE } from './constants.js';
import { animateSection } from './animations.js';

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');
  let currentSection = 0;
  let isAnimating = false;
  const totalSections = sections.length;
  
  // Initialize first section
  updateSections();

  // Handle mouse wheel events
  window.addEventListener('wheel', debounce((e) => {
    if (isAnimating) return;

    const currentSectionElement = sections[currentSection];
    
    // Check if we're in a section with cards
    if (currentSectionElement.id === 'projects' || currentSectionElement.id === 'skills') {
      const cardManager = currentSectionElement.cardManager;
      if (cardManager && cardManager.handleScroll(e)) {
        return;
      }
    }

    // Handle section navigation
    if (e.deltaY > 0 && currentSection < totalSections - 1) {
      currentSection++;
      updateSections();
    } else if (e.deltaY < 0 && currentSection > 0) {
      currentSection--;
      updateSections();
    }
  }, SCROLL_DEBOUNCE));

  function updateSections() {
    if (isAnimating) return;
    isAnimating = true;
    
    sections.forEach((section, index) => {
      const offset = (index - currentSection) * 100;
      animateSection(section, null, offset);
    });

    // Reset animation lock after transition
    setTimeout(() => {
      isAnimating = false;
    }, 1000); // Match new animation duration
  }

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
});