# Interactive Features Implementation

**Purpose:** Add interactive functionality and enhanced user experience features  
**Priority:** Low (Enhancement)  
**Dependencies:** 01-06 (Core implementation complete)

## Overview

This final phase adds interactive features that enhance user engagement and provide a modern web experience. These features go beyond the static content cloning to create a more dynamic and user-friendly interface.

## Feature 1: Smooth Scrolling Navigation

### Anchor Navigation Component

**File:** `src/components/ui/AnchorNav.tsx`

```typescript
interface AnchorNavProps {
  sections: Array<{
    id: string;
    label: string;
  }>;
  className?: string;
}

export const AnchorNav: React.FC<AnchorNavProps> = ({ sections, className }) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observers = sections.map(section => {
      const element = document.getElementById(section.id);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(section.id);
          }
        },
        { threshold: 0.5, rootMargin: '-100px 0px -100px 0px' }
      );

      observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <nav className={cn('fixed right-8 top-1/2 transform -translate-y-1/2 z-40', className)}>
      <ul className="space-y-2">
        {sections.map(section => (
          <li key={section.id}>
            <button
              onClick={() => scrollToSection(section.id)}
              className={cn(
                'block w-3 h-3 rounded-full transition-all duration-300',
                'border-2 border-primary hover:scale-125',
                activeSection === section.id 
                  ? 'bg-primary' 
                  : 'bg-transparent hover:bg-primary/30'
              )}
              aria-label={`Go to ${section.label} section`}
              title={section.label}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

### Implementation in HomePage

```typescript
// Add to HomePage component
const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' }
];

// Add section IDs to components
<HeroSection id="hero" hero={homeData.hero} />
<AboutSection id="about" about={homeData.about} company={companyData} />
<ServicesSection id="services" services={homeData.services} />
<TestimonialsSection id="testimonials" testimonials={homeData.testimonials} />
<ContactSection id="contact" contact={contactData} />

<AnchorNav sections={sections} className="hidden lg:block" />
```

## Feature 2: Contact Form with Validation

### Contact Form Component

**File:** `src/components/ui/ContactForm.tsx`

```typescript
interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  aircraft: string;
  service: string;
  message: string;
}

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    aircraft: '',
    service: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const serviceOptions = [
    'Annual Inspection',
    '100-Hour Inspection', 
    'Preventive Maintenance',
    'Airworthiness Certificate',
    'Special Flight Permit',
    'General Repair',
    'Other'
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[^\d+]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // In a real application, this would send to your backend
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          aircraft: '',
          service: '',
          message: ''
        });
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('There was an error submitting your message. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <CheckCircleIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-green-800 mb-2">
          Message Sent Successfully!
        </h3>
        <p className="text-green-700">
          Thank you for contacting Yankee Aviation. We'll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={cn(
              'w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary',
              errors.name ? 'border-red-500' : 'border-gray-300'
            )}
            placeholder="Your full name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={cn(
              'w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary',
              errors.email ? 'border-red-500' : 'border-gray-300'
            )}
            placeholder="your.email@example.com"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={cn(
              'w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary',
              errors.phone ? 'border-red-500' : 'border-gray-300'
            )}
            placeholder="(555) 123-4567"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        {/* Aircraft */}
        <div>
          <label htmlFor="aircraft" className="block text-sm font-medium text-gray-700 mb-2">
            Aircraft Make/Model
          </label>
          <input
            type="text"
            id="aircraft"
            name="aircraft"
            value={formData.aircraft}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="e.g., Cessna 172, Piper Cherokee"
          />
        </div>
      </div>

      {/* Service Type */}
      <div>
        <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
          Service Needed
        </label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
        >
          <option value="">Select a service...</option>
          {serviceOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleInputChange}
          className={cn(
            'w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary',
            errors.message ? 'border-red-500' : 'border-gray-300'
          )}
          placeholder="Tell us about your aircraft maintenance needs..."
        />
        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isSubmitting}
        className="w-full md:w-auto"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending Message...
          </>
        ) : (
          'Send Message'
        )}
      </Button>
    </form>
  );
};
```

## Feature 3: Image Gallery with Lightbox

### Gallery Component

**File:** `src/components/ui/ImageGallery.tsx`

```typescript
interface GalleryImage {
  src: string;
  alt: string;
  thumbnail: string;
  caption?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  columns?: number;
  className?: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  columns = 3,
  className
}) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    const newIndex = direction === 'prev' 
      ? (selectedImage - 1 + images.length) % images.length
      : (selectedImage + 1) % images.length;
    
    setSelectedImage(newIndex);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      
      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          navigateImage('prev');
          break;
        case 'ArrowRight':
          navigateImage('next');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  return (
    <>
      {/* Gallery Grid */}
      <div className={cn(
        'grid gap-4',
        {
          'grid-cols-1': columns === 1,
          'grid-cols-2': columns === 2,
          'grid-cols-3': columns === 3,
          'grid-cols-4': columns === 4,
        },
        className
      )}>
        {images.map((image, index) => (
          <div
            key={index}
            className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            onClick={() => openLightbox(index)}
          >
            <img
              src={image.thumbnail}
              alt={image.alt}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
              <MagnifyingGlassIcon className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            
            {/* Caption */}
            {image.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white text-sm">{image.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            aria-label="Close gallery"
          >
            <XMarkIcon className="h-8 w-8" />
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={() => navigateImage('prev')}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            aria-label="Previous image"
          >
            <ChevronLeftIcon className="h-12 w-12" />
          </button>

          <button
            onClick={() => navigateImage('next')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            aria-label="Next image"
          >
            <ChevronRightIcon className="h-12 w-12" />
          </button>

          {/* Image */}
          <div className="max-w-4xl max-h-[90vh] mx-4">
            <img
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              className="max-w-full max-h-full object-contain"
              onLoad={() => setIsLoading(null)}
              onLoadStart={() => setIsLoading(selectedImage)}
            />
            
            {/* Loading Spinner */}
            {isLoading === selectedImage && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
              </div>
            )}
          </div>

          {/* Caption */}
          {images[selectedImage].caption && (
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <p className="text-white text-lg">{images[selectedImage].caption}</p>
            </div>
          )}

          {/* Image Counter */}
          <div className="absolute top-4 left-4 text-white">
            <span className="text-lg">
              {selectedImage + 1} / {images.length}
            </span>
          </div>
        </div>
      )}
    </>
  );
};
```

## Feature 4: Scroll-to-Top Button

### Scroll to Top Component

**File:** `src/components/ui/ScrollToTop.tsx`

```typescript
export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        'fixed bottom-8 right-8 p-3 bg-primary text-white rounded-full shadow-lg',
        'hover:bg-primary-dark hover:shadow-xl transition-all duration-300',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        'z-40'
      )}
      aria-label="Scroll to top"
    >
      <ChevronUpIcon className="h-6 w-6" />
    </button>
  );
};
```

## Feature 5: Loading States and Skeleton Components

### Skeleton Components

**File:** `src/components/ui/Skeleton.tsx`

```typescript
interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular';
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  className, 
  variant = 'text' 
}) => {
  return (
    <div className={cn(
      'animate-pulse bg-gray-300',
      {
        'h-4 rounded': variant === 'text',
        'rounded-lg': variant === 'rectangular',
        'rounded-full': variant === 'circular'
      },
      className
    )} />
  );
};

export const SectionSkeleton: React.FC = () => (
  <div className="py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <Skeleton className="h-8 w-1/2 mx-auto" />
        <Skeleton className="h-4 w-3/4 mx-auto" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Skeleton variant="rectangular" className="h-64" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>
      </div>
    </div>
  </div>
);
```

## Implementation Steps

1. **Add smooth scrolling**: Implement anchor navigation
2. **Create contact form**: Build validated form component
3. **Implement gallery**: Add lightbox image gallery
4. **Add scroll to top**: Create floating scroll button
5. **Enhance loading states**: Add skeleton components
6. **Test interactions**: Verify all features work correctly
7. **Performance optimization**: Ensure smooth animations
8. **Accessibility testing**: Verify keyboard navigation

## Integration with Existing Components

### Update ContactSection

```typescript
// Add contact form to ContactSection
<div className="mt-12 pt-8 border-t border-gray-200">
  <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
    Send Us a Message
  </h3>
  <ContactForm />
</div>
```

### Add Gallery to AboutSection

```typescript
// Add facility images gallery
const facilityImages = [
  {
    src: '/images/facility-1.jpg',
    alt: 'Yankee Aviation main hangar',
    thumbnail: '/images/facility-1-400w.jpg',
    caption: 'Our main maintenance hangar'
  },
  // ... more images
];

<div className="mt-12">
  <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
    Our Facility
  </h3>
  <ImageGallery images={facilityImages} columns={3} />
</div>
```

## Performance Considerations

- **Lazy loading**: All interactive features load after critical content
- **Code splitting**: Import heavy components only when needed
- **Event listeners**: Properly clean up event listeners
- **Animation performance**: Use CSS transforms for smooth animations
- **Memory management**: Prevent memory leaks in components

## Testing Checklist

- [ ] Smooth scrolling navigation works on all screen sizes
- [ ] Contact form validates inputs correctly
- [ ] Contact form submits successfully (with backend integration)
- [ ] Image gallery opens and navigates properly
- [ ] Lightbox responds to keyboard navigation
- [ ] Scroll to top button appears/disappears correctly
- [ ] All animations are smooth and performant
- [ ] Interactive features are accessible with screen readers
- [ ] Mobile touch interactions work properly
- [ ] Loading states provide good user feedback