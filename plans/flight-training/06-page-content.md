# Flight Training Page Content Plan

## Overview
Create the main content file that will use the flight training layout template and render the complete page.

## File Structure

### Location
`src/pages/learn-to-fly.md`

### Front Matter Configuration
```yaml
---
layout: layouts/flight-training.html
title: "Pilot Training with Eagle East Aviation"
description: "Take to the skies and experience the thrill of flight with Eagle East Aviation. Whether you're looking to earn your pilot's license under Part 61, refine your skills, or enjoy a scenic flight, we offer top-quality instruction and aircraft rental."
permalink: /pages/learn-to-fly-with-eagle-east-aviation/
---
```

### Content Strategy
- Minimal markdown content in the file itself
- Most content pulled from data files (instructors.json, aircraft.json)
- Focus on template-driven content generation
- SEO-optimized meta information

## Page Routing

### URL Structure
- **Primary URL**: `/pages/learn-to-fly-with-eagle-east-aviation/`
- **Alternative**: `/learn-to-fly/` (shorter, SEO-friendly)
- **Matches**: Original site URL structure for consistency

### Navigation Integration
- Add to main site navigation menu
- Update `navigation.json` to include flight training link
- Ensure proper active state handling

## SEO Considerations

### Meta Information
- **Title**: Matches original site title exactly
- **Description**: Compelling meta description for search engines
- **Keywords**: Flight training, pilot instruction, aviation, Massachusetts
- **Open Graph**: Image and social media optimization

### Content Structure
- Proper heading hierarchy (H1, H2, H3)
- Structured data for business information
- Alt text for all images
- Semantic HTML markup

## Dependencies

### Required Files
- `layouts/flight-training.html` template
- `instructors.json` data file ✓ (completed)
- `aircraft.json` data file ✓ (completed)
- Instructor photo assets
- Hero and discovery flight images

### Navigation Updates
- Update `src/_data/navigation.json`
- Add flight training menu item
- Configure URL and display name