export default {
  tags: "note",
  layout: "noteDetail.liquid",
  permalink: "notes/{{page.fileSlug}}/",
  eleventyComputed: {
    note: (data) => data.collections.note?.find((n) => n.url === data.page.url),
  },
};
