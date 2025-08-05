# Extracting media from a page

Some site pages may contain media files (images, videos, audio, documents) that need to be extracted and saved for later use. This command provides a way to extract all media from a specific page.

## Usage

Run the command `/extract-media [page-name]` to extract media from a specific page.

## Output

The extracted media files will be saved in the `src/assets/` directory, organized by type. Each file will be named based on its original filename, with a timestamp appended to ensure uniqueness.

## Method

### Find and copy media

Inspect the site crawl and copy all media files from the crawl to the `src/assets/` directory. Media should be organized logically within subdirectories:

- `src/assets/images/` - Images (jpg, png, gif, svg, etc.)
- `src/assets/videos/` - Video files (mp4, webm, avi, etc.)
- `src/assets/audio/` - Audio files (mp3, wav, ogg, etc.)
- `src/assets/documents/` - Documents (pdf, doc, etc.)

### No cleanup or removal

Don't perform a cleanup or removal step in which you attempt to combine or remove content. Just leave all the
extracted media in place.

## Metadata

Create or update a data file src/data/media.json that documents the context and purpose of the media files used in the project. This file should include information about how the media files are used within the site.

Also create corresponding TypeScript interfaces in src/data/types.ts, and create or update a custom hook in src/hooks/useMediaData.ts for type-safe access to media information.

**Example**

```json
{
  "media": {
    "images": {
      "logo": {
        "path": "/assets/images/logo.png",
        "description": "The company logo, used in the header of the site.",
        "usage": "Displayed on all pages as part of the site branding.",
        "type": "image"
      },
      "background": {
        "path": "/assets/images/background.jpg",
        "description": "A background image used on the homepage.",
        "usage": "Sets the visual tone for the homepage.",
        "type": "image"
      }
    },
    "videos": {
      "introVideo": {
        "path": "/assets/videos/intro.mp4",
        "description": "An introductory video about company services.",
        "usage": "Featured on the homepage to engage visitors.",
        "type": "video"
      }
    },
    "audio": {
      "backgroundMusic": {
        "path": "/assets/audio/background.mp3",
        "description": "Background music for promotional content.",
        "usage": "Used in video presentations and interactive elements.",
        "type": "audio"
      }
    },
    "documents": {
      "brochure": {
        "path": "/assets/documents/company-brochure.pdf",
        "description": "Company informational brochure.",
        "usage": "Available for download on the services page.",
        "type": "document"
      }
    }
  }
}
```
