# Footer Section Plan

## Overview
Create the site footer with company information, copyright, and essential links.

## Footer Structure

### Copyright Section
- **Company Copyright**: "© 2025, Eagle East Aviation"
- **Platform Credit**: "Powered by Shopify" (replace with appropriate credit)
- **Legal Links**: Privacy Policy link

### Additional Footer Elements (Future Enhancement)
- Contact information
- Social media links
- Additional navigation links
- Location/address information

## Technical Implementation

### Template Structure
- Footer component in base layout
- Centered content with proper spacing
- Responsive layout for mobile devices

### Data Requirements
- `src/_data/company.json` containing:
  - Company name
  - Current year (dynamic)
  - Copyright information

- `src/_data/legal.json` containing:
  - Privacy policy URL
  - Terms of service (if applicable)
  - Legal disclaimers

### Template Location
- `src/_includes/partials/footer.html`
- Included in base layout template
- Consistent across all pages

## Styling Requirements
- Subtle background color/gradient
- Smaller font size for copyright text
- Proper link styling and hover states
- Adequate padding and margins
- Mobile-responsive layout

## Content Strategy
- Keep footer minimal and professional
- Include only essential legal links
- Maintain brand consistency with header
- Consider adding more contact info in future

## Legal Considerations
- Current year in copyright (dynamic)
- Proper attribution for platform/tools
- Privacy policy link (required for forms)
- Terms of service (if applicable)

## Accessibility
- Proper semantic markup (footer element)
- Sufficient color contrast for small text
- Keyboard-accessible links
- Screen reader friendly structure

## Future Enhancements
- Contact information (phone, email, address)
- Social media icons and links
- Additional site navigation
- Newsletter signup
- Location map integration