function slugify(title, body, wordLimit = 5) {
  let text = "";
  text = title && title !== "" ? title : body;
  if (!text) return "";

  return text
    .split(/\s+/)
    .slice(0, wordLimit)
    .join(" ")
    .toString()
    .toLowerCase()
    .trim()
    .normalize("NFD") // decompose accented chars
    .replace(/[\u0300-\u036f]/g, "") // strip diacritics (café → cafe)
    .replace(/[^\w\s-]/g, "") // remove non-word chars
    .replace(/[\s_]+/g, "-") // spaces/underscores → hyphens
    .replace(/^-+|-+$/g, ""); // trim leading/trailing hyphens
}

export default {
  eleventyComputed: {
    permalink: (data) => {
      // Eleventy runs all computed properties once without the data object
      // If we don't guard against this possibility, the build crashes
      const slug = slugify(data.title, data.page.rawInput);
      const d = new Date(data.published);
      if (!slug || !d) return undefined; // let Eleventy fall back to default
      return `${data.dir}/${d.getFullYear()}-${
        d.getMonth() + 1
      }-${d.getDate()}-${slugify(data.title, data.page.rawInput)}/`;
    },
  },
};
