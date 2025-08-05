# Step 4: Create Contact Page Data File

## Objective
Extract and structure all content specific to the Contact Us page from the crawled content into a centralized data file.

## Analysis from Crawled Content
From the `/en/contact-us/` page analysis, the following content was identified:

**Page Content:**
- Page Title: "Contact us"
- Form Title: "Contact us" 
- Form Description: "THE AURA AERO TEAM WILL RESPOND TO YOU"
- Submit Message: "Send your message !"

**Form Fields:**
- Lastname (required)
- Firstname (required) 
- Phone (optional)
- Email (required)
- Message (required, max 2000 characters)
- Department Selection (Sales, Communication, Human Resources, Other requests)
- Privacy Policy Consent (required)

## Actions Required

### 4.1 Create Contact Page Data File
Create `src/data/contact.json`:

```json
{
  "page": {
    "title": "Contact us",
    "description": "Get in touch with the Aura Aero team",
    "seo": {
      "title": "Contact us - Aura Aero",
      "description": "Contact the Aura Aero team for sales inquiries, media requests, career opportunities, and general information.",
      "keywords": ["contact", "aura aero", "aviation", "aerospace", "electric aircraft"]
    }
  },
  "form": {
    "title": "Contact us",
    "description": "THE AURA AERO TEAM WILL RESPOND TO YOU",
    "submitMessage": "Send your message !",
    "successMessage": "Thank you for your message! We will get back to you soon.",
    "errorMessage": "Sorry, there was an error sending your message. Please try again.",
    "fields": {
      "lastname": {
        "type": "text",
        "label": "Last Name",
        "placeholder": "Lastname *",
        "required": true,
        "maxLength": 400,
        "validation": {
          "required": "Last name is required",
          "maxLength": "Last name must be less than 400 characters"
        }
      },
      "firstname": {
        "type": "text", 
        "label": "First Name",
        "placeholder": "Firstname *",
        "required": true,
        "maxLength": 400,
        "validation": {
          "required": "First name is required",
          "maxLength": "First name must be less than 400 characters"
        }
      },
      "phone": {
        "type": "tel",
        "label": "Phone",
        "placeholder": "Phone",
        "required": false,
        "maxLength": 400,
        "validation": {
          "pattern": "Please enter a valid phone number",
          "maxLength": "Phone number must be less than 400 characters"
        }
      },
      "email": {
        "type": "email",
        "label": "Email",
        "placeholder": "Email *", 
        "required": true,
        "maxLength": 400,
        "validation": {
          "required": "Email is required",
          "email": "Please enter a valid email address",
          "maxLength": "Email must be less than 400 characters"
        }
      },
      "message": {
        "type": "textarea",
        "label": "Message",
        "placeholder": "Your message *",
        "required": true,
        "maxLength": 2000,
        "rows": 10,
        "validation": {
          "required": "Message is required",
          "maxLength": "Message must be less than 2000 characters"
        }
      },
      "department": {
        "type": "select",
        "label": "Department",
        "placeholder": "Select department",
        "required": true,
        "options": [
          {
            "value": "sales",
            "label": "Sales",
            "description": "Product inquiries and sales questions"
          },
          {
            "value": "communication",
            "label": "Communication", 
            "description": "Media and press inquiries"
          },
          {
            "value": "hr",
            "label": "Human Resources",
            "description": "Career opportunities and HR questions"
          },
          {
            "value": "other",
            "label": "Other requests",
            "description": "General inquiries and other questions"
          }
        ],
        "validation": {
          "required": "Please select a department"
        }
      },
      "consent": {
        "type": "checkbox",
        "label": "Privacy Consent",
        "text": "By checking this box, I agree to the collection and use of my data for the purposes stated in the privacy policy",
        "required": true,
        "links": {
          "privacyPolicy": {
            "text": "privacy policy",
            "href": "/privacy-policy",
            "target": "_blank"
          }
        },
        "validation": {
          "required": "You must agree to the privacy policy to continue"
        }
      }
    },
    "submission": {
      "method": "POST",
      "action": "/api/contact",
      "successRedirect": "/contact-us/thank-you",
      "loadingText": "Sending...",
      "submitText": "SEND"
    }
  },
  "accessibility": {
    "formAriaLabel": "Contact form",
    "requiredFieldsNote": "Fields marked with * are required",
    "errorSummaryHeading": "Please correct the following errors:",
    "skipToContent": "Skip to main content"
  },
  "recaptcha": {
    "enabled": true,
    "siteKey": "your-recaptcha-site-key",
    "action": "contact_form"
  }
}
```

### 4.2 Create Thank You Page Data
Create a companion data structure for the thank you page:

```json
{
  "thankYou": {
    "title": "Thank You!",
    "message": "Your message has been sent successfully. The Aura Aero team will respond to you shortly.",
    "returnHome": {
      "text": "Return to Home",
      "href": "/"
    },
    "seo": {
      "title": "Thank You - Contact Sent",
      "description": "Your contact message has been successfully sent to Aura Aero."
    }
  }
}
```

## TypeScript Interface Preview
This contact data will require the following interfaces (to be created in Step 5):

```typescript
interface FormField {
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox';
  label: string;
  placeholder?: string;
  required: boolean;
  maxLength?: number;
  rows?: number;
  options?: Array<{
    value: string;
    label: string;
    description?: string;
  }>;
  validation: Record<string, string>;
  text?: string;
  links?: Record<string, {
    text: string;
    href: string;
    target?: string;
  }>;
}

interface ContactData {
  page: {
    title: string;
    description: string;
    seo: {
      title: string;
      description: string;
      keywords: string[];
    };
  };
  form: {
    title: string;
    description: string;
    submitMessage: string;
    successMessage: string;
    errorMessage: string;
    fields: Record<string, FormField>;
    submission: {
      method: string;
      action: string;
      successRedirect: string;
      loadingText: string;
      submitText: string;
    };
  };
  accessibility: {
    formAriaLabel: string;
    requiredFieldsNote: string;
    errorSummaryHeading: string;
    skipToContent: string;
  };
  recaptcha: {
    enabled: boolean;
    siteKey: string;
    action: string;
  };
}
```

## Content Localization Preparation
This structure supports future localization by:
- Separating all text content into data files
- Providing clear field labels and validation messages
- Supporting multiple language versions through file naming (contact.en.json, contact.fr.json)

## Form Validation Strategy
The validation configuration supports:
- Required field validation
- Maximum length validation  
- Email format validation
- Phone number pattern validation
- Custom error messages for each validation rule

## Deliverables
- `src/data/contact.json` created with complete form configuration
- All text content extracted from crawled page
- Comprehensive validation rules defined
- Accessibility features configured
- Form submission workflow defined

## Next Step
Proceed to Step 5: Create TypeScript Interfaces