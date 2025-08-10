import scraper from "website-scraper";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const domainName: string | undefined = process.argv[2];
if (!domainName) {
  console.error("Usage: npx tsx crawl.ts <domainName>");
  process.exit(1);
}

// Parse the domain name to handle protocols
let baseUrl: string;
let hostname: string;

if (domainName.startsWith('http://') || domainName.startsWith('https://')) {
  baseUrl = domainName.endsWith('/') ? domainName : `${domainName}/`;
  hostname = new URL(domainName).hostname;
} else {
  baseUrl = `https://${domainName}/`;
  hostname = domainName;
}

const options: scraper.ScrapingOptions = {
  urls: [baseUrl],
  directory: path.join(__dirname, "crawl"),
  recursive: true,
  maxRecursiveDepth: 2,
  filenameGenerator: "bySiteStructure",
  requestConcurrency: 1,
  sources: [
    { selector: "img", attr: "src" },
    { selector: 'link[rel="stylesheet"]', attr: "href" },
    { selector: "script", attr: "src" },
    { selector: "a", attr: "href" },
    { selector: "frame", attr: "src" },
    { selector: "iframe", attr: "src" },
  ],
  urlFilter: function (url: string): boolean {
    return url.includes(hostname);
  },
  resourceFilter: function (resource: scraper.Resource): boolean {
    // Include all resources from the same domain
    return (
      resource.url.includes(hostname) ||
      resource.url.startsWith("/") ||
      resource.url.startsWith("./") ||
      resource.url.startsWith("../")
    );
  },
};

console.log(`Starting crawl of ${domainName}...`);
console.log("Output directory:", options.directory);

scraper(options)
  .then((result: scraper.Resource[]) => {
    console.log("Crawl completed successfully!");
    console.log(`Crawled ${result.length} resources:`);
    result.forEach((resource: scraper.Resource, index: number) => {
      console.log(`${index + 1}. ${resource.url} -> ${resource.filename}`);
    });
  })
  .catch((err: Error) => {
    console.error("Crawl failed:", err);
  });