import { ANIMATION_CONFIG, STATES } from './config.js';

export function animateHeader(header, isEntering) {
  const state = isEntering ? STATES.visible : STATES.hidden;
  
  header.style.transition = `
    opacity ${ANIMATION_CONFIG.duration}ms ${ANIMATION_CONFIG.springEasing},
    transform ${ANIMATION_CONFIG.duration}ms ${ANIMATION_CONFIG.springEasing}
  `;
  
  if (isEntering) {
    header.style.opacity = state.opacity;
    header.style.transform = `translateY(0) scale(${state.scale})`;
  } else {
    header.style.opacity = state.opacity;
    header.style.transform = `translateY(-20px) scale(${state.scale})`;
  }
}
