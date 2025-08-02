module.exports = (config) => {
  config.addPassthroughCopy("src/images");
  config.addPassthroughCopy("src/css/output.css");
  config.addPassthroughCopy("src/js");

  config.addFilter("trim_trailing_slash", (url) => {
    if (url && url.length > 1 && url.endsWith("/")) {
      return url.slice(0, -1);
    }
    return url;
  });

  return {
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "dist",
    },
  };
};