export default {
  tags: "review",
  dir: "review", // Used for permalinks
  layout: "reviewDetail.liquid",
  eleventyComputed: {
    title: (data) => data.topic,
    review: (data) =>
      // Ensures the template has a uniform object, even outside a for loop
      data.collections.review?.find((n) => n.url === data.page.url),
  },
};
