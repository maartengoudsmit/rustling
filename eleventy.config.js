import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import { relativeDate } from "./scripts/relativeDate.js";
import Prism from "prismjs";

export default function (eleventyConfig) {
  eleventyConfig.addPreprocessor("drafts", "*", (data, content) => {
    if (data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
      return false;
    }
  });

  eleventyConfig.addPassthroughCopy("./styles/");
  eleventyConfig.addWatchTarget("./styles/");
  eleventyConfig.addPassthroughCopy("./scripts/");
  eleventyConfig.addWatchTarget("./scripts/");
  eleventyConfig.addPassthroughCopy("./admin/");

  Prism.languages.htmlbars = Prism.languages.html;
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["avif", "jpeg"],
  });

  // Turns `https://www.imdb.com/title/tt12345` into `imdb.com`
  eleventyConfig.addShortcode("hostname", function (url) {
    const hostname = new URL(url).hostname.replace("www.", "");
    return `<a href="${url}">${hostname}</a>`;
  });

  eleventyConfig.addPairedShortcode("interactive", (content, title) => {
    return `<div class="interactive-demo">
     ${title ? `<span class="demo-label">${title}</span>` : ""}
     ${content}
   </div>`;
  });

  eleventyConfig.addFilter("relative_date", (input) => {
    // Embed date into span element for easy retrieval at run time
    return `<span class="relative-date" data-date="${input}">${relativeDate(
      input,
    )}</span>`;
  });

  const siteUrl = "https://timecrowave.neocities.org";
  eleventyConfig.addFilter("absolute_url", (url) => {
    if (!url) return siteUrl;
    return new URL(url, siteUrl).href;
  });

  // Wraps text in a div element with a custom class name
  // The div element can optionally be another element (e.g. h2)
  eleventyConfig.addFilter("class", (content, className, element = "div") => {
    return `<${element} class="${className}">${content}</${element}>`;
  });
}
