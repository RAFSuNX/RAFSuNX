import { applyCardAnimation } from './animations/cardAnimations.js';

export class CardManager {
  constructor(sectionId) {
    this.currentIndex = 0;
    this.section = document.getElementById(sectionId);
    this.cardGrid = this.section.querySelector('.card-grid');
    this.cards = Array.from(this.cardGrid.querySelectorAll('.card'));
    this.totalCards = this.cards.length;
    this.isAnimating = false;
    this.cardsPerView = this.calculateCardsPerView();
    
    // Track scroll state
    this.canScrollUp = false;
    this.canScrollDown = true;
    
    // Throttle scroll handling
    this.lastScrollTime = 0;
    this.scrollThreshold = 100;

    // Initialize cards
    this.initializeCards();
    
    // Add resize listener
    window.addEventListener('resize', () => {
      const newCardsPerView = this.calculateCardsPerView();
      if (newCardsPerView !== this.cardsPerView) {
        this.cardsPerView = newCardsPerView;
        this.currentIndex = Math.floor(this.currentIndex / newCardsPerView) * newCardsPerView;
        this.updateVisibility();
      }
    });
  }

  calculateCardsPerView() {
    const containerWidth = this.cardGrid.offsetWidth;
    const cardWidth = 300;
    const gap = 24;
    const possibleCards = Math.floor((containerWidth + gap) / (cardWidth + gap));
    return Math.max(1, Math.min(possibleCards, 3));
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
    
    requestAnimationFrame(() => {
      this.updateVisibility();
    });
  }

  handleScroll(e) {
    if (this.isAnimating) return false;
    
    const now = Date.now();
    if (now - this.lastScrollTime < this.scrollThreshold) {
      return true;
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
    // Hide all cards first
    this.cards.forEach(card => {
      card.style.display = 'none';
    });

    const visibleCards = this.cards.slice(this.currentIndex, this.currentIndex + this.cardsPerView);
    let maxDelay = 0;
    
    // Update scroll state
    this.canScrollUp = this.currentIndex > 0;
    this.canScrollDown = this.currentIndex + this.cardsPerView < this.totalCards;
    
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
    const currentCards = this.cards.slice(this.currentIndex, this.currentIndex + this.cardsPerView);
    currentCards.forEach((card, index) => {
      applyCardAnimation(card, index, false);
    });
    
    setTimeout(() => {
      // Calculate next index
      if (direction === 'next') {
        this.currentIndex = Math.min(this.currentIndex + this.cardsPerView, this.totalCards - this.cardsPerView);
      } else {
        this.currentIndex = Math.max(this.currentIndex - this.cardsPerView, 0);
      }
      
      const maxDelay = this.updateVisibility();
      
      setTimeout(() => {
        this.isAnimating = false;
      }, maxDelay);
    }, 400);
  }
}