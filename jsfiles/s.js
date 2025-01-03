// Theme initialization
import { themeManager } from './theme/themeManager.js';
import { CardManager } from './cardManager.js';

// Initialize theme and card managers when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize theme
  themeManager.init();
  
  // Initialize card managers for projects and skills sections
  const projectsSection = document.getElementById('projects');
  const skillsSection = document.getElementById('skills');
  
  projectsSection.cardManager = new CardManager('projects');
  skillsSection.cardManager = new CardManager('skills');
});