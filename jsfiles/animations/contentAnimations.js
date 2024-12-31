import { ANIMATION_CONFIG, STATES } from './config.js';

export function animateContent(content, index, isEntering) {
  const delay = index * ANIMATION_CONFIG.staggerDelay;
  const state = isEntering ? STATES.visible : STATES.hidden;
  
  if (isEntering) {
    content.style.opacity = STATES.hidden.opacity;
    content.style.transform = `translateY(20px) scale(${STATES.hidden.scale})`;
    content.style.filter = STATES.hidden.filter;
    content.offsetHeight; // Force reflow
  }
  
  content.style.transition = `
    opacity ${ANIMATION_CONFIG.duration}ms ${ANIMATION_CONFIG.easing},
    transform ${ANIMATION_CONFIG.duration}ms ${ANIMATION_CONFIG.easing},
    filter ${ANIMATION_CONFIG.duration}ms ${ANIMATION_CONFIG.smoothEasing}
  `;
  
  content.style.transitionDelay = `${delay}ms`;
  requestAnimationFrame(() => {
    content.style.opacity = state.opacity;
    content.style.transform = `translateY(0) scale(${state.scale})`;
    content.style.filter = state.filter;
  });
  
  return ANIMATION_CONFIG.duration + delay;
}