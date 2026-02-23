import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./styles/");
  eleventyConfig.addWatchTarget("./styles/");
  eleventyConfig.addPassthroughCopy("./scripts/");
  eleventyConfig.addWatchTarget("./scripts/");
  eleventyConfig.addPassthroughCopy("./admin/");
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["avif", "jpeg"],
  });
  eleventyConfig.addShortcode("hostname", function (url) {
    const hostname = new URL(url).hostname.replace("www.", "");
    return `<a href="${url}">${hostname}</a>`;
  });

  eleventyConfig.addFilter("relative_date", (input) => {
    const date = new Date(input);
    const pastDate = new Date(date);
    const difference = pastDate - Date.now();
    const rel = new Intl.RelativeTimeFormat("en", {
      style: "long",
      numeric: "auto",
    });
    const relString = (formatter, value, unit) =>
      `${formatter.format(Math.round(value), unit)}`;

    const seconds = difference / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const weeks = days / 7;
    const years = days / 365;

    if (years < -1) return relString(rel, years, "year");
    else if (weeks < -1) return relString(rel, weeks, "week");
    else if (days < -1) return relString(rel, days, "day");
    else if (hours < -1) return relString(rel, hours, "hour");
    else return relString(rel, minutes, "minute");
  });
}
