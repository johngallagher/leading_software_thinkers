const appConfig = {
  anyFilter: "any"
};


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
    return value.concat([appConfig.anyFilter]).map(function (category) {
      return `data-[category=${category}]:block`;
    }).join(" ");
  });
  eleventyConfig.addFilter("searchFilterCategories", function (posts) {
    return [appConfig.anyFilter].concat(posts.flatMap(function (post) {
      return post.categories;
    }));
  });
  eleventyConfig.addFilter("searchFiltersSort", function (array) {
    return array.sort((a, b) => {
      if (a === appConfig.anyFilter) return -1;
      if (b === appConfig.anyFilter) return 1;
      
      return a.localeCompare(b);
    });
  });
  eleventyConfig.addFilter("uniq", function (array) {
    return array.uniq();
  });
  eleventyConfig.addFilter("humanize", function (str) {
    return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  });
  eleventyConfig.addFilter("toWidthClass", function(length) {
    if (length == 1 || length == 2) {
      return "w-full";
    } else {
      return "w-1/" + (length - 1);
    }
  });
};

