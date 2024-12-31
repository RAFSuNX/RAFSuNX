import { ANIMATION_CONFIG, STATES } from './config.js';

const SECTION_ANIMATION_CONFIG = {
  duration: 1000,
  staggerDelay: 80,
  easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)', // Smooth easing
};

const SECTION_STATES = {
  hidden: {
    opacity: '0',
    transform: 'translateY(0) scale(0.98)',
    filter: 'blur(3px)',
  },
  visible: {
    opacity: '1',
    transform: 'translateY(0) scale(1)',
    filter: 'blur(0)',
  },
};

export function animateSection(section, direction, offset) {
  const isEntering = offset === 0;
  const duration = SECTION_ANIMATION_CONFIG.duration;
  const delay = 0; // No stagger delay for sections
  
  // Base transition for all states
  const baseTransition = `
    opacity ${duration}ms ${SECTION_ANIMATION_CONFIG.easing},
    transform ${duration}ms ${SECTION_ANIMATION_CONFIG.easing},
    filter ${duration}ms ${SECTION_ANIMATION_CONFIG.easing}
  `;

  if (isEntering) {
    section.style.transition = baseTransition;
    section.style.transitionDelay = `${delay}ms`;
    section.classList.add('active');
    
    requestAnimationFrame(() => {
      Object.assign(section.style, SECTION_STATES.visible);
      
      // Animate content with delay
      const content = section.querySelector('.content');
      if (content) {
        content.style.transition = baseTransition;
        content.style.transitionDelay = '150ms';
        Object.assign(content.style, SECTION_STATES.visible);
      }
    });
  } else {
    section.style.transition = baseTransition;
    section.style.transitionDelay = `${delay}ms`;
    section.classList.remove('active');
    
    requestAnimationFrame(() => {
      Object.assign(section.style, SECTION_STATES.hidden);
      
      const content = section.querySelector('.content');
      if (content) {
        content.style.transition = baseTransition;
        Object.assign(content.style, SECTION_STATES.hidden);
      }
    });
  }
}
