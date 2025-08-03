# Interactive Features Implementation

## Overview

Implement interactive features for the about page, including team member modals, smooth scrolling, animations, and enhanced user experience elements that match the original site's functionality.

## Core Interactive Features

### 1. Team Member Biography Modals

**Feature**: Expandable team member biographies with detailed information

#### Modal Functionality
- **Trigger**: "Read Full Biography" button on team member cards
- **Content**: Extended biographical information, achievements, credentials
- **Navigation**: Keyboard support (Escape to close, Tab navigation)
- **Accessibility**: Focus trapping, ARIA labels, screen reader support

#### Implementation Enhancements

```typescript
// Enhanced modal with keyboard navigation and animation
export const TeamMemberModal: React.FC<TeamMemberModalProps> = ({
  member,
  onClose,
  className
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Enhanced keyboard handling
  useEffect(() => {
    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
      if (event.key === 'Tab') {
        // Implement focus trapping logic
        handleTabNavigation(event);
      }
    };

    document.addEventListener('keydown', handleKeyboard);
    return () => document.removeEventListener('keydown', handleKeyboard);
  }, [onClose]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black transition-opacity duration-300 ${
        isAnimating ? 'bg-opacity-0' : 'bg-opacity-50'
      }`}
      onClick={onClose}
    >
      <div 
        className={`bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 ${
          isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal content */}
      </div>
    </div>
  );
};
```

### 2. Smooth Scrolling Navigation

**Feature**: Smooth page navigation and section linking

#### Anchor Links
- **Section Navigation**: Links to specific page sections
- **Smooth Scrolling**: Animated transitions between sections
- **URL Updates**: Browser history management for deep linking

```typescript
// Smooth scrolling utility
export const smoothScrollTo = (elementId: string, offset: number = 80) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }
};

// Section navigation component
export const SectionNavigation: React.FC = () => {
  const sections = [
    { id: 'hero', label: 'Overview' },
    { id: 'history', label: 'Our Story' },
    { id: 'team', label: 'Our Team' },
    { id: 'contact', label: 'Contact Us' }
  ];

  return (
    <nav className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
      <ul className="space-y-2">
        {sections.map((section) => (
          <li key={section.id}>
            <button
              onClick={() => smoothScrollTo(section.id)}
              className="block w-3 h-3 rounded-full bg-gray-300 hover:bg-blue-600 transition-colors duration-200"
              aria-label={`Navigate to ${section.label}`}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

### 3. Scroll-Triggered Animations

**Feature**: Elements animate into view as user scrolls

#### Intersection Observer Implementation

```typescript
// Custom hook for scroll animations
export const useScrollAnimation = (threshold: number = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only animate once
        }
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { elementRef, isVisible };
};

// Animated section wrapper
export const AnimatedSection: React.FC<{
  children: React.ReactNode;
  animation?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'fadeIn';
  delay?: number;
}> = ({ children, animation = 'fadeInUp', delay = 0 }) => {
  const { elementRef, isVisible } = useScrollAnimation();

  const animationClasses = {
    fadeInUp: 'translate-y-8 opacity-0',
    fadeInLeft: '-translate-x-8 opacity-0',
    fadeInRight: 'translate-x-8 opacity-0',
    fadeIn: 'opacity-0'
  };

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'translate-y-0 translate-x-0 opacity-100' : animationClasses[animation]
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};
```

### 4. Interactive Team Member Cards

**Feature**: Enhanced hover effects and micro-interactions

#### Card Hover Effects

```typescript
export const InteractiveTeamCard: React.FC<TeamMemberCardProps> = ({
  member,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`transform transition-all duration-300 ${
        isHovered ? 'scale-105 shadow-2xl' : 'scale-100 shadow-lg'
      }`}>
        {/* Card content */}
        <div className="relative">
          <img
            src={member.image}
            alt={member.imageAlt}
            className={`w-full h-64 object-cover transition-all duration-300 ${
              isHovered ? 'brightness-110' : 'brightness-100'
            }`}
          />
          
          {/* Overlay on hover */}
          <div className={`absolute inset-0 bg-blue-600 bg-opacity-0 transition-all duration-300 flex items-center justify-center ${
            isHovered ? 'bg-opacity-20' : ''
          }`}>
            {isHovered && (
              <div className="text-white text-center animate-fadeIn">
                <p className="font-semibold">View Full Biography</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Card content with slide-up animation */}
        <div className={`p-6 transition-all duration-300 ${
          isHovered ? 'bg-blue-50' : 'bg-white'
        }`}>
          {/* Team member details */}
        </div>
      </div>
    </div>
  );
};
```

### 5. Progressive Disclosure Features

**Feature**: Expandable content sections with show/hide functionality

#### Expandable Biography Sections

```typescript
export const ExpandableBio: React.FC<{
  shortBio: string;
  fullBio: string;
  maxLength?: number;
}> = ({ shortBio, fullBio, maxLength = 150 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = fullBio.length > maxLength;

  const displayText = isExpanded ? fullBio : shortBio;

  return (
    <div className="space-y-3">
      <p className="text-gray-700 leading-relaxed">
        {displayText}
        {!isExpanded && shouldTruncate && '...'}
      </p>
      
      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors duration-200"
        >
          {isExpanded ? 'Show Less' : 'Read More'}
          <svg 
            className={`inline ml-1 w-4 h-4 transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : ''
            }`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}
    </div>
  );
};
```

### 6. Search and Filter Functionality

**Feature**: Filter team members by role, experience, or specialties

#### Team Member Filtering

```typescript
export const TeamFilter: React.FC<{
  members: TeamMember[];
  onFilterChange: (filtered: TeamMember[]) => void;
}> = ({ members, onFilterChange }) => {
  const [filters, setFilters] = useState({
    role: '',
    experience: '',
    specialty: ''
  });

  const roles = [...new Set(members.map(m => m.role))];
  const specialties = [...new Set(members.flatMap(m => m.specialties || []))];

  useEffect(() => {
    let filtered = members;

    if (filters.role) {
      filtered = filtered.filter(m => m.role.includes(filters.role));
    }

    if (filters.experience) {
      const minYears = parseInt(filters.experience);
      filtered = filtered.filter(m => (m.yearsWithCompany || 0) >= minYears);
    }

    if (filters.specialty) {
      filtered = filtered.filter(m => 
        m.specialties?.some(s => s.includes(filters.specialty))
      );
    }

    onFilterChange(filtered);
  }, [filters, members, onFilterChange]);

  return (
    <div className="mb-8 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Filter Team Members</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Filter controls */}
      </div>
    </div>
  );
};
```

## Animation and Transition Enhancements

### CSS Animation Classes

```css
/* Add to src/index.css */
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

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out;
}

.animate-slideInLeft {
  animation: slideInLeft 0.6s ease-out;
}

/* Stagger animations */
.stagger-children > * {
  animation-delay: calc(var(--stagger-delay, 0) * 100ms);
}
```

### Performance Considerations

#### Optimized Animations
- **GPU Acceleration**: Use `transform` and `opacity` for animations
- **Reduce Reflows**: Avoid animating layout properties
- **Conditional Rendering**: Only render modals when needed
- **Debounced Interactions**: Debounce scroll and resize events

#### Memory Management
```typescript
// Cleanup function for event listeners
export const useCleanupEffect = (cleanup: () => void, deps: any[]) => {
  useEffect(() => {
    return cleanup;
  }, deps);
};

// Debounced scroll handler
export const useDebouncedScroll = (callback: () => void, delay: number = 100) => {
  const debouncedCallback = useCallback(
    debounce(callback, delay),
    [callback, delay]
  );

  useEffect(() => {
    window.addEventListener('scroll', debouncedCallback);
    return () => {
      window.removeEventListener('scroll', debouncedCallback);
      debouncedCallback.cancel();
    };
  }, [debouncedCallback]);
};
```

## Files to Create/Modify

### New Files
- `src/hooks/useScrollAnimation.ts` - Scroll animation hook
- `src/hooks/useCleanupEffect.ts` - Cleanup utility hook
- `src/components/ui/AnimatedSection.tsx` - Animated wrapper component
- `src/components/ui/SectionNavigation.tsx` - Section navigation component
- `src/components/ui/TeamFilter.tsx` - Team filtering component
- `src/utils/animations.ts` - Animation utilities

### Modified Files
- `src/components/ui/TeamMemberCard.tsx` - Add interactive features
- `src/components/ui/TeamMemberModal.tsx` - Enhanced modal functionality
- `src/components/sections/TeamSection.tsx` - Add filtering and animations
- `src/index.css` - Add animation keyframes and classes

## Accessibility Enhancements

### Interactive Element Standards
- **Focus Indicators**: Clear visual focus states for all interactive elements
- **Keyboard Navigation**: Full keyboard accessibility for modals and filters
- **ARIA Labels**: Proper labeling for screen readers
- **Reduced Motion**: Respect user's motion preferences

```typescript
// Respect prefers-reduced-motion
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
};
```

## Testing Strategy

### Interactive Feature Testing
- **Modal Functionality**: Test opening, closing, and navigation
- **Keyboard Navigation**: Verify all features work with keyboard only
- **Touch Interactions**: Test on mobile devices and touch screens
- **Animation Performance**: Verify smooth animations across devices
- **Filter Functionality**: Test all filter combinations

### Browser Compatibility
- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile Browsers**: iOS Safari, Chrome Mobile
- **Fallbacks**: Graceful degradation for older browsers
- **Performance**: Test on lower-end devices

## Success Criteria

- ✅ All interactive features function correctly
- ✅ Animations are smooth and performant (60fps)
- ✅ Modal dialogs are fully accessible
- ✅ Keyboard navigation works throughout
- ✅ Touch interactions work on mobile devices
- ✅ Features degrade gracefully on older browsers
- ✅ No JavaScript errors in console
- ✅ Performance impact is minimal (<100ms interaction delays)