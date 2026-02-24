export default {
  tags: "photo",
  dir: "photo", // Used for permalinks
  layout: "photoDetail.liquid",
  eleventyComputed: {
    photo: (data) =>
      // Ensures the template has a uniform object, even outside a for loop
      data.collections.photo?.find((n) => n.url === data.page.url),
  },
};
