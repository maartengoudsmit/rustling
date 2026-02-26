export default {
  tags: "note",
  dir: "note", // Used for permalinks
  layout: "noteDetail.liquid",
  // Prevent template engine from interpreting HTML and Javascript in Markdown files
  // templateEngineOverride: "md",
  eleventyComputed: {
    // Ensures the template has a uniform object, even outside a for loop
    note: (data) => data.collections.note?.find((n) => n.url === data.page.url),
  },
};
