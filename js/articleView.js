articleView = {};

articleView.index = function() {
  articleView.render(Article.allArticles);
};

articleView.render = function(articles) {
  console.log(articles);
  $('#about').hide();
  $('#articles').empty().show();
  articles.forEach(function(e) {
    $('#articles').append(articleView.toHTML(e));
  });
  articleView.ui();
};

articleView.toHTML = function(article) {
  article.authorSlug = util.slug(article.author);
  article.age = Math.floor((new Date() - new Date(article.publishedOn)) / 86400000);
  return articleView.template(article);
};

articleView.showFiltered = function(articles) {
  console.log(articles);
  articleView.render(articles);
};

articleView.ui = function() {
  articleView.highlight();
  articleView.truncateArticles();
  articleView.getFilters();
  articleView.populateFilters();
  articleView.filterArticles();
  articleView.menuToggle();
};

articleView.highlight = function() {
  $('code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
};

articleView.truncateArticles = function() {
  $('.body').children(':nth-child(n+3)').hide();
  $('.read-on').on('click', function(e) {
    e.preventDefault();
    $(this).prev('.body').children().fadeIn();
    $(this).hide();
  });
};

articleView.getFilters = function() {
  Article.allArticles.forEach(function(a) {
    if (Article.authors.indexOf(a.author) === -1) {
      Article.authors.push(a.author);
    }
    if (Article.categories.indexOf(a.category) === -1) {
      Article.categories.push(a.category);
    }
  });
};

articleView.populateFilters = function() {
  Article.authors.forEach(function(a) {
    var $authFilter = $('#auFilter').clone();
    $authFilter.removeAttr('id');
    $authFilter.text(a);
    $('#filterAuthor').append($authFilter);
  });
  Article.categories.forEach(function(a) {
    var $catFilter = $('#catFilter').clone();
    $catFilter.removeAttr('id');
    $catFilter.text(a);
    $('#filterCategory').append($catFilter);
  });
};

articleView.filterArticles = function() {
  $('#filterAuthor').on('change', function() {
    $selection = util.slug(this.value);
    console.log($selection);
    $('#filterCategory').prop('selectedIndex', 0);
    page('/author/' + $selection);
  });

  $('#filterCategory').on('change', function() {
    $selection = this.value;
    $('#filterAuthor').prop('selectedIndex', 0);
    page('/category/' + $selection);
  });
};

articleView.menuToggle = function() {
  $('.icon-menu').on('click', function() {
    $('ul').slideToggle('slow');
  });
};
