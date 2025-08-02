# FBO Services Page Content

## Overview
Define the page content file structure and front matter configuration for the FBO services page.

## Page File Structure
**File**: `src/fbo-services.md`

### Front Matter Configuration
```yaml
---
layout: layouts/fbo-services.html
title: "FBO Services at Eagle East Aviation"
description: "Experience premium FBO services with Eagle East Aviation. Our dedicated ground team provides top-tier solutions tailored to your needs. From private charters and aircraft management to concierge and hospitality services, we ensure a seamless and luxurious aviation experience."
permalink: /fbo-services/
---
```

## SEO and Meta Tags
- **Page Title**: "FBO Services at Eagle East Aviation"
- **Meta Description**: Focus on premium services, ground team, and comprehensive FBO offerings
- **Open Graph**: Professional FBO service imagery
- **Keywords**: FBO services, aviation fuel, jet services, aircraft ground support
- **Canonical URL**: `/fbo-services/`

## Content Organization
1. **Minimal Markdown Content**: Since template contains static content
2. **Future Data Migration**: Plan for eventual move to JSON data files
3. **SEO Content**: Brief introductory content for search engines

## Navigation Integration
- **Menu Item**: "FBO Services" (already exists)
- **Active State**: Highlight when on FBO services page
- **URL Consistency**: Match navigation.json URL structure
- **Breadcrumbs**: Consider for future enhancement

## Content Hierarchy
```
H1: FBO Services at Eagle East Aviation (Hero)
├── H2: Fueling & Oil Services
├── H2: Titan Fuel (Partnership subsection)
├── H2: Jet Services  
└── H2: Lounge & Concierge
```

## Future Content Management
- **Data Files**: Consider moving to `src/_data/fbo-services.json`
- **Images**: Reference existing media.json for image management
- **Testimonials**: Potential integration of FBO-specific testimonials
- **Pricing**: Future addition of service pricing information

## Content Standards
- **Professional Tone**: Premium service provider positioning
- **Trust Building**: Emphasis on safety, reliability, and quality
- **Service Focus**: Clear benefit-driven descriptions
- **Call to Action**: Encourage contact for service inquiries