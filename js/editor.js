$(function() {
  webDB.init();
  blog.getDB();
  blog.getTemplate();
  blog.initEditor();
  blog.handlePostForm();
  blog.handleNewButton();
});
