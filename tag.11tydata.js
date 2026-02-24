export default {
  pagination: {
    data: "collections.all",
    size: 1,
    alias: "tag",
    before: function (data) {
      const excluded = ["note", "review", "photo"];
      const tags = new Set();
      data.forEach((item) => {
        (item.data.tags || []).forEach((tag) => tags.add(tag));
      });
      return [...tags];
    },
    filter: ["note", "review", "photo"],
    addAllPagesToCollection: false,
  },
  permalink: "/tag/{{ tag | downcase | slugify }}/",
};
