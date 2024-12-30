import { applyCardAnimation } from './animations/cardAnimations.js';

export class CardManager {
  constructor(sectionId) {
    this.currentIndex = 0;
    this.section = document.getElementById(sectionId);
    this.cardGrid = this.section.querySelector('.card-grid');
    this.cards = Array.from(this.cardGrid.querySelectorAll('.card'));
    this.totalCards = this.cards.length;
    this.isAnimating = false;
    this.scrollTimeout = null;
    
    // Track scroll state
    this.canScrollUp = false;
    this.canScrollDown = true;
    
    // Throttle scroll handling
    this.lastScrollTime = 0;
    this.scrollThreshold = 100; // ms between scroll events

    // Initialize cards
    this.initializeCards();
  }

  initializeCards() {
    // Hide all cards initially
    this.cards.forEach(card => {
      card.style.display = 'none';
      Object.assign(card.style, {
        opacity: '0',
        transform: 'translateY(20px) scale(0.98)',
        filter: 'blur(3px)',
      });
    });
    
    // Show initial cards with animation
    requestAnimationFrame(() => {
      this.updateVisibility();
    });
  }

  handleScroll(e) {
    if (this.isAnimating) return false;
    
    const now = Date.now();
    if (now - this.lastScrollTime < this.scrollThreshold) {
      return true; // Still throttling
    }
    this.lastScrollTime = now;
    
    if (e.deltaY > 0 && this.canScrollDown) {
      this.navigate('next');
      return true;
    } else if (e.deltaY < 0 && this.canScrollUp) {
      this.navigate('prev');
      return true;
    }
    
    return false;
  }

  updateVisibility() {
    const visibleCards = this.cards.slice(this.currentIndex, this.currentIndex + 3);
    let maxDelay = 0;
    
    // Update scroll state
    this.canScrollUp = this.currentIndex > 0;
    this.canScrollDown = this.currentIndex + 3 < this.totalCards;
    
    // Show visible cards
    visibleCards.forEach((card, index) => {
      card.style.display = 'flex';
      const delay = applyCardAnimation(card, index, true);
      maxDelay = Math.max(maxDelay, delay);
    });
    
    return maxDelay;
  }

  navigate(direction) {
    if (this.isAnimating) return;
    
    this.isAnimating = true;
    
    // Hide current cards with staggered exit animation
    const currentCards = this.cards.slice(this.currentIndex, this.currentIndex + 3);
    currentCards.forEach((card, index) => {
      applyCardAnimation(card, index, false);
    });
    
    // Update index after exit animation starts
    setTimeout(() => {
      // Hide previous cards
      currentCards.forEach(card => {
        card.style.display = 'none';
      });
      
      if (direction === 'next') {
        this.currentIndex = Math.min(this.currentIndex + 3, this.totalCards - 3);
      } else {
        this.currentIndex = Math.max(this.currentIndex - 3, 0);
      }
      
      // Show new cards with animation
      const maxDelay = this.updateVisibility();
      
      // Reset animation lock after all animations complete
      setTimeout(() => {
        this.isAnimating = false;
      }, maxDelay);
    }, 400);
  }
}