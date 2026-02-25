eleventyConfig.addGlobalData("eleventyComputed", {
  permalink(data) {
    if (data.draft && data.eleventy.env.runMode === "build") return false;
    return data.permalink;
  },
  eleventyExcludeFromCollections(data) {
    if (data.draft && data.eleventy.env.runMode === "build") return true;
    return data.eleventyExcludeFromCollections;
  },
});
