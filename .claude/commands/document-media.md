Create a data file src/\_data/media.json that documents the context and purpose of the media files used in the project. This file should include information about the how the media files are used within the site.

Enumerate media files by listing everything in src/images and src/media.

For each media file, find references to the media file in the crawl. Use these references to document the context and purpose of the media item in the media.json file.

```json
{
  "media": {
    "images": {
      "logo": {
        "path": "/images/logo.png",
        "description": "The logo of Eagle East Aviation, used in the header of the site.",
        "usage": "Displayed on all pages as part of the site branding."
      },
      "background": {
        "path": "/images/background.jpg",
        "description": "A background image used on the homepage.",
        "usage": "Sets the visual tone for the homepage."
      }
    },
    "videos": {
      "introVideo": {
        "path": "/videos/intro.mp4",
        "description": "An introductory video about Eagle East Aviation services.",
        "usage": "Featured on the homepage to engage visitors."
      }
    }
  }
}
```
