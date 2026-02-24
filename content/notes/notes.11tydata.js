export default {
  tags: "note",
  type: "note",
  layout: "noteDetail.liquid",
  templateEngineOverride: "md",
  eleventyComputed: {
    note: (data) => data.collections.note?.find((n) => n.url === data.page.url),
  },
};
