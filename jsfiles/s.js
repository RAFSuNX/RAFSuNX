// Theme initialization
import { themeManager } from './themeManager.js';
import { CardManager } from './cardManager.js';

// Initialize theme and card managers when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  themeManager.setTheme();
  
  // Initialize card managers for projects and skills sections
  const projectsSection = document.getElementById('projects');
  const skillsSection = document.getElementById('skills');
  
  // Store card manager instances on the section elements
  projectsSection.cardManager = new CardManager('projects');
  skillsSection.cardManager = new CardManager('skills');
});