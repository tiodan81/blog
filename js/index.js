$(function() {
  blog.getArticles(blog.rawData);
  blog.getFilters();
  blog.dateAndSort();
  blog.publish();
  blog.truncateArticles();
  blog.populateFilters();
  blog.filterArticles();
  blog.tabNav();
  blog.menuToggle();
});
