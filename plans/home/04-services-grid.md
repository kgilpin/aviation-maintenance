# Services Grid Plan

## Overview
Create a grid layout showcasing the five main service offerings with images, descriptions, and call-to-action buttons.

## Service Cards Structure

### 1. Flight Training
- **Image**: Aircraft cockpit or training scene
- **Heading**: "Flight Training"
- **Description**: "Take the next step in your aviation journey with our professional flight training programs. From student pilots to advanced certifications, our experienced instructors provide personalized lessons to help you achieve your goals."
- **CTA Button**: "Book a Lesson!" → `/flight-training`

### 2. Tours & Photography
- **Image**: Scenic aerial view
- **Heading**: "Tours & Photography"
- **Description**: "Discover the beauty of New England from the skies with our scenic flight tours. Capture breathtaking aerial photos of the coastline, cityscapes, and beyond with the help of our experienced pilots."
- **CTA Button**: "Book a Tour!" → `/scenic-tours`

### 3. Aircraft Rentals
- **Image**: Aircraft on tarmac or in hangar
- **Heading**: "Aircraft Rentals"
- **Description**: "Rent from our well-maintained fleet of aircraft for your next adventure. Whether you're training or flying solo, we offer a variety of planes to suit your needs."
- **CTA Button**: "Rent a Plane!" → `/aircraft-rentals`

### 4. FBO Services
- **Image**: Ground services or fuel truck
- **Heading**: "FBO Services"
- **Description**: "Experience top-tier FBO services with our range of offerings, including fueling, de-icing, and ground support. We ensure your aircraft is ready for takeoff with the highest standards of care."
- **CTA Button**: "Learn More!" → `/fbo-services`

### 5. Pilot Resources
- **Image**: Aviation tools, charts, or technology
- **Heading**: "Pilot Resources"
- **Description**: "Access essential tools and information for pilots, including the FAA website, weather updates, live ATC, and more. Stay informed and prepared for your next flight with our comprehensive resources."
- **CTA Button**: "Learn More!" → `/pilot-resources`

## Technical Implementation

### Layout Structure
- Alternating left-right image/text layout
- Responsive grid that stacks on mobile
- Each service as individual section with consistent styling

### Data Requirements
- `src/_data/services.json` containing:
  - Service titles and descriptions
  - Image paths and alt text
  - CTA button text and URLs
  - Service ordering

### Card Components
- Image with proper aspect ratio
- Text content area with consistent padding
- Styled CTA buttons with hover effects
- Responsive image handling

## Image Assets Required
Select appropriate images from copied assets:
- Training: Cockpit or instruction images
- Tours: Scenic/aerial photography
- Rentals: Aircraft exterior shots
- FBO: Ground services imagery
- Resources: Aviation technology/tools

## Styling Requirements
- Consistent card styling across all services
- Alternating layout (image-left, image-right pattern)
- Professional button styling
- Hover effects and transitions
- Mobile-responsive stacking
- Proper spacing and typography hierarchy

## Accessibility
- Descriptive alt text for all images
- Proper heading levels (H2 for service titles)
- Keyboard-navigable buttons
- Sufficient color contrast
- Screen reader friendly structure