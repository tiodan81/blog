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


  uniqueAuthors: function (articles) {
    var auth = this.pluck('author', articles);
    auth = this.unique(auth);
    return auth;
  },

  totalWords: function(articles) {
    var allBodies = this.pluck('markdown', articles);
    return this.sum(allBodies.map(stats.splitWords));
  },

  splitWords: function(article) {
    return article.split(' ');
  },

  wordLength: function(words) {
    //console.log(words);
    return words.map(function(e) {
      return e.length();
    });
  },

  makeAuthorFilter: function(auth) {
    var component = $('<select name="authors">');
    component.append('<option>All Authors</option>');
    auth.forEach(function(e) {
      component.append('<option>' + e + '</option>');
    });
    return component;
  },

  getArticlesByAuthor: function(auth) {
    webDB.execute(
      [
        {
          sql: 'SELECT * FROM articles WHERE author=?;',
          data: [auth]
        }
      ]
    );
  },

  displayStats: function(data) {
    $('#stats').append([
      '<h1>Fat Stats</h1>',
      '<p>Total number of articles: ' + data.length + '</p>',
      '<p>Total number of authors: ' + this.uniqueAuthors(data).length + '</p>',
      '<p>Total number of words: ' + this.totalWords(data).length + '</p>',
      '<p>Average word length (whole site): ',
      //'<p>Select an author to view average word length:</p>',
      this.makeAuthorFilter(this.uniqueAuthors(data))
      //showErudition for all authors
    ]);
  },

  showErudition: function(e) {
    console.log(e.target.value + stats.data);
    var words = stats.getWords(this.data, e.target.value);
    console.log(words);
    words = words.split(' ');
    var lengths = stats.wordLength(words);
    var avgLength = this.average(lengths);
    $('#stats').append('<p>Average word length: ' + avgLength + '</p>');
  },

  filterListen: function() {
    $('select').on('change', this.showErudition);
    //$('select').trigger('change');
  }
};

$(function() {
  webDB.init();
  blog.init();
  stats.filterListen();
  blog.menuToggle();
});
