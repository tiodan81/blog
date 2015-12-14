$(function() {
  webDB.init();
  blog.getTemplate();
  blog.initEditor();
  blog.watchPostForm();
  blog.prepPostExport();
  blog.handleNewButton();
});
