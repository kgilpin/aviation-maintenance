# Meet Our Instructors Section Plan

## Overview
Create the instructors showcase section with alternating image/text layouts for each of the 6 flight instructors.

## Components Needed

### Section Structure
- **Title**: "Meet Our Instructors" centered above instructor profiles
- **Layout**: Alternating left/right image and text arrangement
- **Instructor Count**: 6 total instructor profiles

### Instructor Profile Structure
Each profile contains:
- **Photo**: Professional instructor headshot or action shot
- **Credentials**: Title and certifications (CFI, CFII, MEI)
- **Name**: Instructor full name
- **Biography**: Detailed background and specialties
- **Layout Pattern**: Alternating image-left/text-right, then image-right/text-left

### Alternating Pattern
1. **Tim Campbell** - Image left, text right
2. **Alex Hoff** - Image right, text left  
3. **Liam Foley** - Image left, text right
4. **Nate Fanara** - Image right, text left
5. **Sam Gregson** - Image left, text right
6. **Nathan Underwood** - Image right, text left

## Technical Implementation

### Template Structure
- Section container with centered title
- Loop through instructors array with alternating layout class
- Responsive two-column grid for each instructor
- Image containers with consistent aspect ratios
- Text content with structured typography

### Data Source
- Content from `instructors.json` > `instructors` array
- Loop with index to determine left/right alternation
- Image paths, names, titles, and descriptions

### Layout Logic
```nunjucks
{% for instructor in instructors.instructors %}
  {% set isEven = loop.index0 % 2 == 0 %}
  <div class="instructor-profile {% if not isEven %}instructor-reverse{% endif %}">
    <!-- Image and text containers -->
  </div>
{% endfor %}
```

## Styling Requirements

### Layout
- **Desktop**: Side-by-side image and text (50/50 split)
- **Mobile**: Stacked layout (image above text)
- **Alternation**: CSS class to reverse order on odd entries

### Typography
- **Name**: Large, prominent heading
- **Title/Credentials**: Smaller subtitle with certifications
- **Biography**: Body text with bold emphasis rendering
- **Consistent**: Spacing and font hierarchy

### Images
- **Aspect Ratio**: Consistent sizing across all instructor photos
- **Quality**: Professional headshots and action shots
- **Responsive**: Scale appropriately on all devices

## Assets Required
- 6 instructor photos (already identified in instructors.json)
- Images need to be copied from crawled content to src/images/