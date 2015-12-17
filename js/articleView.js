articleView = {};

articleView.index = function() {
  var _renderBlog = function() {
    $('#articles').show();
    $('#about').hide();
    Article.allArticles.forEach(function(e) {
      $('#articles').append(articleView.toHTML(e));
    });
    articleView.ui();
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

articleView.ui = function() {
  articleView.highlight();
  articleView.truncateArticles();
  articleView.getFilters();
  articleView.populateFilters();
  articleView.filterArticles();
  articleView.tabNav();
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
  console.log('FA');
  $('#filterAuthor').on('change', function() {
    $selection = this.value;
    $('#filterCategory').prop('selectedIndex', 0);
    $('.post').each(function() {
      var data = $(this).data('author');
      if ($selection == 'Filter by author') {
        $('.post').show();
      } else if (data != $selection) {
        $(this).hide();
      } else {
        $(this).show();
      }
    });
  });

  $('#filterCategory').on('change', function() {
    $selection = this.value;
    $('#filterAuthor').prop('selectedIndex', 0);
    $('.post').each(function() {
      var data = $(this).data('category');
      if ($selection == 'Filter by category') {
        $('.post').show();
      } else if (data != $selection) {
        $(this).hide();
      } else {
        $(this).show();
      }
    });
  });
};

articleView.tabNav = function() {
  $('.main-nav').on('click', '.tab', function(e){
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
  });
  $('.tab').trigger('click');
};

articleView.menuToggle = function() {
  $('.icon-menu').on('click', function() {
    $('ul').slideToggle('slow');
  });
};
