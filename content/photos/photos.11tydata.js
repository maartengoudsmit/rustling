export default {
  tags: "photo",
  type: "photo",
  layout: "photoDetail.liquid",
  eleventyComputed: {
    photo: (data) =>
      data.collections.photo?.find((n) => n.url === data.page.url),
  },
};
