articleController = {};

articleController.initIndex = function() {
  console.log('router recognized');
  $.ajax({
    method: 'HEAD',
    url: 'js/hackerIpsum.json',
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
