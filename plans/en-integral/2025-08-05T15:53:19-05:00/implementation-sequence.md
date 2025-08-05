# INTEGRAL Page Implementation Sequence

## Phase 1: Foundation Setup (1-2 days)

### Step 1.1: Data Structure Implementation
**Files to Create/Update:**
- `src/data/types.ts` - Add INTEGRAL-specific interfaces
- `src/data/integral.json` - Main page content
- `src/data/aircraftModels.json` - Aircraft variant data
- `src/data/integralFeatures.json` - Feature cards data
- `src/data/integralSpecifications.json` - Technical specifications
- `src/data/integralTestimonials.json` - Customer testimonials
- `src/data/integralBenefits.json` - Product benefits

**Content Source:**
Extract text content from:
- `/crawl/aura-aero.com/en/integral/index.html` (lines 150-800 for main content)

**Validation:**
- TypeScript interfaces compile without errors
- JSON files validate against schemas
- All required content fields populated

### Step 1.2: Custom Hooks Setup
**Files to Create:**
- `src/hooks/useIntegralData.ts`
- `src/hooks/useAircraftModels.ts`
- `src/hooks/useIntegralSpecifications.ts`

**Implementation Notes:**
- Follow existing hook patterns in the codebase
- Add proper TypeScript typing
- Include error handling and loading states

### Step 1.3: Asset Organization
**Tasks:**
- Create directory structure: `src/assets/images/integral/`
- Copy relevant images from crawl: `/crawl/aura-aero.com/wp-content/uploads/`
- Organize 360° images: Extract all `IntegralRX2_*.png` files
- Optimize images: Convert to WebP where appropriate
- Create placeholder images for missing assets

**Asset Checklist:**
- [ ] Hero video: `INTEGRAL-WEB-1.mp4`
- [ ] 360° sequence: 70 `IntegralRX2_*.png` files
- [ ] Model logos: `integral-r-logo.png`, `integral-s-logo.png`, `integral-e-1.png`
- [ ] Feature icons: `seat.svg`, `weight.svg`, `shield-check.svg`, `certification.svg`
- [ ] Background: `INTEGRAL-R-HANGAR-DARK_Website.png`
- [ ] Testimonial logos: `midi-pyrenees-voltige.jpg`, `aero-club-chateauroux.jpg`

## Phase 2: Page Structure (1 day)

### Step 2.1: Main Page Component
**File to Create:** `src/pages/IntegralPage.tsx`

**Implementation:**
```typescript
export function IntegralPage() {
  const integralData = useIntegralData();
  
  return (
    <>
      <Helmet>
        <title>{integralData.meta.title}</title>
        <meta name="description" content={integralData.meta.description} />
      </Helmet>
      
      <div className="integral-page">
        {/* Section components will be added in next phases */}
      </div>
    </>
  );
}
```

### Step 2.2: Routing Integration
**File to Update:** `src/App.tsx`

Add route for `/en/integral` page:
```typescript
<Route path="/en/integral" element={<IntegralPage />} />
```

### Step 2.3: Basic Layout Structure
**Files to Create:**
- Placeholder components for each major section
- Basic CSS classes for layout structure
- Mobile-first responsive breakpoints

## Phase 3: Hero Section (1 day)

### Step 3.1: HeroVideoSection Component
**File to Create:** `src/components/sections/HeroVideoSection.tsx`

**Implementation Priority:**
1. Video background with poster image
2. Text overlay with proper contrast
3. Responsive video sizing
4. Auto-play with user controls
5. Accessibility (motion preferences)

**Content Source:**
- Video file: `/crawl/aura-aero.com/wp-content/themes/template/assets/videos/INTEGRAL-WEB-1.mp4`
- Text content from `integral.json`

### Step 3.2: Video Optimization
**Tasks:**
- Multiple video formats (MP4, WebM)
- Compressed versions for mobile
- Poster image generation
- Lazy loading implementation

## Phase 4: Aircraft Viewer (2-3 days)

### Step 4.1: ModelSwitcher Component
**File to Create:** `src/components/ui/ModelSwitcher.tsx`

**Features:**
- Tab interface with model logos
- Active state management
- Keyboard navigation
- Disabled states for incomplete models

### Step 4.2: AircraftViewer360 Component
**File to Create:** `src/components/ui/AircraftViewer360.tsx`

**Implementation Approach:**
1. **Phase 4.2a: Basic Image Display**
   - Static image display
   - Image preloading
   - Loading states

2. **Phase 4.2b: Simple Carousel**
   - Click/tap to advance frames
   - Previous/next controls
   - Frame counter

3. **Phase 4.2c: Drag Interaction**
   - Mouse drag to rotate
   - Touch swipe support
   - Smooth transitions

4. **Phase 4.2d: Auto-rotation**
   - Optional auto-play mode
   - Pause on interaction
   - Control buttons

**Content Source:**
- 360° images: `/crawl/aura-aero.com/wp-content/uploads/*/IntegralRX2_*.png`

### Step 4.3: Integration Testing
- Model switching updates viewer
- Responsive behavior on all devices
- Performance with 70 images
- Memory usage optimization

## Phase 5: Content Sections (2 days)

### Step 5.1: FeaturesSection & FeatureCard
**Files to Create:**
- `src/components/sections/FeaturesSection.tsx`
- `src/components/ui/FeatureCard.tsx`

**Features:**
- Expandable cards with animations
- Icon integration
- Grid layout (2x2 on desktop, 1x4 on mobile)
- Accessibility for screen readers

**Content Source:**
- Feature data from `/crawl/aura-aero.com/en/integral/index.html` (feature cards section)

### Step 5.2: SpecificationsSection & Table
**Files to Create:**
- `src/components/sections/SpecificationsSection.tsx`
- `src/components/ui/SpecificationsTable.tsx`

**Features:**
- Background image with text overlay
- Two-column responsive layout
- Structured data display
- Unit formatting

**Content Source:**
- Technical specs from crawled content
- Background: `INTEGRAL-R-HANGAR-DARK_Website.png`

### Step 5.3: BenefitsSection
**File to Create:** `src/components/sections/BenefitsSection.tsx`

**Features:**
- 2x2 grid layout
- Icon and text cards
- Hover effects

## Phase 6: Supporting Sections (1 day)

### Step 6.1: TestimonialsSection
**Files to Create:**
- `src/components/sections/TestimonialsSection.tsx`
- `src/components/ui/TestimonialCard.tsx`

**Features:**
- Company logo display
- Quote formatting
- Author attribution
- Two-column layout

### Step 6.2: ContactSection & AvailabilityStatus
**Files to Create:**
- `src/components/sections/ContactSection.tsx`
- `src/components/ui/AvailabilityStatus.tsx`

**Features:**
- Call-to-action styling
- Status badge
- Link integration

## Phase 7: Navigation (1 day)

### Step 7.1: SidebarNavigation Component
**File to Create:** `src/components/layout/SidebarNavigation.tsx`

**Features:**
- Fixed positioning
- Smooth scroll behavior
- Active section highlighting
- Mobile hamburger menu integration
- Intersection Observer for section detection

### Step 7.2: Scroll Behavior
**Implementation:**
- Install `react-router-hash-link` or similar
- Implement smooth scrolling
- Update active navigation states
- Handle browser back/forward navigation

## Phase 8: Responsive Design (1-2 days)

### Step 8.1: Mobile Optimization
**Tasks for Each Component:**
- Test on mobile devices (375px, 414px widths)
- Adjust layouts for small screens
- Optimize touch interactions
- Ensure readable text sizes

### Step 8.2: Tablet Optimization
**Tasks:**
- Test on tablet sizes (768px, 1024px)
- Adjust grid layouts
- Optimize spacing and sizing

### Step 8.3: Desktop Refinement
**Tasks:**
- Test on large screens (1440px, 1920px+)
- Ensure maximum widths are appropriate
- Optimize for wide screens

## Phase 9: Performance Optimization (1 day)

### Step 9.1: Image Optimization
**Tasks:**
- Implement lazy loading for 360° images
- Add WebP/AVIF format support
- Optimize image sizes for different viewports
- Implement progressive loading

### Step 9.2: Code Splitting
**Tasks:**
- Route-level code splitting
- Component-level splitting for large components
- Dynamic imports for 360° viewer

### Step 9.3: Bundle Analysis
**Tasks:**
- Run bundle analyzer
- Identify large dependencies
- Optimize imports
- Monitor performance metrics

## Phase 10: Accessibility & Testing (1 day)

### Step 10.1: Accessibility Audit
**Tasks:**
- Add ARIA labels to interactive elements
- Ensure keyboard navigation works
- Test with screen readers
- Verify color contrast ratios
- Add focus indicators

### Step 10.2: Cross-browser Testing
**Browsers to Test:**
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

### Step 10.3: Performance Testing
**Metrics to Verify:**
- First Contentful Paint < 2s
- Largest Contentful Paint < 3s
- Cumulative Layout Shift < 0.1
- Time to Interactive < 3s

## Phase 11: Integration & Polish (1 day)

### Step 11.1: Site Integration
**Tasks:**
- Update main navigation to include INTEGRAL page
- Ensure consistent styling with site theme
- Test navigation flows
- Update sitemap and meta tags

### Step 11.2: Content Review
**Tasks:**
- Verify all text content matches original
- Check image quality and optimization
- Validate all links work correctly
- Proofread for typos

### Step 11.3: Final Testing
**Tasks:**
- End-to-end testing of all features
- Mobile device testing
- Performance validation
- Accessibility final check

## Success Criteria

Each phase should meet these criteria before proceeding:

1. **Functional Requirements:**
   - All interactive elements work as expected
   - Content displays correctly
   - Navigation functions properly

2. **Visual Requirements:**
   - Matches original design >= 95%
   - Responsive on all target devices
   - Consistent with site branding

3. **Performance Requirements:**
   - Page loads in < 3 seconds on 3G
   - Images load progressively
   - No layout shifts during load

4. **Accessibility Requirements:**
   - WCAG 2.1 AA compliance
   - Keyboard navigation works
   - Screen reader compatible

5. **Code Quality:**
   - TypeScript errors resolved
   - Consistent code style
   - Proper error handling
   - Comprehensive comments

## Risk Mitigation

**High-Risk Items:**
1. **360° Viewer Performance** - Start with simple carousel, enhance progressively
2. **Video Loading** - Provide fallback poster images and multiple formats
3. **Large Asset Sizes** - Implement aggressive lazy loading and compression

**Contingency Plans:**
- If 360° viewer is too complex, fall back to static image gallery
- If video causes performance issues, use static hero image
- If assets are too large, create optimized versions with quality trade-offs

## Dependencies

**External Libraries Needed:**
- React Helmet Async (SEO)
- Intersection Observer API polyfill
- Optional: react-spring (animations)
- Optional: react-use-gesture (360° interactions)

**Asset Requirements:**
- All images optimized and in correct formats
- Video files in multiple formats
- SVG icons properly formatted
- Fonts loaded (if custom fonts used)

This implementation sequence ensures a systematic approach to building the INTEGRAL page while maintaining code quality and performance standards.