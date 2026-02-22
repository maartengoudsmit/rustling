export default {
  tags: "note",
  layout: "noteDetail.liquid",
  eleventyComputed: {
    note: (data) => data.collections.note?.find((n) => n.url === data.page.url),
  },
};
