$(function() {
  webDB.init();
  blog.init();
  blog.getTemplate();
  blog.filterArticles();
  blog.tabNav();
  blog.menuToggle();
});
