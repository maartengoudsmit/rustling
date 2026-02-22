import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./styles/");
  eleventyConfig.addWatchTarget("./styles/");
  eleventyConfig.addPassthroughCopy("./scripts/");
  eleventyConfig.addWatchTarget("./scripts/");
  eleventyConfig.addPassthroughCopy("./admin/");
  eleventyConfig.addPlugin(eleventyImageTransformPlugin);
  eleventyConfig.addShortcode("hostname", function (url) {
    const hostname = new URL(url).hostname.replace("www.", "");
    return `<a href="${url}">${hostname}</a>`;
  });
}
