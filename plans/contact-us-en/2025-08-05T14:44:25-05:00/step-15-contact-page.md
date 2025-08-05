# Step 15: Create Contact Page Component

## Objective
Create the main ContactUsPage component that serves as the page wrapper and integrates with the routing system.

## Actions Required

### 15.1 Create Contact Us Page Component
Create `src/pages/ContactUsPage.tsx`:

```typescript
import React from 'react';
import ContactSection from '@/components/sections/ContactSection';

const ContactUsPage: React.FC = () => {
  return <ContactSection />;
};

export default ContactUsPage;
```

### 15.2 Create Contact Success Page Component
Create `src/pages/ContactSuccessPage.tsx`:

```typescript
import React from 'react';
import ContactSuccess from '@/components/sections/ContactSuccess';

const ContactSuccessPage: React.FC = () => {
  return <ContactSuccess />;
};

export default ContactSuccessPage;
```

### 15.3 Update App.tsx with Routes
Update `src/App.tsx` to include the contact pages:

```typescript
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ContactUsPage from '@/pages/ContactUsPage';
import ContactSuccessPage from '@/pages/ContactSuccessPage';
import { useNavigationData } from '@/hooks/useNavigationData';
import { useCompanyData } from '@/hooks/useCompanyData';

function App() {
  const { navigation } = useNavigationData();
  const { company } = useCompanyData();

  return (
    <HelmetProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<div>Home Page Placeholder</div>} />
            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="/contact-us/thank-you" element={<ContactSuccessPage />} />
            {/* Add other routes as needed */}
          </Routes>
        </Layout>
      </Router>
    </HelmetProvider>
  );
}

export default App;
```

### 15.4 Create Home Page Placeholder (Temporary)
Create `src/pages/HomePage.tsx` as a temporary placeholder:

```typescript
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';
import { useCompanyData } from '@/hooks/useCompanyData';

const HomePage: React.FC = () => {
  const { company } = useCompanyData();

  return (
    <>
      <Helmet>
        <title>{company?.seo.defaultTitle}</title>
        <meta name="description" content={company?.seo.defaultDescription} />
        <meta name="keywords" content={company?.seo.keywords.join(', ')} />
      </Helmet>

      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {company?.fullName}
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {company?.description}
          </p>

          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Button variant="primary" size="lg">
              <Link to="/aircraft">Explore Aircraft</Link>
            </Button>
            
            <Button variant="outline" size="lg">
              <Link to="/contact-us">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
```

### 15.5 Update App.tsx with Home Page
Update `src/App.tsx` to include the home page:

```typescript
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import HomePage from '@/pages/HomePage';
import ContactUsPage from '@/pages/ContactUsPage';
import ContactSuccessPage from '@/pages/ContactSuccessPage';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="/contact-us/thank-you" element={<ContactSuccessPage />} />
            {/* Placeholder routes for future pages */}
            <Route path="/aircraft" element={<div className="py-20 text-center"><h1 className="text-2xl">Aircraft Page - Coming Soon</h1></div>} />
            <Route path="/media" element={<div className="py-20 text-center"><h1 className="text-2xl">Media Page - Coming Soon</h1></div>} />
            <Route path="/eco-responsibility" element={<div className="py-20 text-center"><h1 className="text-2xl">Eco-Responsibility Page - Coming Soon</h1></div>} />
            <Route path="/join-us" element={<div className="py-20 text-center"><h1 className="text-2xl">Join Us Page - Coming Soon</h1></div>} />
            <Route path="/privacy-policy" element={<div className="py-20 text-center"><h1 className="text-2xl">Privacy Policy - Coming Soon</h1></div>} />
            <Route path="*" element={<div className="py-20 text-center"><h1 className="text-2xl">Page Not Found</h1></div>} />
          </Routes>
        </Layout>
      </Router>
    </HelmetProvider>
  );
}

export default App;
```

## Page Architecture Strategy

### 1. Page Components as Wrappers
- **Minimal Logic:** Page components serve as thin wrappers
- **Section Composition:** Complex logic resides in section components
- **Route Integration:** Direct mapping to React Router routes
- **SEO Ready:** Each page can add specific meta tags

### 2. Route Organization
- **Clear URLs:** `/contact-us` for main form, `/contact-us/thank-you` for success
- **Future Ready:** Placeholder routes for upcoming pages
- **404 Handling:** Catch-all route for undefined paths
- **Nested Routing:** Support for complex page hierarchies

### 3. Data Flow
- **Context Providers:** Layout provides data to all child pages
- **Custom Hooks:** Pages consume data through custom hooks
- **Loading States:** Handled at the section level
- **Error Boundaries:** Can be added at page level if needed

## Navigation Integration

### Active Link Highlighting
The header component will automatically highlight the current page based on the route:
- `/contact-us` will highlight "Contact Us" in navigation
- Breadcrumbs will show current page location
- Mobile menu will close after navigation

### User Flow
1. **Entry Points:** Users can access contact from navigation, home page CTA, or direct URL
2. **Form Completion:** Users fill out and submit the contact form
3. **Success Feedback:** Users are redirected to thank you page
4. **Return Navigation:** Users can return to home or contact form

## SEO Optimization

### Meta Tags
- Dynamic title tags using React Helmet
- Page-specific descriptions and keywords
- Open Graph tags for social sharing
- Canonical URLs for search engines

### Structured Data
- Company information in JSON-LD format
- Contact page structured data
- Breadcrumb navigation markup
- Form accessibility enhancements

## Performance Considerations

### Code Splitting
- Page-level components are natural split points
- Contact form only loads when needed
- Success page only loads after form submission
- Shared components loaded with main bundle

### Lazy Loading
Future enhancement opportunity:
```typescript
const ContactUsPage = lazy(() => import('@/pages/ContactUsPage'));
const ContactSuccessPage = lazy(() => import('@/pages/ContactSuccessPage'));
```

### Bundle Optimization
- Tree shaking eliminates unused code
- Component-level imports reduce bundle size
- Data hooks share common utilities
- Static assets optimized by Vite

## Deliverables
- `src/pages/ContactUsPage.tsx` - Contact page wrapper
- `src/pages/ContactSuccessPage.tsx` - Thank you page wrapper
- `src/pages/HomePage.tsx` - Home page placeholder
- Updated `src/App.tsx` with complete routing
- SEO-optimized page structure
- Navigation integration ready

## Next Step
Proceed to Step 16: Create Custom Hooks