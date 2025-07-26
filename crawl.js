const scraper = require('website-scraper').default || require('website-scraper');
const path = require('path');

const options = {
  urls: ['https://yankeeaviation.com/'],
  directory: path.join(__dirname, 'crawls', 'yankeeaviation.com'),
  recursive: true,
  maxRecursiveDepth: 2,
  filenameGenerator: 'bySiteStructure',
  requestConcurrency: 1,
  sources: [
    {selector: 'img', attr: 'src'},
    {selector: 'link[rel="stylesheet"]', attr: 'href'},
    {selector: 'script', attr: 'src'},
    {selector: 'a', attr: 'href'}
  ],
  urlFilter: function(url) {
    // Only crawl URLs from yankeeaviation.com domain
    return url.includes('yankeeaviation.com');
  },
  resourceFilter: function(resource) {
    // Include all resources from the same domain
    return resource.url.includes('yankeeaviation.com') || 
           resource.url.startsWith('/') || 
           resource.url.startsWith('./') ||
           resource.url.startsWith('../');
  }
};

console.log('Starting crawl of yankeeaviation.com...');
console.log('Output directory:', options.directory);

scraper(options).then((result) => {
  console.log('Crawl completed successfully!');
  console.log(`Crawled ${result.length} resources:`);
  result.forEach((resource, index) => {
    console.log(`${index + 1}. ${resource.url} -> ${resource.filename}`);
  });
}).catch((err) => {
  console.error('Crawl failed:', err);
});