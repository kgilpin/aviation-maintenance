# Component Architecture for INTEGRAL Page

## Component Hierarchy

```
IntegralPage
├── Header (reused from site architecture)
├── HeroVideoSection
├── AircraftViewerSection
│   ├── ModelSwitcher
│   └── AircraftViewer360
├── FeaturesSection
│   └── FeatureCard (×4)
├── AvailabilityStatus
├── SpecificationsSection
│   └── SpecificationsTable
├── BenefitsSection
│   └── BenefitCard (×4)
├── ContactSection
├── TestimonialsSection
│   └── TestimonialCard (×2)
├── LegalDisclaimer
├── SidebarNavigation
└── Footer (reused from site architecture)
```

## Component Specifications

### 1. IntegralPage.tsx (Main Page Component)
**Location**: `src/pages/IntegralPage.tsx`
**Purpose**: Main page wrapper with SEO metadata and scroll behavior

```typescript
interface IntegralPageProps {
  // No props - gets data from custom hooks
}

export function IntegralPage(): JSX.Element
```

**Key Features**:
- React Helmet for SEO meta tags
- Smooth scroll behavior setup
- Page-level state management for active navigation
- Integration with custom hooks for data

**Dependencies**:
- `useIntegralData()` hook
- React Helmet Async
- All section components

---

### 2. HeroVideoSection.tsx
**Location**: `src/components/sections/HeroVideoSection.tsx`
**Purpose**: Full-screen video background with overlay content

```typescript
interface HeroVideoSectionProps {
  video: string;
  videoPoster: string;
  headline: string;
  certification: string;
}

export function HeroVideoSection(props: HeroVideoSectionProps): JSX.Element
```

**Key Features**:
- Auto-playing background video with controls
- Responsive video sizing
- Text overlay with proper contrast
- Loading states and error handling
- Accessibility considerations (motion preferences)

**Styling Requirements**:
- Full viewport height
- Dark overlay for text readability  
- Responsive typography
- Video controls positioned appropriately

---

### 3. AircraftViewerSection.tsx
**Location**: `src/components/sections/AircraftViewerSection.tsx`
**Purpose**: Container for model switcher and 360° viewer

```typescript
interface AircraftViewerSectionProps {
  models: AircraftModel[];
  defaultModelId?: string;
}

export function AircraftViewerSection(props: AircraftViewerSectionProps): JSX.Element
```

**Key Features**:
- Active model state management
- Integration between switcher and viewer
- Loading states for 360° image sequences
- Error handling for missing assets

---

### 4. ModelSwitcher.tsx
**Location**: `src/components/ui/ModelSwitcher.tsx`
**Purpose**: Toggle between INTEGRAL R/S/E variants

```typescript
interface ModelSwitcherProps {
  models: AircraftModel[];
  activeModelId: string;
  onModelChange: (modelId: string) => void;
}

export function ModelSwitcher(props: ModelSwitcherProps): JSX.Element
```

**Key Features**:
- Tab-style interface with model logos
- Active state styling
- Keyboard navigation support
- Disabled states for unavailable models

**Styling Requirements**:
- Logo display with proper sizing
- Active/inactive state indicators
- Hover effects
- Mobile-responsive layout

---

### 5. AircraftViewer360.tsx
**Location**: `src/components/ui/AircraftViewer360.tsx`
**Purpose**: Interactive 360° aircraft viewer

```typescript
interface AircraftViewer360Props {
  images: string[];
  model: AircraftModel;
  autoRotate?: boolean;
  controls?: boolean;
}

export function AircraftViewer360(props: AircraftViewer360Props): JSX.Element
```

**Key Features**:
- Drag/swipe to rotate aircraft
- Auto-rotation mode
- Touch/mouse event handling
- Image preloading and caching
- Progress indicator during loading
- Fallback for reduced motion preferences

**Technical Considerations**:
- Smooth animation between frames
- Performance optimization for 70+ images
- Memory management for image sequences
- Responsive sizing

---

### 6. FeaturesSection.tsx
**Location**: `src/components/sections/FeaturesSection.tsx`
**Purpose**: Container for expandable feature cards

```typescript
interface FeaturesSectionProps {
  features: FeatureCard[];
}

export function FeaturesSection(props: FeaturesSectionProps): JSX.Element
```

**Key Features**:
- Grid layout for feature cards
- Responsive breakpoints
- Animation coordination

---

### 7. FeatureCard.tsx
**Location**: `src/components/ui/FeatureCard.tsx`
**Purpose**: Expandable card with icon, title, and details

```typescript
interface FeatureCardProps {
  feature: FeatureCard;
  isExpanded?: boolean;
  onToggle?: () => void;
}

export function FeatureCard(props: FeatureCardProps): JSX.Element
```

**Key Features**:
- Expandable/collapsible content
- Icon display with proper sizing
- Smooth expand/collapse animations
- Keyboard accessibility
- ARIA attributes for screen readers

**Styling Requirements**:
- Card design with hover effects
- Icon integration
- Smooth transitions
- Mobile-responsive layout

---

### 8. SpecificationsSection.tsx
**Location**: `src/components/sections/SpecificationsSection.tsx`
**Purpose**: Technical specifications with background image

```typescript
interface SpecificationsSectionProps {
  specifications: TechnicalSpecification[];
  backgroundImage: string;
}

export function SpecificationsSection(props: SpecificationsSectionProps): JSX.Element
```

**Key Features**:
- Background image with overlay
- Two-column layout on desktop
- Single column on mobile
- Proper text contrast

---

### 9. SpecificationsTable.tsx
**Location**: `src/components/ui/SpecificationsTable.tsx`
**Purpose**: Structured display of technical data

```typescript
interface SpecificationsTableProps {
  specifications: TechnicalSpecification[];
}

export function SpecificationsTable(props: SpecificationsTableProps): JSX.Element
```

**Key Features**:
- Categorized specification display
- Responsive table layout
- Unit handling and formatting
- Accessibility for screen readers

---

### 10. BenefitsSection.tsx
**Location**: `src/components/sections/BenefitsSection.tsx`
**Purpose**: Product benefits grid

```typescript
interface BenefitsSectionProps {
  benefits: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
}

export function BenefitsSection(props: BenefitsSectionProps): JSX.Element
```

**Key Features**:
- 2x2 grid layout
- Icon and text integration
- Responsive design

---

### 11. TestimonialsSection.tsx
**Location**: `src/components/sections/TestimonialsSection.tsx`
**Purpose**: Customer testimonials display

```typescript
interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection(props: TestimonialsSectionProps): JSX.Element
```

**Key Features**:
- Two-column layout
- Company logo integration
- Quote formatting
- Author attribution

---

### 12. TestimonialCard.tsx
**Location**: `src/components/ui/TestimonialCard.tsx`
**Purpose**: Individual testimonial display

```typescript
interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard(props: TestimonialCardProps): JSX.Element
```

**Key Features**:
- Company logo display
- Quote and author formatting
- Professional styling

---

### 13. SidebarNavigation.tsx
**Location**: `src/components/layout/SidebarNavigation.tsx`
**Purpose**: Fixed sidebar with smooth scroll navigation

```typescript
interface SidebarNavigationProps {
  navigationItems: Array<{
    id: string;
    label: string;
    target: string;
  }>;
  activeSection?: string;
}

export function SidebarNavigation(props: SidebarNavigationProps): JSX.Element
```

**Key Features**:
- Fixed positioning
- Active section highlighting
- Smooth scroll behavior
- Mobile hamburger menu fallback
- Intersection Observer for active states

---

### 14. ContactSection.tsx
**Location**: `src/components/sections/ContactSection.tsx`
**Purpose**: Call-to-action for product inquiries

```typescript
interface ContactSectionProps {
  icon: string;
  message: string;
  link: string;
}

export function ContactSection(props: ContactSectionProps): JSX.Element
```

**Key Features**:
- Icon and message display
- Link to contact page
- Consistent styling with site theme

---

### 15. AvailabilityStatus.tsx
**Location**: `src/components/ui/AvailabilityStatus.tsx`
**Purpose**: Simple status indicator

```typescript
interface AvailabilityStatusProps {
  status: string;
  className?: string;
}

export function AvailabilityStatus(props: AvailabilityStatusProps): JSX.Element
```

**Key Features**:
- Status badge styling
- Color coding for different statuses
- Accessibility considerations

## Reusable UI Components

These components should be designed for reuse across the site:

- **Button** - Consistent button styling
- **Card** - Base card component
- **Icon** - SVG icon wrapper with sizing
- **Image** - Optimized image component with lazy loading
- **Section** - Layout wrapper with consistent spacing

## Styling Approach

- **Tailwind CSS** - Utility-first styling
- **Component-scoped styles** - When Tailwind utilities aren't sufficient
- **CSS Variables** - For theme consistency
- **Responsive design** - Mobile-first approach
- **Dark theme** - Consistent with site design

## Accessibility Requirements

- **ARIA labels** - For all interactive elements
- **Keyboard navigation** - Full keyboard support
- **Screen reader support** - Meaningful descriptions
- **Focus management** - Visible focus indicators
- **Motion preferences** - Respect reduced motion settings
- **Color contrast** - WCAG AA compliance

## Performance Considerations

- **Code splitting** - Route-level and component-level
- **Lazy loading** - Images and 360° sequences
- **Image optimization** - Multiple formats and sizes
- **Caching** - Efficient asset caching strategies
- **Bundle analysis** - Monitor component impact on bundle size