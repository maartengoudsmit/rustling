export default {
  pagination: {
    data: "collections.all",
    size: 1,
    alias: "tag",
    before: function (data) {
      const excluded = ["note", "review"];
      const tags = new Set();
      data.forEach((item) => {
        (item.data.tags || []).forEach((tag) => {
          if (!excluded.includes(tag)) tags.add(tag);
        });
      });
      return [...tags];
    },
    addAllPagesToCollection: false,
  },
  permalink: "/tag/{{ tag | downcase | slugify }}/",
};
