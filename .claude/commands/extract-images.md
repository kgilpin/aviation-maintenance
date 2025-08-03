# Extracting images from a page

Some site pages may contain images that need to be extracted and saved for later use. This command provides a way to extract images from a specific page.

## Usage

Run the command `/extract-images [page-name]` to extract images from a specific page.

## Output

The extracted images will be saved in the `src/images/[page-name]/` directory. Each image will be named based on its original filename, with a timestamp appended to ensure uniqueness.

## Method

For each HTML page in the site crawl, run the script `extract-images.js <html-file> [output-dir]`, with the HTML file name as an argument. This script will:

1. Load the specified page content.
2. Parse the content to find all image tags.
3. Download each image to the `src/images/[page-name]/` directory.

## Metadata

Create or update a data file src/\_data/media.json that documents the context and purpose of the media files used in the project. This file should include information about the how the media files are used within the site.

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
