# JSON Data Files Creation

**Files:** `src/data/*.json`  
**Purpose:** Extract and structure content from crawled Yankee Aviation website  
**Priority:** High (Foundation)  
**Dependencies:** 01-typescript-interfaces.md

## Overview

This step extracts all content from the crawled Yankee Aviation website and structures it into JSON files that match the TypeScript interfaces. This approach separates content from components, enabling easy updates and maintenance.

## File 1: Company Information (`src/data/company.json`)

```json
{
  "name": "Yankee Aviation",
  "establishedYear": 1977,
  "yearsInBusiness": 44,
  "owners": ["Peter Conner", "Gail Conner"],
  "businessType": "Full-service general aviation maintenance facility",
  "description": "Yankee Aviation in Plymouth, Massachusetts is a full-service general aviation maintenance facility. For more than 44 years, we have been meeting the needs of various clients.",
  "location": {
    "facility": "Plymouth Municipal Airport",
    "address": "246 South Meadow Road, Gate 3",
    "city": "Plymouth",
    "state": "MA",
    "zipCode": "02360",
    "airport": "Plymouth Municipal Airport"
  },
  "specialties": [
    "Aircraft maintenance services",
    "Special flight permits for US-registered aircraft",
    "Recurrent standard airworthiness certificates",
    "Full-service general aviation maintenance"
  ]
}
```

## File 2: Contact Information (`src/data/contact.json`)

```json
{
  "phone": "(508) 746-5511",
  "email": "yankeeaviation1@gmail.com",
  "address": {
    "street": "246 South Meadow Road",
    "gate": "Gate 3",
    "facility": "Plymouth Municipal Airport",
    "city": "Plymouth",
    "state": "MA",
    "zipCode": "02360"
  },
  "hours": {
    "monday": "8:00 AM - 4:30 PM",
    "tuesday": "8:00 AM - 4:30 PM",
    "wednesday": "8:00 AM - 4:30 PM",
    "thursday": "8:00 AM - 4:30 PM",
    "friday": "8:00 AM - 4:30 PM",
    "saturday": "8:00 AM - 4:30 PM",
    "sunday": "Closed"
  },
  "googleMaps": {
    "embedUrl": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2945.8...", 
    "coordinates": {
      "lat": 41.9090,
      "lng": -70.7288
    }
  }
}
```

## File 3: Navigation Structure (`src/data/navigation.json`)

```json
{
  "primary": [
    {
      "label": "Home",
      "path": "/",
      "isActive": true
    },
    {
      "label": "About",
      "path": "/about"
    },
    {
      "label": "Services", 
      "path": "/services"
    },
    {
      "label": "Contact",
      "path": "/contact"
    }
  ],
  "mobile": {
    "enabled": true,
    "breakpoint": "md"
  }
}
```

## File 4: Home Page Content (`src/data/home.json`)

```json
{
  "hero": {
    "primaryHeading": "The Leader",
    "secondaryHeading": "YANKEE AVIATION SERVICES",
    "description": "For more than 44 years, Yankee Aviation in Plymouth, MA has been offering a wide range of aircraft maintenance services.",
    "callToAction": {
      "text": "Contact Us Today",
      "link": "/contact"
    },
    "backgroundImage": "/images/hero-background.jpg"
  },
  "about": {
    "heading": "Who We Are",
    "description": [
      "Yankee Aviation in Plymouth, Massachusetts is a full-service general aviation maintenance facility.",
      "For more than 44 years, we have been meeting the needs of various clients.",
      "Established in 1977, we are owned by Peter and Gail Conner.",
      "Located off Route 3 in historic Plymouth, we are 45 minutes by car from Boston and Cape Cod."
    ],
    "highlights": [
      "44+ years of experience",
      "Family-owned and operated since 1977",
      "Convenient location between Boston and Cape Cod",
      "Full-service maintenance facility"
    ],
    "image": "/images/about.jpg",
    "imageAlt": "Yankee Aviation facility at Plymouth Municipal Airport"
  },
  "services": {
    "heading": "Our Services",
    "description": "We offer comprehensive aircraft maintenance services to keep your aircraft in peak condition.",
    "services": [
      "General aviation maintenance",
      "Special flight permits for US-registered aircraft",
      "Recurrent standard airworthiness certificates",
      "Preventive maintenance programs",
      "Custom modifications and installations"
    ],
    "image": "/images/services.jpg",
    "imageAlt": "Aircraft maintenance services at Yankee Aviation"
  },
  "testimonials": {
    "heading": "See What Our Customers Are Saying About Us",
    "testimonials": [
      {
        "name": "Bendrix Bailey",
        "credentials": "MEL, SEL, SES, Glider, IFR Commercial 2,000+ hours",
        "yearsAsCustomer": 10,
        "quote": "I have been a customer of Yankee Aviation for over 10 years. Pete and his team provide excellent preventive maintenance and quick-turn service.",
        "highlights": [
          "P-Ponk strut reinforcements",
          "Folding rear jump seats installation",
          "Ski installation for winter flying",
          "Reliable and professional service"
        ]
      },
      {
        "name": "Mark C Mannix",
        "yearsAsCustomer": 20,
        "quote": "I have had a 20-year relationship with Pete Conner and Yankee Aviation. They provide cost-effective solutions and honest advice.",
        "highlights": [
          "$12 fix instead of $4500 quote elsewhere",
          "Honest and trustworthy service",
          "Two decades of reliable partnership",
          "Highly recommend Pete Conner and Yankee Aviation"
        ]
      }
    ]
  },
  "seoMeta": {
    "title": "Aircraft Maintenance, Plymouth, MA",
    "description": "For more than 43 years, Yankee Aviation in Plymouth, MA has been offering a wide range of aircraft maintenance services. You can count on us to issue special flight permits for US-registered aircraft, recurrent standard airworthiness certificates, and many more. Reach out to us today.",
    "keywords": [
      "aircraft maintenance",
      "Plymouth MA",
      "general aviation",
      "airworthiness certificates",
      "flight permits",
      "aviation services"
    ],
    "ogImage": "/images/about.jpg"
  }
}
```

## File 5: Media Assets (`src/data/media.json`)

```json
{
  "images": [
    {
      "src": "/images/about.jpg",
      "alt": "Yankee Aviation facility overview",
      "width": 640,
      "height": 500,
      "loading": "eager"
    },
    {
      "src": "/images/services.jpg", 
      "alt": "Aircraft maintenance services",
      "width": 640,
      "height": 500,
      "loading": "lazy"
    },
    {
      "src": "/images/Contact_Img.jpg",
      "alt": "Contact Yankee Aviation",
      "width": 640,
      "height": 500,
      "loading": "lazy"
    },
    {
      "src": "/images/IMG_2289-Warrior-N9284A-scaled.jpg",
      "alt": "Piper Warrior aircraft N9284A",
      "width": 1446,
      "height": 1080,
      "loading": "lazy"
    }
  ],
  "featured": {
    "src": "/images/hero-background.jpg",
    "alt": "Yankee Aviation - Aircraft maintenance specialists",
    "width": 1920,
    "height": 1080,
    "loading": "eager"
  }
}
```

## Implementation Steps

1. **Create each JSON file** in the `src/data/` directory
2. **Validate structure** against TypeScript interfaces
3. **Test imports** in existing custom hooks
4. **Verify data accuracy** against crawled content
5. **Optimize for performance** (remove unnecessary fields)

## Content Extraction Notes

### From Crawled HTML
- **Meta tags**: Title, description, keywords
- **Structured data**: Business information, location
- **Text content**: Headings, paragraphs, lists
- **Image references**: Alt text, dimensions, sources

### Content Adaptation
- **Modernize language**: Update outdated references
- **Improve SEO**: Enhance descriptions and keywords  
- **Ensure accessibility**: Proper alt text and structure
- **Mobile optimization**: Responsive-friendly content

## Validation Checklist

- [ ] All JSON files validate against TypeScript interfaces
- [ ] Content matches crawled website information
- [ ] Image references point to correct assets
- [ ] SEO metadata is complete and accurate
- [ ] Contact information is current and correct
- [ ] Business hours and details are up to date