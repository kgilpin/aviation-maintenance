# Flight Training Implementation Order

## Overview
Structured implementation plan for building the flight training page, prioritized by dependencies and logical development flow.

## Phase 1: Foundation (High Priority)

### 1. Data Structure ✓ COMPLETED
- ✓ `src/_data/instructors.json` - Instructor profiles
- ✓ `src/_data/aircraft.json` - Aircraft rates and discovery flight info

### 2. Layout Template Creation
- Create `src/_includes/layouts/flight-training.html`
- Extend base layout with flight training specific sections
- Implement basic HTML structure for all 4 main sections

### 3. Page Content File
- Create `src/pages/learn-to-fly.md`
- Configure front matter with proper layout and metadata
- Set up permalink structure

## Phase 2: Core Sections (High Priority)

### 4. Hero Section Implementation
- Full-width background image container
- Overlay text with page title
- Responsive typography and positioning

### 5. Instructors Section
- Loop through instructors data
- Implement alternating left/right layout
- Add instructor profile cards with images and bios

## Phase 3: Content Sections (Medium Priority)

### 6. Discovery Flight Section
- Two-column layout with image and text
- Integrate aircraft.json discovery flight data
- Implement responsive design

### 7. Flight Training Rates Section
- Green background section styling
- Three-column aircraft rate cards
- Loop through training_aircraft data

## Phase 4: Styling and Polish (Medium Priority)

### 8. CSS Implementation
- Add flight training specific styles to `src/css/style.css`
- Green brand color for rates section
- Alternating instructor layout classes
- Responsive breakpoints and mobile optimization

### 9. Navigation Integration
- Update `src/_data/navigation.json`
- Add flight training page to main menu
- Test navigation and active states

## Phase 5: Testing and Optimization (Low Priority)

### 10. Responsive Testing
- Test all breakpoints (mobile, tablet, desktop)
- Verify image loading and layout on different devices
- Check accessibility and semantic markup

### 11. Performance Optimization
- Implement lazy loading for instructor images
- Optimize image sizes and formats
- Test page load speed and Core Web Vitals

## Implementation Notes

### Development Environment
- Use `npm start` for live reload during development
- Test in multiple browsers and devices
- Validate HTML and accessibility compliance

### Dependencies
- Base layout template must exist
- Site navigation system in place
- CSS framework and responsive utilities
- Image assets confirmed in src/images/

### Success Criteria
- Page matches screenshot layout exactly
- All content from crawled site properly displayed
- Responsive design works across all devices
- Navigation integration complete
- Performance meets site standards