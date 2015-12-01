var blog = {
  getArticles: function(arr) {
    for (var i = 0; i < arr.length; i++) {
      blog.articles.push(new Article(arr[i]));
    }
    return blog.articles;
  },

  dateAndSort: function() {
    blog.articles.forEach(function(a) {
      a.daysAgo();
    });
    blog.articles = blog.articles.sort(function(a, b) {
      return a.age - b.age;
    });
  },

  publish: function() {
    blog.articles.forEach(function(a) {
      a.toHTML();
    });
  }
};

blog.articles = [];

$(document).ready(function() {
  blog.getArticles(blog.rawData);
  blog.dateAndSort();
  blog.publish();
});
