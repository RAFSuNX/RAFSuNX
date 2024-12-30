import { TRANSITION_DURATION, SCROLL_DEBOUNCE, Direction } from './constants.js';
import { animateSection } from './animations.js';

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');
  let currentSection = 0;
  let isAnimating = false;
  const totalSections = sections.length;
  
  // Track active card manager
  let activeCardManager = null;

  // Initialize first section
  updateSections();

  // Handle mouse wheel events
  window.addEventListener('wheel', debounce((e) => {
    if (isAnimating) return;

    const currentSectionElement = sections[currentSection];
    
    // Check if we're in a section with cards
    if (currentSectionElement.id === 'projects' || currentSectionElement.id === 'skills') {
      // Get the card manager from the section element
      const cardManager = currentSectionElement.cardManager;
      
      // If the card manager handles the scroll, don't proceed with section scroll
      if (cardManager && cardManager.handleScroll(e)) {
        return;
      }
    }

    // If card manager didn't handle the scroll, proceed with section navigation
    if (e.deltaY > 0 && currentSection < totalSections - 1) {
      // Scroll down - move right
      moveSection(Direction.RIGHT);
    } else if (e.deltaY < 0 && currentSection > 0) {
      // Scroll up - move left
      moveSection(Direction.LEFT);
    }
  }, SCROLL_DEBOUNCE));

  function moveSection(direction) {
    isAnimating = true;
    
    if (direction === Direction.RIGHT) {
      currentSection++;
    } else {
      currentSection--;
    }
    
    updateSections(direction);

    // Reset animation lock after transition
    setTimeout(() => {
      isAnimating = false;
    }, TRANSITION_DURATION);
  }

  function updateSections(direction = Direction.RIGHT) {
    sections.forEach((section, index) => {
      const offset = (index - currentSection) * 100;
      animateSection(section, direction, offset);
    });
  }

  // Debounce helper function
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