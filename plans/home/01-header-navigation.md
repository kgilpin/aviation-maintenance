# Header and Navigation Plan

## Overview
Create the main site header with logo and navigation menu based on Eagle East Aviation's original design.

## Components Needed

### Header Structure
- Company logo (Eagle_East_Logo-removebg-preview_v=1740512149&width=600.png)
- Main navigation menu
- Mobile hamburger menu

### Navigation Items
1. **Home** - `/` (current page)
2. **Flight Training** - `/flight-training`
3. **FBO Services** - `/fbo-services` 
4. **Aircraft Rentals** - `/aircraft-rentals`
5. **Scenic Tours & Photography** - `/scenic-tours`
6. **Pilot Resources** - `/pilot-resources`
7. **The Lounge** - `/lounge`
8. **Contact Us** - `/contact`

## Technical Implementation

### Template Files
- Create `src/_includes/partials/header.html` with:
  - Site logo linked to home
  - Responsive navigation menu
  - Mobile-friendly hamburger menu

### Data Files
- `src/_data/navigation.json` - Navigation structure and URLs
- `src/_data/company.json` - Company name and logo path

### Styling Requirements
- Logo sizing and positioning
- Navigation menu styling (desktop and mobile)
- Responsive breakpoints for mobile menu
- Proper focus states for accessibility

## Assets Required
- Logo image: `Eagle_East_Logo-removebg-preview_v=1740512149&width=600.png` (already copied to src/images)

## Dependencies
- Base layout template
- CSS for responsive navigation
- JavaScript for mobile menu toggle (if needed)