var stats = {

  data: [],

  pluck: function(property, arr, author) {
    author = author || null;
    console.log(property + arr + author);
    if (!author) {
      return arr.map(function(e) {
        console.log(e[property]);
        return e[property];
      });
    } else {
      var authArr = [];
      return arr.forEach(function(e) {
        if (e['author'] == author) {
          authArr.push(e[property]);
        }
      });
      console.log(authArr);
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


  uniqueAuthors: function (articles) {
    var auth = this.pluck('author', articles);
    auth = this.unique(auth);
    return auth;
  },

  getWords: function(articles, author) {
    author = author || null;
    console.log(author + articles);
    var allBodies = this.pluck('body', articles, author);
    console.log(allBodies);
    var tempElem = document.createElement('div');
    tempElem.innerHTML = allBodies;
    var allWords = tempElem.textContent;
    return allWords;
  },

  totalWords: function(words) {
    return $('<p>Total number of words: ' + words.length + '</p>');
  },

  wordLength: function(words) {
    console.log(words);
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

  displayStats: function(data) {
    $('#stats').append([
      '<h1>Fat Stats</h1>',
      '<p>Total number of articles: ' + this.data.length + '</p>',
      '<p>Total number of authors: ' + this.uniqueAuthors(data).length + '</p>',
      this.totalWords(this.getWords(data)),
      '<p>Select an author to view average word length:</p>',
      this.makeAuthorFilter(this.uniqueAuthors(data)),
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
  },

  init: function(data, msg, xhr) {
    if (xhr.status != 200) {
      console.log('Data not found.' + msg);
    } else {
      stats.data = data;
      stats.displayStats(stats.data);
      stats.filterListen(stats.data);
    }
  }
};

$(function() {
  $.getJSON('js/blogArticles.json')
    .done(stats.init);
  blog.menuToggle();
});
