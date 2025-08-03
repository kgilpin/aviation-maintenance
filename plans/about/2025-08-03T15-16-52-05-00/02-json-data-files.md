# JSON Data Files Creation

## Overview

Create structured JSON data files to store about page content and team member information, following the established data architecture pattern.

## New Data Files Required

### 1. Team Data File (`src/data/team.json`)

```json
{
  "heading": "Our Experienced Team",
  "subheading": "Meet the professionals who make Yankee Aviation a trusted name in aircraft maintenance",
  "description": "Our team brings decades of combined experience in aviation maintenance, with FAA certifications and a commitment to excellence that has served the New England aviation community for over 44 years.",
  "members": [
    {
      "id": "peter-conner",
      "name": "Peter Conner",
      "role": "Owner, Designated Airworthiness Representative (DAR), FAA Examiner",
      "image": "/images/20201021_122112_resized-Pete-at-his-desk-10-21-20.jpg",
      "imageAlt": "Peter Conner working at his desk in the Yankee Aviation office",
      "shortBio": "Licensed A&P mechanic since high school graduation with continuous aircraft maintenance experience since 1965. FAA Designated Airworthiness Representative and Examiner.",
      "fullBio": "Originally hoped to become an airline pilot, Pete turned to aircraft maintenance and has been a licensed A&P mechanic since high school graduation. With continuous aircraft maintenance experience since 1965, including occasional flight instruction, he became an authorized inspector in 1968 while in the Navy. Appointed as Designated Airworthiness Representative (DAR) for maintenance in 1986, he's one of only a handful in New England. Designated as FAA Examiner for mechanic applicants in 1988.",
      "credentials": [
        "Licensed A&P Mechanic (since high school graduation)",
        "Designated Airworthiness Representative (DAR) - 1986",
        "FAA Examiner for Mechanic Applicants - 1988",
        "Authorized Inspector - 1968"
      ],
      "achievements": [
        "FAA 'Mechanic of the Year' Award - New England Region (1996)"
      ],
      "specialties": [
        "Aircraft maintenance and inspection",
        "Airworthiness certification",
        "Flight instruction",
        "Mechanic examination and certification"
      ],
      "yearsWithCompany": 44,
      "currentAircraft": "Piper Aerostar 700",
      "education": [
        "Aviation maintenance school graduate",
        "Cessna 300/400 series certification",
        "Piper Aerostar certification",
        "Single-Engine Cessna certification",
        "Eclipse 500 certification"
      ]
    },
    {
      "id": "gail-conner",
      "name": "Gail Conner",
      "role": "Office Manager",
      "image": "/images/gail.jpg",
      "imageAlt": "Gail Conner, Office Manager at Yankee Aviation",
      "shortBio": "Office Manager since 1980, providing essential business operations support and extensive knowledge about aircraft and parts.",
      "fullBio": "Pete's wife and business partner, Gail has been the Office Manager since 1980. She's the pleasant voice customers usually hear when calling and brings extensive knowledge about aircraft and parts. Her partnership with Pete creates a seamless business operation that has been essential to Yankee Aviation's success.",
      "specialties": [
        "Business operations management",
        "Customer service",
        "Aircraft parts knowledge",
        "Administrative coordination"
      ],
      "yearsWithCompany": 43
    },
    {
      "id": "ken-hughes", 
      "name": "Ken Hughes",
      "role": "Lead Mechanic, FAA Inspector",
      "image": "/images/ken.jpg",
      "imageAlt": "Ken Hughes, Lead Mechanic at Yankee Aviation",
      "shortBio": "Lead Mechanic with FAA Inspection Authorization, bringing 33+ years of experience and specialized expertise in engine work and electrical troubleshooting.",
      "fullBio": "Ken earned his mechanic certificates in 1985 and previously worked for Provincetown Boston Airlines before joining Yankee Aviation Services 33+ years ago. He earned his Inspection Authorization from the FAA in 1996 and is a highly respected inspector in the Boston District.",
      "credentials": [
        "FAA A&P Mechanic Certificates (1985)",
        "FAA Inspection Authorization (1996)"
      ],
      "specialties": [
        "Engine removal and installation",
        "Troubleshooting electrical problems", 
        "Dynamic propeller balancing",
        "Aircraft inspection"
      ],
      "yearsWithCompany": 33,
      "personalInterests": [
        "House work",
        "NFL football"
      ]
    },
    {
      "id": "joe-ricci",
      "name": "Joe Ricci", 
      "role": "A&P Mechanic",
      "image": "/images/joe.jpg",
      "imageAlt": "Joe Ricci, A&P Mechanic at Yankee Aviation",
      "shortBio": "Graduate of Cape Cod Community College Aviation curriculum, bringing fresh expertise and pilot experience to the team.",
      "fullBio": "The newest addition to the Yankee crew (about 3 years with the company), Joe is a graduate of Cape Cod Community College Aviation curriculum and holds FAA Airframe and Powerplant licenses. As a licensed pilot who owns a Cessna, he brings valuable perspective to maintenance work. He previously managed Pilgrim Aviation Flight School for several years.",
      "credentials": [
        "FAA Airframe and Powerplant License",
        "Licensed Pilot"
      ],
      "yearsWithCompany": 3,
      "currentAircraft": "Cessna",
      "education": [
        "Cape Cod Community College Aviation Curriculum"
      ],
      "specialties": [
        "Aircraft maintenance",
        "Flight operations knowledge",
        "Aviation education"
      ]
    },
    {
      "id": "hank-wiltshire",
      "name": "Hank Wiltshire",
      "role": "Part-time A&P Mechanic",
      "image": "/images/20201019_130017_resized-Hank-Wiltshire-for-Bio.jpg", 
      "imageAlt": "Hank Wiltshire, Part-time A&P Mechanic at Yankee Aviation",
      "shortBio": "Semi-retired A&P mechanic with 20+ years at Yankee Aviation, bringing unique customer perspective from extensive aircraft ownership experience.",
      "fullBio": "Hank joined Yankee Aviation Services 20+ years ago after previously operating a flight school and charter operation at Plymouth Airport. Licensed as an A&P mechanic since 1973, he was first introduced to flying 50+ years ago. His extensive aircraft ownership and repair experience provides a unique customer perspective.",
      "credentials": [
        "Licensed A&P Mechanic (1973)"
      ],
      "yearsWithCompany": 20,
      "currentAircraft": "Cessna 172 (configured for float operations)",
      "personalInterests": [
        "Flying",
        "Deer hunting in Maine woods"
      ],
      "specialties": [
        "Aircraft maintenance",
        "Flight operations",
        "Customer service perspective"
      ]
    }
  ]
}
```

### 2. About Page Data File (`src/data/about.json`)

```json
{
  "hero": {
    "primaryHeading": "An Established Full-Service Aviation Maintenance Facility",
    "description": "Led by Peter and Gail Conner, Yankee Aviation in Plymouth, MA provides cost-effective aircraft maintenance services with over 44 years of experience and professional excellence.",
    "backgroundImage": "/images/about.jpg"
  },
  "companyHistory": {
    "heading": "Our Story",
    "description": [
      "For more than 44 years, Yankee Aviation in Plymouth, Massachusetts has been offering a wide range of aircraft maintenance services to the New England aviation community.",
      "Founded in 1977, our company has built its reputation on experience, professionalism, and a commitment to excellence that has earned recognition from the Federal Aviation Administration.",
      "Our team combines decades of hands-on experience with the latest industry knowledge and certifications, ensuring that every aircraft receives the highest standard of care and attention."
    ],
    "highlights": [
      "44+ years of continuous operation",
      "FAA 'Mechanic of the Year' award recipient",
      "Designated Airworthiness Representative (DAR) on staff",
      "Comprehensive team of licensed A&P mechanics",
      "Full-service general aviation maintenance facility"
    ],
    "timeline": [
      {
        "year": 1977,
        "event": "Yankee Aviation founded"
      },
      {
        "year": 1986,
        "event": "Peter Conner appointed as Designated Airworthiness Representative (DAR)"
      },
      {
        "year": 1988,
        "event": "Peter Conner designated as FAA Examiner for mechanic applicants"
      },
      {
        "year": 1996,
        "event": "Peter Conner receives FAA 'Mechanic of the Year' award for New England Region"
      }
    ],
    "image": "/images/20200531_191924_resized-scaled.jpg",
    "imageAlt": "Aircraft maintenance work at Yankee Aviation showing professional technicians"
  },
  "seoMeta": {
    "title": "About Us - Yankee Aviation Services",
    "description": "Learn about Yankee Aviation's 44+ years of experience in aircraft maintenance services in Plymouth, MA. Meet our experienced team led by Peter and Gail Conner.",
    "keywords": [
      "aircraft maintenance",
      "Plymouth MA aviation",
      "FAA certified mechanics",
      "general aviation services",
      "Yankee Aviation team",
      "aircraft inspection",
      "aviation maintenance facility"
    ],
    "ogImage": "/images/about.jpg"
  }
}
```

## Implementation Notes

### Data Structure Decisions

- **Team Members**: Each member has a unique ID for consistent referencing
- **Biographical Content**: Both short and full biographies for flexible display
- **Professional Details**: Comprehensive tracking of credentials, achievements, and specialties
- **Years of Service**: Track both years with company and total industry experience
- **Personal Touches**: Individual interests and aircraft ownership for human connection

### Content Organization

- **Modular Structure**: Separate sections allow for independent updates
- **SEO Optimization**: Comprehensive meta data for search engine optimization
- **Accessibility**: Detailed image alt text for screen readers
- **Flexibility**: Optional fields support varying levels of detail across team members

## Files to Create

- `src/data/team.json` - Team member profiles and section data
- `src/data/about.json` - About page content and metadata

## Data Validation Requirements

- All required fields must be present for each team member
- Image paths must correspond to files in `/public/images/`
- Years and dates should be consistent and realistic
- All text content should be properly formatted and professional
- SEO metadata should follow best practices for length and content