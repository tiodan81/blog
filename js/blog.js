var blog = {
  getArticles: function(arr) {
    for (var i = 0; i < arr.length; i++) {
      this.articles.push(new Article(arr[i]));
    }
    return this.articles;
  },

  getFilters: function() {
    this.articles.forEach(function(a) {
      if (blog.authors.indexOf(a.author) === -1) {
        blog.authors.push(a.author);
      }
      if (blog.categories.indexOf(a.category) === -1) {
        blog.categories.push(a.category);
      }
    });
  },

  dateAndSort: function() {
    this.articles.forEach(function(a) {
      a.daysAgo();
    });
    this.articles = this.articles.sort(function(a, b) {
      return a.age - b.age;
    });
  },

  publish: function() {
    var templateScript = $('#template').html();
    var compiledTemplate = Handlebars.compile(templateScript);
    var compiledArticle = compiledTemplate(this);
    $('#articles').append(compiledArticle);
    marked($('.body').html());
    $('code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
  },

  truncateArticles: function() {
    $('.body p:not(:first-child)').hide();
    $('.read-on').on('click', function(e) {
      e.preventDefault();
      $(this).parent().find('p').fadeIn();
      $(this).hide();
    });
  },

  populateFilters: function() {
    blog.authors.forEach(function(a) {
      var $authFilter = $('#auFilter').clone();
      $authFilter.removeAttr('id');
      $authFilter.text(a);
      $('select[name="filterAuthor"]').append($authFilter);
    });
    blog.categories.forEach(function(a) {
      var $catFilter = $('#catFilter').clone();
      $catFilter.removeAttr('id');
      $catFilter.text(a);
      $('select[name="filterCategory"]').append($catFilter);
    });
  },

  filterArticles: function() {
    $('select[name="filterAuthor"]').on('change', function() {
      $selection = this.value;
      $('select[name="filterCategory"]').prop('selectedIndex', 0);
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

    $('select[name="filterCategory"]').on('change', function() {
      $selection = this.value;
      $('select[name="filterAuthor"]').prop('selectedIndex', 0);
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
  },

  tabNav: function() {
    $('.main-nav').on('click', '.tab', function(e){
      $('.tab-content').hide();
      $('#' + $(this).data('content')).fadeIn();
    });
    $('.tab').trigger('click');
  },

  menuToggle: function() {
    $('.icon-menu').on('click', function() {
      $('ul').slideToggle('slow');
    });
  }
};

blog.articles = [];
blog.authors = [];
blog.categories = [];

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
