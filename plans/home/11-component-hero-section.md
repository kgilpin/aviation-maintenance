# Component: Hero Section

**Phase**: 3 - Page-Specific Components  
**File**: `src/_includes/components/hero-section.html`  
**Purpose**: Hero section with video background, slideshow, and call-to-action  
**Dependencies**: `home.json`, `cta-button.html`

## Overview

Create the hero section component for the home page featuring video background, slideshow functionality, and prominent call-to-action. This is the primary visual element that establishes the company's professional image.

## Content Analysis

From the original home page:
- **Main Heading**: "A Leading Fixed Base Operator"
- **Description**: Full company mission statement
- **CTA Button**: "LEARN MORE" linking to maintenance page
- **Background**: Video with poster image fallback
- **Slideshow**: 4-slide carousel with auto-advance
- **Controls**: Previous/next navigation buttons

## Component Specification

### Template Location
```
src/_includes/components/hero-section.html
```

### Data Requirements
- `hero` object from `home.json` (complete hero configuration)
- Includes: heading, description, cta, background, slideshow settings

### Template Code
```html
{% comment %}
Hero Section Component

Main hero section with video background, slideshow, and call-to-action.

Props:
- hero: Complete hero section data object
- hero.heading: Main H1 heading
- hero.description: Supporting paragraph text
- hero.cta: Call-to-action button configuration
- hero.background: Background media configuration
- hero.slideshow: Slideshow behavior settings

Usage:
{% include "components/hero-section.html" with home.hero %}
{% endcomment %}

<section class="hero-section" 
         role="banner"
         {% if hero.slideshow.enabled %}
           data-slideshow="true"
           data-auto-advance="{{ hero.slideshow.auto_advance | default(true) }}"
           data-duration="{{ hero.slideshow.duration | default(5000) }}"
         {% endif %}>
  
  <!-- Background Media -->
  <div class="hero-background">
    {% if hero.background.type == "video" and hero.background.video_url %}
      <video class="hero-video" 
             autoplay muted loop playsinline
             poster="{{ hero.background.poster }}"
             aria-hidden="true">
        <source src="{{ hero.background.video_url }}" type="video/mp4">
        <!-- Fallback for unsupported video -->
      </video>
    {% endif %}
    
    <!-- Fallback background image -->
    <div class="hero-image" 
         style="background-image: url('{{ hero.background.fallback_image }}');"
         aria-hidden="true">
    </div>
    
    <!-- Overlay for text readability -->
    <div class="hero-overlay" aria-hidden="true"></div>
  </div>
  
  <!-- Hero Content -->
  <div class="hero-content">
    <div class="hero-content-inner">
      <h1 class="hero-heading">{{ hero.heading }}</h1>
      <p class="hero-description">{{ hero.description }}</p>
      
      {% if hero.cta %}
        <div class="hero-cta">
          {% include "components/cta-button.html" with hero.cta %}
        </div>
      {% endif %}
    </div>
  </div>
  
  <!-- Slideshow Controls -->
  {% if hero.slideshow.enabled %}
    <div class="hero-controls" aria-label="Slideshow controls">
      <button class="hero-control hero-control--prev" 
              aria-label="Previous slide"
              type="button">
        <span class="hero-control-icon" aria-hidden="true">‹</span>
      </button>
      
      <button class="hero-control hero-control--next" 
              aria-label="Next slide"
              type="button">
        <span class="hero-control-icon" aria-hidden="true">›</span>
      </button>
    </div>
    
    <!-- Slide indicators -->
    <div class="hero-indicators" aria-label="Slide indicators">
      {% for i in range(1, hero.slideshow.slides + 1) %}
        <button class="hero-indicator{% if loop.first %} active{% endif %}" 
                aria-label="Go to slide {{ i }}"
                data-slide="{{ i }}"
                type="button">
        </button>
      {% endfor %}
    </div>
  {% endif %}
</section>
```

## CSS Requirements

### Base Styles
```css
.hero-section {
  position: relative;
  height: 100vh;
  min-height: 600px;
  max-height: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* Background Media */
.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.hero-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
}

.hero-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(30, 64, 175, 0.8) 0%,
    rgba(30, 58, 138, 0.6) 100%
  );
  z-index: 2;
}

/* Hero Content */
.hero-content {
  position: relative;
  z-index: 3;
  text-align: center;
  color: white;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
}

.hero-content-inner {
  animation: fadeInUp 1s ease-out;
}

.hero-heading {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.hero-description {
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  opacity: 0.95;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.hero-cta {
  margin-top: 2rem;
}

/* Slideshow Controls */
.hero-controls {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 4;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 2rem;
  pointer-events: none;
}

.hero-control {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  pointer-events: auto;
}

.hero-control:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
  transform: scale(1.1);
}

.hero-control-icon {
  font-size: 1.5rem;
  font-weight: bold;
}

/* Slide Indicators */
.hero-indicators {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 4;
  display: flex;
  gap: 0.5rem;
}

.hero-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.5);
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}

.hero-indicator:hover,
.hero-indicator.active {
  background: white;
  border-color: white;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-section {
    height: 100vh;
    min-height: 500px;
    max-height: 600px;
  }
  
  .hero-heading {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  .hero-description {
    font-size: 1.125rem;
    margin-bottom: 1.5rem;
  }
  
  .hero-controls {
    padding: 0 1rem;
  }
  
  .hero-control {
    width: 40px;
    height: 40px;
  }
  
  .hero-control-icon {
    font-size: 1.25rem;
  }
}

/* Reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  .hero-content-inner {
    animation: none;
  }
  
  .hero-control:hover {
    transform: none;
  }
}
```

## JavaScript Requirements

### Slideshow Functionality
```javascript
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
```

## Usage Examples

### Standard Usage
```html
<!-- In home page layout -->
{% include "components/hero-section.html" with home.hero %}
```

### With Custom Configuration
```html
{% set customHero = {
  heading: "Custom Heading",
  description: "Custom description",
  cta: { text: "Custom CTA", url: "/custom/" },
  background: { type: "image", fallback_image: "/images/custom.jpg" },
  slideshow: { enabled: false }
} %}
{% include "components/hero-section.html" with customHero %}
```

## Accessibility Features

### Screen Reader Support
- Proper heading hierarchy (H1 for main heading)
- Descriptive button labels for controls
- `aria-hidden` for decorative elements
- `role="banner"` for landmark navigation

### Keyboard Navigation
- All controls are keyboard accessible
- Proper tab order maintained
- Clear focus indicators

### Video Accessibility
- Video is muted and decorative (`aria-hidden`)
- Poster image provides fallback
- No auto-playing audio

## Implementation Steps

### Step 1: Create Component Template
1. Create `src/_includes/components/hero-section.html`
2. Add complete template with all features
3. Include proper accessibility attributes

### Step 2: Create Component CSS
1. Add styles to `src/css/components/hero-section.css`
2. Include responsive breakpoints
3. Add animation and interaction states

### Step 3: Add JavaScript Behavior
1. Create `src/js/components/hero-slideshow.js`
2. Implement slideshow functionality
3. Add keyboard and mouse interactions

### Step 4: Test Hero Section
1. Test with and without video background
2. Verify slideshow controls work
3. Test responsive behavior
4. Validate accessibility features

## Validation Checklist

After implementation:
- [ ] Hero section renders with correct content
- [ ] Video background plays correctly (if available)
- [ ] Fallback image displays when video unavailable
- [ ] Slideshow controls function properly
- [ ] Auto-advance timing works correctly
- [ ] CTA button integrates properly
- [ ] Responsive design works on all devices
- [ ] Accessibility features validated
- [ ] Performance is acceptable (video loading)

## Next Steps

After completing this component:
1. Proceed to `13-layout-base.md` for base layout creation
2. This component will be used in home page layout
3. Test thoroughly with video hosting solution