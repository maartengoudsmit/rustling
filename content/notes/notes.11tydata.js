export default {
  tags: "note",
  type: "note",
  layout: "noteDetail.liquid",
  // permalink: "notes/{{page.fileSlug}}/",
  eleventyComputed: {
    note: (data) => data.collections.note?.find((n) => n.url === data.page.url),
  },
};
