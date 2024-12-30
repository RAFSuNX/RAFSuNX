import { TRANSITION_DURATION } from './constants.js';

export function animateSection(section, direction, offset) {
  // Use a simpler easing curve to prevent overshooting
  section.style.transition = `
    transform ${TRANSITION_DURATION}ms cubic-bezier(0.4, 0.0, 0.2, 1),
    opacity ${TRANSITION_DURATION}ms ease-in-out
  `;
  
  // Apply transform without scale to keep movement linear
  section.style.transform = `translateX(${offset}%)`;
  
  if (offset === 0) {
    section.classList.add('active');
    section.style.opacity = '1';
  } else {
    section.classList.remove('active');
    section.style.opacity = '0';
  }
}