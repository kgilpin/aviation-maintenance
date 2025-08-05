# Step 2: Create Company Data File

## Objective
Extract company information from the crawled content and create a centralized data file for reuse across the site.

## Analysis from Crawled Content
From the contact page and header analysis, the following company information was identified:

- Company Name: "Aura Aero"
- Logo: Uses SVG logo files
- Social Media: Facebook, Twitter/X, LinkedIn presence
- Description: "AURA AERO is committed to serve mankind by designing and manufacturing aircraft that accelerate air transport decarbonization."

## Actions Required

### 2.1 Create Company Data File
Create `src/data/company.json`:

**Note:** This implementation uses existing assets from `src/assets/` directory.

```json
{
  "name": "Aura Aero",
  "fullName": "AURA AERO",
  "description": "AURA AERO is committed to serve mankind by designing and manufacturing aircraft that accelerate air transport decarbonization.",
  "tagline": "Designing aircraft that accelerate air transport decarbonization",
  "logo": {
    "main": "/assets/images/logo.svg",
    "favicon": "/assets/favicons/logo.svg",
    "alt": "Aura Aero"
  },
  "branding": {
    "backgroundImage": "/assets/images/bg-default.png",
    "themeColor": "#ffffff",
    "backgroundColor": "#ffffff"
  },
  "pwa": {
    "manifest": "/assets/documents/site.webmanifest",
    "appleTouchIcon": "/assets/favicons/apple-touch-icon.png",
    "favicon16": "/assets/favicons/favicon-16x16.png",
    "favicon32": "/assets/favicons/favicon-32x32.png",
    "safariPinnedTab": "/assets/favicons/safari-pinned-tab.svg"
  },
  "contact": {
    "email": {
      "sales": "sales@aura-aero.com",
      "communication": "communication@aura-aero.com", 
      "hr": "hr@aura-aero.com",
      "general": "contact@aura-aero.com"
    },
    "departments": [
      {
        "id": "sales",
        "name": "Sales",
        "description": "Product sales and customer inquiries"
      },
      {
        "id": "communication", 
        "name": "Communication",
        "description": "Media and communication requests"
      },
      {
        "id": "hr",
        "name": "Human Resources", 
        "description": "Career opportunities and HR inquiries"
      },
      {
        "id": "other",
        "name": "Other requests",
        "description": "General inquiries and other requests"
      }
    ]
  },
  "socialMedia": {
    "facebook": {
      "username": "auraaero",
      "url": "https://www.facebook.com/auraaero/"
    },
    "twitter": {
      "username": "aero_aura", 
      "url": "https://x.com/aero_aura"
    },
    "linkedin": {
      "username": "aura-aero",
      "url": "https://www.linkedin.com/company/aura-aero/"
    }
  },
  "seo": {
    "defaultTitle": "AURA AERO",
    "titleTemplate": "%s - Aura Aero",
    "defaultDescription": "AURA AERO is committed to serve mankind by designing and manufacturing aircraft that accelerate air transport decarbonization.",
    "keywords": ["aviation", "electric aircraft", "decarbonization", "aerospace", "sustainable aviation"]
  }
}
```

### 2.2 Verify Existing Company Assets
**Assets Already Available:** The following assets are already present in `src/assets/`:

**Images:**
- `src/assets/images/logo.svg` - Primary white logo (SVG format)
- `src/assets/images/bg-default.png` - Default background pattern

**Favicons:**
- `src/assets/favicons/apple-touch-icon.png` (180x180)
- `src/assets/favicons/favicon-16x16.png` 
- `src/assets/favicons/favicon-32x32.png`
- `src/assets/favicons/safari-pinned-tab.svg`
- `src/assets/favicons/logo.svg` - Favicon version of logo

**Documents:**
- `src/assets/documents/site.webmanifest` - PWA manifest file

**No Action Required:** All necessary assets are already in place and properly organized.

## TypeScript Interface Preview
This data will require the following interface (to be created in Step 5):

```typescript
interface CompanyData {
  name: string;
  fullName: string;
  description: string;
  tagline: string;
  logo: {
    main: string;
    black: string;
    alt: string;
  };
  contact: {
    email: Record<string, string>;
    departments: Array<{
      id: string;
      name: string;
      description: string;
    }>;
  };
  socialMedia: {
    facebook: { username: string; url: string; };
    twitter: { username: string; url: string; };
    linkedin: { username: string; url: string; };
  };
  seo: {
    defaultTitle: string;
    titleTemplate: string;
    defaultDescription: string;
    keywords: string[];
  };
}
```

## Usage Examples
This company data will be used in:
- Header component (logo, company name)
- Footer component (social media links, company info)
- Contact form (department selection)
- SEO meta tags (company description, title templates)
- About sections across the site

## Deliverables
- `src/data/company.json` created with comprehensive company information
- Logo files copied to `src/assets/images/`
- Company data structure ready for TypeScript interface definition

## Next Step
Proceed to Step 3: Create Navigation Data File