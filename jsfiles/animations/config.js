// Shared animation configuration
export const ANIMATION_CONFIG = {
  duration: 600, // Reduced duration for snappier transitions
  staggerDelay: 100,
  easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)', // Ease-out-cubic for smoother transitions
  smoothEasing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Ease-in-out for smooth start and end
  springEasing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' // Improved spring effect
};

// Common animation states
export const STATES = {
  hidden: {
    opacity: '0',
    scale: 0.95,
    filter: 'blur(8px)',
    transform: 'translateY(30px) scale(0.95)'
  },
  visible: {
    opacity: '1',
    scale: 1,
    filter: 'blur(0)',
    transform: 'translateY(0) scale(1)'
  }
};
