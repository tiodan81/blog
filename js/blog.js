var blog = {

  articles: [],
  authors: [],
  categories: [],

  init: function() {
    $.ajax({
      method: 'HEAD',
      url: 'js/hackerIpsum.json',
      success: function(data, msg, xhr) {
        var eTag = xhr.getResponseHeader('eTag');
        if (!localStorage.articlesEtag || localStorage.articlesEtag != eTag) {
          console.log('Cache miss.');
          localStorage.articlesEtag = eTag;
          blog.articles = [];
          webDB.execute(
            'DELETE FROM articles;'
            ,blog.getJSON);
        } else {
          console.log('Cache hit.');
          blog.getDB(blog.makeArticles);
        }
      }
    }).fail(function() {
      console.log('Epic fail. Ajax unsuccessful.');
    });
  },

  getJSON: function() {
    $.getJSON('js/hackerIpsum.json', blog.updateFromJSON);
  },

  updateFromJSON: function (data) {
    data.forEach(function(e) {
      var article = new Article(e);
      blog.articles.push(article);
      article.insertRecord();
    });
    blog.renderBlog();
  },

  getDB: function (callback) {
    callback = callback || function() {};
    webDB.execute(
      'SELECT * FROM articles ORDER BY publishedOn DESC;',
      callback);
  },

  makeArticles: function(arr) {
    arr.forEach(function(e) {
      blog.articles.push(new Article(e));
    });
    if ($('#articles').length) {
      blog.renderBlog();
    }
  },

  renderBlog: function() {
    blog.publish();
    blog.truncateArticles();
    blog.getFilters();
    blog.populateFilters();
    if (!blog.isAdmin()) {
      $('.editable').hide();
    }
  },

  publish: function() {
    blog.articles.forEach(function(e) {
      $('#articles').append(e.toHTML());
    });
    blog.highlight();
  },

  highlight: function() {
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

  getTemplate: function() {
    $.get('templates/article.handlebars', function(data, msg, xhr) {
      Article.prototype.template = Handlebars.compile(data);
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
  },

  isAdmin: function() {
    var params = window.location.search.substring(1).split('=');
    if (params[1] === 'true') {
      return true;
    } else {
      return false;
    }
  },

  watchPostForm: function() {
    $('.newPost > div > *').on('focusout', blog.buildPreview);
  },

  buildPreview: function() {
    var preview = blog.previewConstruct();
    $('#previewPost').html(preview.toHTML());
    $('.read-on').hide();
    blog.highlight();
  },

  previewConstruct: function() {
    return new Article({
      title: $('#edit-title').val(),
      author: $('#edit-author').val(),
      authorUrl: $('#edit-authorUrl').val(),
      category: $('#edit-category').val(),
      markdown: $('#edit-markdown').val(),
      publishedOn: new Date().toISOString().slice(0,10)
    });
  },

  prepPostExport: function() {
    $('#publishcheckbox:checked').on('click', function () {
      console.log('checked');
      // if ($(this).is(':checked')) {
      //   var postObject = {};
      //   var elements = $('.newPost > div > *');
      //   for (var i = 0; i < elements.length; i++) {
      //     if (elements[i].name == 'body') {
      //       postObject[elements[i].name] = marked(elements[i].value);
      //     } else {
      //       postObject[elements[i].name] = elements[i].value;
      //     }
      //   }
      //   var today = new Date().toISOString().slice(0,10);
      //   postObject.publishedOn = today;
      //   console.log(postObject);
      //   $('#previewTarget').text(JSON.stringify(postObject));
      // } else {
      //   $('#previewTarget').text('');
      // }
    });
  },

  initEditor: function() {
    var id = window.location.search.substring(1).split('=')[1];
    if (id) {
      webDB.execute(
        'SELECT * FROM articles WHERE id='+id
        ,blog.populateEditor);
    }
  },

  populateEditor: function(article) {
    var artToEdit = article[0];
    $('#edit-title').val(artToEdit.title);
    $('#edit-author').val(artToEdit.author);
    $('#edit-authorUrl').val(artToEdit.authorUrl);
    $('#edit-category').val(artToEdit.category);
    $('#edit-markdown').val(artToEdit.markdown);
  },
  // updateJSON: function() {
  //   var JSONoutput = '';
  //   blog.
  // },

  handleNewArticle: function() {
    $('#addButton').on('click', function() {
      var newArticle = blog.previewConstruct();
      newArticle.insertRecord(blog.updateJSON);
    });
  }
};
