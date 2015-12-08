//total articles, authors, words on blog
//avg word length across all posts
//avg word length by author

//totalArticles = blog.articles.length
//totalAuthors = blog.authors.length;
//totalWords

var stats = {
  allWords: [],

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
        elems.push[e];
      }
    });
    return elems;
  },

  sum: function (arr) {
    return arr.reduce(function(start, num) {
      return start + num;
    });
  },

  average: function(arr) {
    return this.sum(arr) / arr.length;
  },

  getWords: function(articles[, author]) {
    blog.articles.forEach(function(a) {
      //get body text
      //concat array of words
      //arrWords.map('str'.length)
      //get average
    });
    return allWords;
  },

  displayStats: function() {

  }
};

$(function() {
  blog.getArticles(blog.rawData);
});
