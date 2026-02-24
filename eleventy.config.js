import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import { relativeDate } from "./scripts/relativeDate.js";

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./styles/");
  eleventyConfig.addWatchTarget("./styles/");
  eleventyConfig.addPassthroughCopy("./scripts/");
  eleventyConfig.addWatchTarget("./scripts/");
  eleventyConfig.addPassthroughCopy("./admin/");
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["avif", "jpeg"],
  });

  // Turns `https://www.imdb.com/title/tt12345` into `imdb.com`
  eleventyConfig.addShortcode("hostname", function (url) {
    const hostname = new URL(url).hostname.replace("www.", "");
    return `<a href="${url}">${hostname}</a>`;
  });

  eleventyConfig.addFilter("relative_date", (input) => {
    // Embed date into span element for easy retrieval at run time
    return `<span class="relative-date" data-date="${input}">${relativeDate(
      input,
    )}</span>`;
  });
}
