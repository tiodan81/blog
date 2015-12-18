articleController = {};

articleController.initIndex = function() {
  $.ajax({
    method: 'HEAD',
    url: '/js/hackerIpsum.json',
    success: function(data, msg, xhr) {
      var eTag = xhr.getResponseHeader('eTag');
      if (!localStorage.articlesEtag || localStorage.articlesEtag != eTag) {
        console.log('Cache miss.');
        localStorage.articlesEtag = eTag;
        Article.allArticles = [];
        webDB.execute(
          'DELETE FROM articles;'
          ,Article.requestJSON(articleView.index));
      } else {
        console.log('Cache hit.');
        Article.getDB(articleView.index);
      }
    }
  }).fail(function() {
    console.log('Epic fail. Ajax unsuccessful.');
  });
};

articleController.category = function(ctx, next) {
  var categoryData = function(data) {
    ctx.articles = data;
    next();
  };
  Article.findByCategory(ctx.params.category, categoryData);
};

articleController.author = function(ctx, next) {
  var authorData = function(data) {
    console.log(data);
    ctx.articles = data;
    next();
  };
  console.log(ctx);
  Article.findByAuthor(ctx.params.author, authorData);
};

articleController.show = function(ctx, next) {
  console.log(ctx.articles);
  articleView.showFiltered(ctx.articles);
};

articleController.template = function(ctx, next) {
  if (articleView.template) {
    next();
  } else {
    $.get('/templates/article.html', function(data, msg, xhr) {
      articleView.template = Handlebars.compile(data);
      next();
    });
  }
};
