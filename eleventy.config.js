import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";

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
  eleventyConfig.addShortcode("hostname", function (url) {
    const hostname = new URL(url).hostname.replace("www.", "");
    return `<a href="${url}">${hostname}</a>`;
  });

  eleventyConfig.addFilter("relative_date", (input) => {
    const difference = new Date(input) - Date.now();
    const rel = new Intl.RelativeTimeFormat("en", {
      style: "long",
      numeric: "auto",
    });

    const units = [
      { unit: "year", ms: 1000 * 60 * 60 * 24 * 365 },
      { unit: "week", ms: 1000 * 60 * 60 * 24 * 7 },
      { unit: "day", ms: 1000 * 60 * 60 * 24 },
      { unit: "hour", ms: 1000 * 60 * 60 },
      { unit: "minute", ms: 1000 * 60 },
    ];

    // Find the largest time unit that exceeds the corresponding ms thresholds
    const { unit, ms } =
      units.find(({ ms }) => Math.abs(diff) >= ms) ?? units.at(-1);
    return rel.format(Math.round(diff / ms), unit);
  });
}
