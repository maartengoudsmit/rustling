export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./styles/");
  eleventyConfig.addWatchTarget("./styles/");
  eleventyConfig.addPassthroughCopy("./scripts/");
  eleventyConfig.addWatchTarget("./scripts/");
}
