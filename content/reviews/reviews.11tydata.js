export default {
  tags: "review",
  type: "review",
  layout: "reviewDetail.liquid",
  // permalink: "reviews/{{page.fileSlug}}/",
  eleventyComputed: {
    title: (data) => data.topic,
    review: (data) =>
      data.collections.review?.find((n) => n.url === data.page.url),
  },
};
