const htmlmin = require('html-minifier');

module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget('./src/css/tailwind.config.js');
  eleventyConfig.addWatchTarget('./src/css/tailwind.css');
  eleventyConfig.addPassthroughCopy({'./_tmp/style.css': './style.css'});


  eleventyConfig.addTransform('htmlmin', function(content, outputPath) {
    if (
      process.env.ELEVENTY_PRODUCTION &&
      outputPath &&
      outputPath.endsWith('.html')
    ) {
      return htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
    }
    return content;
  });

  return {
    dir: {
      input: "src",
      output: "public"
    }
  };
};