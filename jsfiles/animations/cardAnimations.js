// Card animation configurations
const ANIMATION_CONFIG = {
  duration: 800,
  staggerDelay: 80,
  easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', // Spring-like easing
};

// Animation states
const STATES = {
  hidden: {
    opacity: '0',
    transform: 'translateY(20px) scale(0.98)',
    filter: 'blur(3px)',
  },
  visible: {
    opacity: '1',
    transform: 'translateY(0) scale(1)',
    filter: 'blur(0)',
  },
};

export function applyCardAnimation(card, index, isEntering) {
  const delay = index * ANIMATION_CONFIG.staggerDelay;
  const state = isEntering ? STATES.visible : STATES.hidden;
  
  // Apply initial state immediately for entering cards
  if (isEntering) {
    Object.assign(card.style, STATES.hidden);
    // Force reflow to ensure the initial state is applied
    card.offsetHeight;
  }
  
  card.style.transition = `
    opacity ${ANIMATION_CONFIG.duration}ms ${ANIMATION_CONFIG.easing},
    transform ${ANIMATION_CONFIG.duration}ms ${ANIMATION_CONFIG.easing},
    filter ${ANIMATION_CONFIG.duration}ms cubic-bezier(0.4, 0.0, 0.2, 1)
  `;
  
  card.style.transitionDelay = `${delay}ms`;
  requestAnimationFrame(() => {
    Object.assign(card.style, state);
  });
  
  return ANIMATION_CONFIG.duration + delay;
}