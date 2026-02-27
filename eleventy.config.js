import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import { relativeDate } from "./scripts/relativeDate.js";
import Prism from "prismjs";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";

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

  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom", // or "rss", "json"
    outputPath: "/feed.xml",
    collection: {
      name: "all", // iterate over `collections.posts`
      limit: 0, // 0 means no limit
    },
    metadata: {
      language: "en",
      title: "The Rustling of the Leaves",
      subtitle: "",
      base: "https://timecrowave.neocities.org/",
      author: {
        name: "Maarten Goudsmit",
        email: "", // Optional
      },
    },
  });

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

  // Wraps text in a div element with a custom class name
  // The div element can optionally be another element (e.g. h2)
  eleventyConfig.addFilter("class", (content, className, element = "div") => {
    return `<${element} class="${className}">${content}</${element}>`;
  });
}
