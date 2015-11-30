var Article = function(opts) {
  this.author = opts.author;
  this.title = opts.title;
  this.body = opts.body;
  this.publishedOn = opts.publishedOn;
}

Article.prototype.toHTML = function() {
  return '<article>' +
  '<h1>' + this.title + '</h1>' +
  '</article>';
}
