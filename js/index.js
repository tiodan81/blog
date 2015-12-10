$(function() {
  blog.init();
  //blog.rawData no longer exists
  blog.publish();
  blog.truncateArticles();
  blog.populateFilters();
  blog.filterArticles();
  blog.tabNav();
  blog.menuToggle();
});
