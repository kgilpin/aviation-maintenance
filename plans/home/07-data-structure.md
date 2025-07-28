# Data Structure Plan

## Overview
Define the JSON data files needed to support the homepage content and maintain consistency across the site.

## Required Data Files

### 1. Company Information (`src/_data/company.json`)
```json
{
  "name": "Eagle East Aviation",
  "logo": {
    "src": "/images/Eagle_East_Logo-removebg-preview_v=1740512149&width=600.png",
    "alt": "Eagle East Aviation Logo",
    "width": 200,
    "height": 51
  },
  "location": {
    "airport": "KLWM",
    "city": "Plymouth",
    "state": "MA"
  },
  "tagline": "Dedicated to helping you take flight",
  "description": "At Eagle East Aviation, we are dedicated to helping you take flight; whether you're beginning your pilot journey, advancing your skills, or ensuring your aircraft is in top condition.",
  "founded": "2025",
  "contact": {
    "phone": "",
    "email": "",
    "address": ""
  }
}
```

### 2. Navigation Structure (`src/_data/navigation.json`)
```json
{
  "primary": [
    {
      "title": "Home",
      "url": "/",
      "active": true
    },
    {
      "title": "Flight Training",
      "url": "/flight-training/"
    },
    {
      "title": "FBO Services",
      "url": "/fbo-services/"
    },
    {
      "title": "Aircraft Rentals",
      "url": "/aircraft-rentals/"
    },
    {
      "title": "Scenic Tours & Photography",
      "url": "/scenic-tours/"
    },
    {
      "title": "Pilot Resources",
      "url": "/pilot-resources/"
    },
    {
      "title": "The Lounge",
      "url": "/lounge/"
    },
    {
      "title": "Contact Us",
      "url": "/contact/"
    }
  ]
}
```

### 3. Hero Slideshow (`src/_data/hero-slides.json`)
```json
{
  "slides": [
    {
      "image": "/images/Hanger_v=1741616783&width=3840.jpg",
      "alt": "Eagle East Aviation Hangar",
      "title": "",
      "description": ""
    },
    {
      "image": "/images/IMG_1081_v=1740498634&width=3840.heic",
      "alt": "Aircraft Cockpit Interior",
      "title": "",
      "description": ""
    },
    {
      "image": "/images/FullSizeRender_v=1740498890&width=3840.heic",
      "alt": "Aircraft on Tarmac",
      "title": "",
      "description": ""
    },
    {
      "image": "/images/IMG_4716_v=1740495727&width=3840.heic",
      "alt": "Aircraft Close-up View",
      "title": "",
      "description": ""
    },
    {
      "image": "/images/unnamed3214213_v=1740699016&width=3840.jpg",
      "alt": "Aviation Scene",
      "title": "",
      "description": ""
    }
  ],
  "settings": {
    "autoplay": true,
    "interval": 5000,
    "showDots": true,
    "showArrows": false
  }
}
```

### 4. Services Information (`src/_data/services.json`)
```json
{
  "services": [
    {
      "id": "flight-training",
      "title": "Flight Training",
      "description": "Take the next step in your aviation journey with our professional flight training programs. From student pilots to advanced certifications, our experienced instructors provide personalized lessons to help you achieve your goals.",
      "image": "/images/service-flight-training.jpg",
      "alt": "Flight Training Instruction",
      "cta": {
        "text": "Book a Lesson!",
        "url": "/flight-training/"
      }
    },
    {
      "id": "tours-photography",
      "title": "Tours & Photography",
      "description": "Discover the beauty of New England from the skies with our scenic flight tours. Capture breathtaking aerial photos of the coastline, cityscapes, and beyond with the help of our experienced pilots.",
      "image": "/images/service-tours.jpg",
      "alt": "Scenic Flight Tours",
      "cta": {
        "text": "Book a Tour!",
        "url": "/scenic-tours/"
      }
    },
    {
      "id": "aircraft-rentals",
      "title": "Aircraft Rentals",
      "description": "Rent from our well-maintained fleet of aircraft for your next adventure. Whether you're training or flying solo, we offer a variety of planes to suit your needs.",
      "image": "/images/service-rentals.jpg",
      "alt": "Aircraft Rental Fleet",
      "cta": {
        "text": "Rent a Plane!",
        "url": "/aircraft-rentals/"
      }
    },
    {
      "id": "fbo-services",
      "title": "FBO Services",
      "description": "Experience top-tier FBO services with our range of offerings, including fueling, de-icing, and ground support. We ensure your aircraft is ready for takeoff with the highest standards of care.",
      "image": "/images/service-fbo.jpg",
      "alt": "FBO Ground Services",
      "cta": {
        "text": "Learn More!",
        "url": "/fbo-services/"
      }
    },
    {
      "id": "pilot-resources",
      "title": "Pilot Resources",
      "description": "Access essential tools and information for pilots, including the FAA website, weather updates, live ATC, and more. Stay informed and prepared for your next flight with our comprehensive resources.",
      "image": "/images/service-resources.jpg",
      "alt": "Pilot Resources and Tools",
      "cta": {
        "text": "Learn More!",
        "url": "/pilot-resources/"
      }
    }
  ]
}
```

### 5. Contact Form Configuration (`src/_data/contact.json`)
```json
{
  "form": {
    "title": "Contact form",
    "method": "POST",
    "action": "/contact",
    "fields": [
      {
        "name": "name",
        "type": "text",
        "label": "Name",
        "placeholder": "Name",
        "required": true
      },
      {
        "name": "email",
        "type": "email",
        "label": "Email",
        "placeholder": "Email",
        "required": true
      },
      {
        "name": "phone",
        "type": "tel",
        "label": "Phone Number",
        "placeholder": "Phone number",
        "required": false
      },
      {
        "name": "message",
        "type": "textarea",
        "label": "Message",
        "placeholder": "Message",
        "required": true,
        "rows": 5
      }
    ],
    "submitText": "Send",
    "successMessage": "Thank you for your message. We'll get back to you soon!",
    "errorMessage": "Sorry, there was an error sending your message. Please try again."
  }
}
```

## Data Usage Benefits
- **Maintainability**: Easy content updates without touching templates
- **Consistency**: Centralized data ensures uniform information across pages
- **Scalability**: Easy to add new services, navigation items, or slides
- **Localization**: Future support for multiple languages
- **Dynamic Content**: Automatic updates (like copyright year)

## Implementation Notes
- All data files should be placed in `src/_data/` directory
- JSON files are automatically available as global variables in Eleventy templates
- Use semantic naming conventions for easy template integration
- Include validation schemas for complex data structures