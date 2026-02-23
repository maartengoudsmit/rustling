export default {
  tags: "photo",
  layout: "photoDetail.liquid",
  permalink: "photos/{{page.fileSlug}}/",
  eleventyComputed: {
    review: (data) =>
      data.collections.photo?.find((n) => n.url === data.page.url),
  },
};
