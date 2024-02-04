Array.prototype.flatMap = function (callback) {
  return this.reduce((acc, cur) => {
    const mapped = callback(cur);
    return acc.concat(mapped);
  }, []);
}

Array.prototype.uniq = function () {
  return Array.from(new Set(this));
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("cssClassesForShowingCategory", function (value) {
    return value.concat(['any']).map(function (category) {
      return `data-[category=${category}]:block`;
    }).join(" ");
  });
  eleventyConfig.addFilter("searchFilterCategories", function (posts) {
    return ['any'].concat(posts.flatMap(function (post) {
      return post.categories;
    }));
  });
  eleventyConfig.addFilter("searchFiltersSort", function (array) {
    return array.sort((a, b) => {
      if (a === "any") return -1;
      if (b === "any") return 1;
      
      return a.localeCompare(b);
    });
  });
  eleventyConfig.addFilter("uniq", function (array) {
    return array.uniq();
  });
};

