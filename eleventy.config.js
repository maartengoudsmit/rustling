import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./styles/");
  eleventyConfig.addWatchTarget("./styles/");
  eleventyConfig.addPassthroughCopy("./scripts/");
  eleventyConfig.addWatchTarget("./scripts/");
  eleventyConfig.addPassthroughCopy("./admin/");
  eleventyConfig.addPlugin(eleventyImageTransformPlugin);
}
