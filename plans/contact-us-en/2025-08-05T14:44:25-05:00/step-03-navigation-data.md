# Step 3: Create Navigation Data File

## Objective
Extract and structure the site navigation from the crawled content to create a centralized navigation configuration.

## Analysis from Crawled Content
From examining the header and navigation structure in the crawled pages, the following navigation items were identified:

**Main Navigation Items:**
- Home (/)
- Products/Aircraft Models (integral, era)  
- Media/News
- About/Company
- Contact
- Language switching (EN/FR)

**Sub-navigation patterns:**
- Product categories (Integral-R, Integral-S, Integral-E, ERA)
- Media sections (News, Press Articles, Videos)

## Actions Required

### 3.1 Create Navigation Data File
Create `src/data/navigation.json`:

```json
{
  "main": [
    {
      "id": "home",
      "label": "Home",
      "href": "/",
      "isActive": false
    },
    {
      "id": "aircraft",
      "label": "Aircraft", 
      "href": "/aircraft",
      "isActive": false,
      "children": [
        {
          "id": "integral",
          "label": "INTEGRAL",
          "href": "/aircraft/integral",
          "children": [
            {
              "id": "integral-r",
              "label": "INTEGRAL-R",
              "href": "/aircraft/integral-r",
              "description": "Aerobatic aircraft"
            },
            {
              "id": "integral-s", 
              "label": "INTEGRAL-S",
              "href": "/aircraft/integral-s",
              "description": "Training aircraft"
            },
            {
              "id": "integral-e",
              "label": "INTEGRAL-E", 
              "href": "/aircraft/integral-e",
              "description": "Electric aircraft"
            }
          ]
        },
        {
          "id": "era",
          "label": "ERA",
          "href": "/aircraft/era",
          "description": "Electric Regional Aircraft"
        }
      ]
    },
    {
      "id": "media",
      "label": "Media",
      "href": "/media",
      "isActive": false,
      "children": [
        {
          "id": "news",
          "label": "News",
          "href": "/media/news"
        },
        {
          "id": "press",
          "label": "Press Articles", 
          "href": "/media/press"
        },
        {
          "id": "videos",
          "label": "Videos",
          "href": "/media/videos"
        }
      ]
    },
    {
      "id": "sustainability",
      "label": "Eco-Responsibility",
      "href": "/eco-responsibility",
      "isActive": false
    },
    {
      "id": "careers",
      "label": "Join Us",
      "href": "/join-us", 
      "isActive": false
    },
    {
      "id": "contact",
      "label": "Contact Us",
      "href": "/contact-us",
      "isActive": false
    }
  ],
  "footer": [
    {
      "id": "privacy",
      "label": "Privacy Policy",
      "href": "/privacy-policy"
    },
    {
      "id": "legal",
      "label": "Legal Mentions", 
      "href": "/legal-mentions"
    }
  ],
  "languages": [
    {
      "code": "en",
      "label": "English",
      "flag": "🇺🇸",
      "isDefault": true
    },
    {
      "code": "fr", 
      "label": "Français",
      "flag": "🇫🇷",
      "isDefault": false
    }
  ],
  "mobile": {
    "breakpoint": "md",
    "hamburgerLabel": "Menu",
    "closeLabel": "Close"
  }
}
```

### 3.2 Create Breadcrumb Configuration
Add breadcrumb support to navigation structure:

```json
{
  "breadcrumbs": {
    "separator": "/",
    "homeLabel": "Home",
    "showOnPages": ["contact-us", "aircraft", "media", "eco-responsibility", "join-us"],
    "customLabels": {
      "contact-us": "Contact Us",
      "aircraft": "Aircraft",
      "eco-responsibility": "Eco-Responsibility", 
      "join-us": "Careers"
    }
  }
}
```

## TypeScript Interface Preview
This navigation data will require the following interfaces (to be created in Step 5):

```typescript
interface NavigationItem {
  id: string;
  label: string;
  href: string;
  isActive?: boolean;
  description?: string;
  children?: NavigationItem[];
}

interface Language {
  code: string;
  label: string;
  flag: string;
  isDefault: boolean;
}

interface NavigationData {
  main: NavigationItem[];
  footer: NavigationItem[];
  languages: Language[];
  mobile: {
    breakpoint: string;
    hamburgerLabel: string;
    closeLabel: string;
  };
  breadcrumbs: {
    separator: string;
    homeLabel: string;
    showOnPages: string[];
    customLabels: Record<string, string>;
  };
}
```

## Usage Examples
This navigation data will be used in:
- Header component (main navigation menu)
- Mobile navigation component  
- Footer component (footer links)
- Breadcrumb component
- Language switcher component
- Active page highlighting

## Responsive Behavior
- Desktop: Full horizontal navigation with dropdowns
- Tablet: Condensed navigation with hover/click dropdowns
- Mobile: Hamburger menu with vertical navigation

## Deliverables
- `src/data/navigation.json` created with complete navigation structure
- Multi-level navigation support
- Language switching configuration
- Mobile navigation configuration
- Breadcrumb support structure

## Next Step
Proceed to Step 4: Create Contact Page Data File