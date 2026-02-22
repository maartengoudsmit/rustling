export default {
  tags: "review",
  layout: "reviewDetail.liquid",
  permalink: "reviews/{{page.fileSlug}}/",
  eleventyComputed: {
    review: (data) =>
      data.collections.review?.find((n) => n.url === data.page.url),
  },
};
