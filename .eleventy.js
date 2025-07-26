module.exports = (config) => {
  config.addPassthroughCopy("src/images");
  config.addPassthroughCopy("src/css");

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
