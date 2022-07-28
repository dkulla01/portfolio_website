const htmlmin = require('html-minifier');
const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, attributes) {
  let metadata = await Image(src, {
    widths: [300, 600, null],
    formats: ['jpeg'],
    outputDir: './public/images/',
    urlPath: 'images/'
  });

  let imageAttributes = {
    ...attributes,
    loading: "lazy",
    decoding: "async"
  };

  return Image.generateHTML(metadata, imageAttributes, {
    whitespaceMode: "inline"
  });
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget('./src/css/tailwind.config.js');
  eleventyConfig.addWatchTarget('./src/css/tailwind.css');
  eleventyConfig.addPassthroughCopy({'./_tmp/style.css': './style.css'});
  eleventyConfig.addPassthroughCopy("./src/images")
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

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