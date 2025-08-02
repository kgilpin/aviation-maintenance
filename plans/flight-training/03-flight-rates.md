# Flight Training Rates Section Plan

## Overview
Create the Flight Training Rates section with distinctive green background and three-column aircraft pricing layout.

## Components Needed

### Section Structure
- **Background**: Eagle East Aviation green brand color
- **Title**: "Flight Training Rates" in white text
- **Layout**: Three-column grid for aircraft types
- **Content**: Aircraft specifications and pricing

### Aircraft Cards
Each card contains:
- **Aircraft Name**: Cessna 150, Cessna 152, Piper Cherokee
- **Engine Specs**: Horsepower rating
- **Solo Rate**: Per-hour cost for solo flight
- **Instructor Rate**: Per-hour cost for instruction

## Technical Implementation

### Template Structure
- Full-width section with green background
- Centered content container
- CSS Grid or Flexbox for three-column layout
- Responsive design for mobile stacking

### Data Source
- Content from `aircraft.json` > `training_aircraft` array
- Loop through aircraft data
- Dynamic card generation

### Styling Requirements
- **Background**: Eagle East Aviation brand green
- **Text Color**: White for contrast
- **Layout**: Three equal-width columns on desktop
- **Mobile**: Single column stack
- **Typography**: Clear hierarchy for aircraft names, specs, and rates
- **Spacing**: Consistent padding and margins

## Responsive Behavior
- Desktop: 3 columns side-by-side
- Tablet: 2-1 column layout or stack
- Mobile: Single column stack