# Extracting images from a page

Some site pages may contain images that need to be extracted and saved for later use. This command provides a way to extract images from a specific page.

## Usage

Run the command `/extract-images [page-name]` to extract images from a specific page.

## Output

The extracted images will be saved in the `public/images/` directory. Each image will be named based on its original filename, with a timestamp appended to ensure uniqueness.

## Method

### Run the `extract-images` script

For each HTML page in the site crawl, run `npm run extract-images <html-file> [output-dir]`, with the HTML file name as an argument.

### Extract images from the crawl

Inspect the site crawl and copy all images from the crawl to the `public/images/` directory.

## Metadata

Create or update a data file src/data/media.json that documents the context and purpose of the media files used in the project. This file should include information about the how the media files are used within the site.

Also create corresponding TypeScript interfaces in src/data/types.ts, and create or update a custom hook in src/hooks/useMediaData.ts for type-safe access to media information.

**Example**

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
