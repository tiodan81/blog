//total articles, authors, words on blog
//avg word length across all posts
//avg word length by author

var stats = {

  pluck: function(property, arr) {
    return arr.map(function(e) {
      return e[property];
    });
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

  getWords: function(articles) {
    var allBodies = this.pluck('body', articles);
    var tempElem = document.createElement('div');
    tempElem.innerHTML = allBodies;
    var allWords = tempElem.textContent;
    return allWords;
  },


  totalArticles: function () {
    return $('<p>Total number of articles: ' + blog.articles.length + '</p>');
  },

  totalAuthors: function (articles) {
    var auth = this.pluck('author', articles);
    auth = this.unique(auth);
    return $('<p>Total number of authors: ' + auth.length + '</p>');
  },

  totalWords: function(words) {
    return $('<p>Total number of words: ' + words.length + '</p>');
  },

  displayStats: function(data) {
    $('#stats').append([
      '<h1>Fat Stats</h1>',
      this.totalArticles(data),
      this.totalAuthors(data),
      this.totalWords(this.getWords(data))
    ]);
  }
};

$(function() {
  var data = blog.getArticles(blog.rawData);
  stats.displayStats(data);
  blog.menuToggle();
});
