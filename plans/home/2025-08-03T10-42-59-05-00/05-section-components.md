# Section Components Implementation

**Files:** `src/components/sections/*.tsx`  
**Purpose:** Create page section components that compose the home page layout  
**Priority:** Medium (Content Structure)  
**Dependencies:** 03-layout-components.md, 04-ui-components.md

## Overview

Section components are the main content areas of the home page. They combine UI components with specific layout patterns to create cohesive sections that tell the Yankee Aviation story effectively. Each section is self-contained and reusable across different pages.

## Component 1: HeroSection.tsx

**File:** `src/components/sections/HeroSection.tsx`  
**Purpose:** Main hero banner with company messaging and call-to-action

```typescript
interface HeroSectionProps {
  hero: HeroContent;
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  hero,
  className
}) => {
  return (
    <section className={cn(
      'relative bg-gradient-to-r from-blue-900 to-blue-700 text-white',
      'min-h-[60vh] flex items-center justify-center',
      className
    )}>
      {/* Background Image Overlay */}
      {hero.backgroundImage && (
        <div className="absolute inset-0">
          <img
            src={hero.backgroundImage}
            alt="Yankee Aviation facility"
            className="w-full h-full object-cover opacity-30"
            loading="eager"
          />
          <div className="absolute inset-0 bg-blue-900/40" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          
          {/* Primary Heading */}
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-shadow-lg">
            {hero.primaryHeading}
          </h1>

          {/* Secondary Heading */}
          <h2 className="text-xl md:text-2xl font-medium mb-6 text-blue-100 tracking-wider">
            {hero.secondaryHeading}
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl mb-8 text-blue-50 leading-relaxed max-w-3xl mx-auto">
            {hero.description}
          </p>

          {/* Call to Action */}
          {hero.callToAction && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                variant="primary"
                size="lg"
                href={hero.callToAction.link}
                className="bg-white text-blue-900 hover:bg-gray-100 font-semibold px-8 py-4"
              >
                {hero.callToAction.text}
              </Button>
              <Button
                variant="outline"
                size="lg"
                href="/services"
                className="border-white text-white hover:bg-white hover:text-blue-900"
              >
                Our Services
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDownIcon className="h-8 w-8 text-white/70" />
      </div>
    </section>
  );
};
```

### Key Features
- **Background Image**: Optional hero background with overlay
- **Responsive Typography**: Scales from mobile to desktop
- **Dual CTAs**: Primary and secondary action buttons
- **Visual Hierarchy**: Clear heading structure
- **Scroll Indicator**: Animated chevron for user guidance

## Component 2: AboutSection.tsx

**File:** `src/components/sections/AboutSection.tsx`  
**Purpose:** Company information and history section

```typescript
interface AboutSectionProps {
  about: AboutContent;
  company: Company;
  className?: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  about,
  company,
  className
}) => {
  return (
    <section className={cn('py-16 bg-gray-50', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Content */}
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {about.heading}
            </h2>

            {/* Description Paragraphs */}
            <div className="space-y-4 mb-8">
              {about.description.map((paragraph, index) => (
                <p key={index} className="text-lg text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Key Highlights */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Why Choose {company.name}?
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {about.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Stats */}
            <div className="grid grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-sm border">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{company.yearsInBusiness}+</p>
                <p className="text-sm text-gray-600">Years of Experience</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{company.establishedYear}</p>
                <p className="text-sm text-gray-600">Established</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              <img
                src={about.image}
                alt={about.imageAlt}
                className="w-full h-[400px] lg:h-[500px] object-cover rounded-lg shadow-lg"
                loading="lazy"
              />
              
              {/* Image Overlay with Company Brand */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg">
                <CompanyBrand size="sm" showText={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
```

### Key Features
- **Two-Column Layout**: Content and image side by side
- **Highlight List**: Key benefits with check icons
- **Company Stats**: Visual statistics display
- **Image Overlay**: Company branding on image
- **Responsive Grid**: Stacks on mobile devices

## Component 3: ServicesSection.tsx

**File:** `src/components/sections/ServicesSection.tsx`  
**Purpose:** Services overview with detailed service offerings

```typescript
interface ServicesSectionProps {
  services: ServiceOverview;
  className?: string;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  className
}) => {
  return (
    <section className={cn('py-16 bg-white', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {services.heading}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {services.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Services List */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Our Specialized Services
            </h3>
            
            <div className="space-y-4">
              {services.services.map((service, index) => (
                <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <WrenchScrewdriverIcon className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {service}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Professional service with attention to detail and safety standards.
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-gray-600 mb-4">
                Need a specific service not listed? We provide comprehensive maintenance solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="primary" href="/services">
                  View All Services
                </Button>
                <Button variant="outline" href="/contact">
                  Get Quote
                </Button>
              </div>
            </div>
          </div>

          {/* Service Image */}
          <div>
            <div className="relative">
              <img
                src={services.image}
                alt={services.imageAlt}
                className="w-full h-[500px] object-cover rounded-lg shadow-lg"
                loading="lazy"
              />
              
              {/* Feature Badges */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/95 backdrop-blur-sm p-4 rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <ShieldCheckIcon className="h-5 w-5 text-green-500 mr-2" />
                      <span className="font-medium">Certified Technicians</span>
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="h-5 w-5 text-blue-500 mr-2" />
                      <span className="font-medium">Quick Turnaround</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
```

### Key Features
- **Service Cards**: Individual service items with icons
- **Feature Badges**: Certification and quality indicators
- **Dual CTAs**: View services and get quote options
- **Professional Layout**: Clean, organized service presentation
- **Image Integration**: Service-related imagery with overlays

## Component 4: TestimonialsSection.tsx

**File:** `src/components/sections/TestimonialsSection.tsx`  
**Purpose:** Customer testimonials and reviews section

```typescript
interface TestimonialsSectionProps {
  testimonials: TestimonialsSection;
  className?: string;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  className
}) => {
  return (
    <section className={cn('py-16 bg-gray-50', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {testimonials.heading}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers who trust us with their aircraft.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {testimonials.testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
              className="h-full"
            />
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">20+</div>
              <p className="text-gray-600">Years Average Customer Relationship</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <p className="text-gray-600">Customer Satisfaction Rate</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <p className="text-gray-600">Aircraft Serviced Annually</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6">
            Ready to experience our exceptional service?
          </p>
          <Button variant="primary" size="lg" href="/contact">
            Schedule Your Service Today
          </Button>
        </div>
      </div>
    </section>
  );
};
```

### Key Features
- **Testimonial Cards**: Reusable testimonial display components
- **Trust Indicators**: Statistical proof of service quality
- **Social Proof**: Customer satisfaction metrics
- **Strong CTA**: Clear next step for interested customers
- **Responsive Grid**: Adapts to different screen sizes

## Component 5: ContactSection.tsx

**File:** `src/components/sections/ContactSection.tsx`  
**Purpose:** Contact information with embedded Google Maps

```typescript
interface ContactSectionProps {
  contact: Contact;
  className?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  contact,
  className
}) => {
  return (
    <section className={cn('py-16 bg-white', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Contact us today to discuss your aircraft maintenance needs. We're here to help keep you flying safely.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Information */}
          <div className="space-y-6">
            
            {/* Contact Cards */}
            <ContactCard
              type="phone"
              title="Call Us"
              content={contact.phone}
              href={contact.phone}
              icon={<PhoneIcon className="h-6 w-6" />}
            />
            
            <ContactCard
              type="email"
              title="Email Us"
              content={contact.email}
              href={contact.email}
              icon={<EnvelopeIcon className="h-6 w-6" />}
            />
            
            <ContactCard
              type="address"
              title="Visit Us"
              content={[
                contact.address.street,
                `${contact.address.gate}, ${contact.address.facility}`,
                `${contact.address.city}, ${contact.address.state} ${contact.address.zipCode}`
              ]}
              href={`https://maps.google.com/?q=${encodeURIComponent(
                `${contact.address.street}, ${contact.address.city}, ${contact.address.state}`
              )}`}
              icon={<MapPinIcon className="h-6 w-6" />}
            />
            
            <ContactCard
              type="hours"
              title="Business Hours"
              content={[
                `Monday - Saturday: ${contact.hours.monday}`,
                `Sunday: ${contact.hours.sunday}`
              ]}
              icon={<ClockIcon className="h-6 w-6" />}
            />
          </div>

          {/* Google Maps */}
          <div>
            <div className="h-[500px] bg-gray-200 rounded-lg overflow-hidden shadow-lg">
              <iframe
                src={contact.googleMaps.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Yankee Aviation Location - Plymouth Municipal Airport"
                className="w-full h-full"
              />
            </div>
            
            {/* Map Caption */}
            <p className="text-sm text-gray-600 mt-4 text-center">
              Located at Plymouth Municipal Airport - Gate 3, just off Route 3 in historic Plymouth, MA
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
```

### Key Features
- **Contact Cards**: Phone, email, address, hours display
- **Google Maps**: Embedded interactive map
- **Click Actions**: Tel, mailto, and maps links
- **Responsive Layout**: Side-by-side on desktop, stacked on mobile
- **Accessibility**: Proper iframe title and loading attributes

## Implementation Steps

1. **Create sections directory**: `src/components/sections/`
2. **Implement HeroSection.tsx**: Main banner with CTAs
3. **Build AboutSection.tsx**: Company information layout
4. **Create ServicesSection.tsx**: Service offerings display
5. **Implement TestimonialsSection.tsx**: Customer reviews
6. **Build ContactSection.tsx**: Contact info with maps
7. **Test responsive behavior**: Verify all breakpoints work
8. **Accessibility testing**: Ensure proper ARIA labels and structure

## Section Integration Notes

### Data Dependencies
- **HeroSection**: Requires `HeroContent` from home data
- **AboutSection**: Needs both `AboutContent` and `Company` data
- **ServicesSection**: Uses `ServiceOverview` from home data
- **TestimonialsSection**: Requires `TestimonialsSection` data
- **ContactSection**: Uses `Contact` data with maps integration

### Layout Patterns
- **Alternating Backgrounds**: White and gray-50 for visual separation
- **Consistent Spacing**: 16 units (py-16) vertical padding
- **Max Width Container**: 7xl max-width with responsive padding
- **Grid Layouts**: Responsive 1-2 column grids for content

## Testing Checklist

- [ ] All sections render with proper data
- [ ] Responsive behavior works on all screen sizes
- [ ] Interactive elements (buttons, links) function correctly
- [ ] Google Maps iframe loads and displays properly
- [ ] Contact links (tel:, mailto:) work on mobile devices
- [ ] Images load with proper lazy loading
- [ ] Accessibility features work with screen readers
- [ ] Performance is optimized for loading speed