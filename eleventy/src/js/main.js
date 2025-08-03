// Falcon Air Main JavaScript

// Mobile navigation toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('active');
      
      // Animate toggle bars
      navToggle.classList.toggle('active');
    });
  }
});

// Hero slideshow functionality
class HeroSlideshow {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      autoAdvance: element.dataset.autoAdvance === 'true',
      duration: parseInt(element.dataset.duration) || 5000,
      ...options
    };
    
    this.currentSlide = 0;
    this.totalSlides = 4; // From data
    this.autoAdvanceTimer = null;
    
    this.init();
  }
  
  init() {
    this.bindControls();
    if (this.options.autoAdvance) {
      this.startAutoAdvance();
    }
  }
  
  bindControls() {
    const prevBtn = this.element.querySelector('.hero-control--prev');
    const nextBtn = this.element.querySelector('.hero-control--next');
    const indicators = this.element.querySelectorAll('.hero-indicator');
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.previousSlide());
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.nextSlide());
    }
    
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => this.goToSlide(index));
    });
  }
  
  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.updateSlide();
    this.resetAutoAdvance();
  }
  
  previousSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.updateSlide();
    this.resetAutoAdvance();
  }
  
  goToSlide(index) {
    this.currentSlide = index;
    this.updateSlide();
    this.resetAutoAdvance();
  }
  
  updateSlide() {
    // Update indicators
    const indicators = this.element.querySelectorAll('.hero-indicator');
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === this.currentSlide);
    });
    
    // Could update background content here if multiple slides have different content
  }
  
  startAutoAdvance() {
    this.autoAdvanceTimer = setInterval(() => {
      this.nextSlide();
    }, this.options.duration);
  }
  
  stopAutoAdvance() {
    if (this.autoAdvanceTimer) {
      clearInterval(this.autoAdvanceTimer);
      this.autoAdvanceTimer = null;
    }
  }
  
  resetAutoAdvance() {
    if (this.options.autoAdvance) {
      this.stopAutoAdvance();
      this.startAutoAdvance();
    }
  }
}

// Auto-initialize slideshow
document.addEventListener('DOMContentLoaded', () => {
  const heroElement = document.querySelector('[data-slideshow="true"]');
  if (heroElement) {
    new HeroSlideshow(heroElement);
  }
});