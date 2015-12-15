articleView = {};

articleView.index = function() {
  var _renderBlog = function() {
    $('#articles').show();
    $('#about').hide();
    Article.allArticles.forEach(function(e) {
      $('#articles').append(articleView.toHTML(e));
    });
  };

  if (articleView.template) {
    _renderBlog();
  } else {
    $.get('/templates/article.html', function(data, msg, xhr) {
      articleView.template = Handlebars.compile(data);
      _renderBlog();
    });
  }
};

articleView.toHTML = function(article) {
  article.age = Math.floor((new Date() - new Date(article.publishedOn)) / 86400000);
  return articleView.template(article);
};

articleView.about = function() {
  $('#articles').hide();
  $('#about').show();
};
