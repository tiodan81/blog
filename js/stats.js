var stats = {

  pluck: function(property, arr, author) {
    author = author || null;
    if (!author) {
      return arr.map(function(e) {
        return e[property];
      });
    } else {
      var authArr = [];
      arr.forEach(function(e) {
        if (e['author'] == author) {
          authArr.push(e[property]);
        }
      });
      return authArr;
    }
  },

  unique: function (arr) {
    var length = arr ? arr.length : 0;
    if (!length) { return []; }
    var elems = [];
    arr.forEach(function(e) {
      if (elems.indexOf(e) === -1) {
        elems.push(e);
      }
    });
    return elems;
  },

  sum: function(arr) {
    return arr.reduce(function(start, num) {
      return start + num;
    });
  },

  average: function(arr) {
    return this.sum(arr) / arr.length;
  },

  erudition: function(words) {
    if (author == 'All Authors') {

    }
  },

  uniqueAuthors: function (articles) {
    var auth = this.pluck('author', articles);
    auth = this.unique(auth);
    return auth;
  },

  getWords: function(articles, author) {
    author = author || null;
    var allBodies = this.pluck('body', articles, author);
    var tempElem = document.createElement('div');
    tempElem.innerHTML = allBodies;
    var allWords = tempElem.textContent;
    return allWords;
  },

  totalWords: function(words) {
    return $('<p>Total number of words: ' + words.length + '</p>');
  },

  makeAuthorFilter: function(auth) {
    var component = $('<select name="authors">');
    component.append('<option>All Authors</option>');
    auth.forEach(function(e) {
      component.append('<option>' + e + '</option>');
    });
    return component;
  },

  displayStats: function(data) {
    $('#stats').append([
      '<h1>Fat Stats</h1>',
      '<p>Total number of articles: ' + blog.articles.length + '</p>',
      '<p>Total number of authors: ' + this.uniqueAuthors(data).length + '</p>',
      this.totalWords(this.getWords(data)),
      '<p>Select an author to view average word length:</p>',
      this.makeAuthorFilter(this.uniqueAuthors(data)),
      '<p>Average word length: '
    ]);
  },

  getAuthorWords: function(e) {
    this.getWords(data, e.target.value);

  },

  filterListen: function() {
    $('select').on('change', this.getAuthorWords);
    $('select').trigger('change');
  }
};

$(function() {
  var data = blog.getArticles(blog.rawData);
  stats.displayStats(data);
  stats.filterListen();
  blog.menuToggle();
});
