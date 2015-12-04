var Article = function(opts) {
  this.title = opts.title;
  this.category = opts.category;
  this.author = opts.author;
  this.authorUrl = opts.authorUrl;
  this.publishedOn = opts.publishedOn;
  this.body = opts.body;
  this.age = 0;
};

Article.prototype.daysAgo = function() {
  var today = new Date();
  var posted = new Date(this.publishedOn);
  var diff = today.getTime() - posted.getTime();
  diff = Math.floor(diff / 86400000);
  this.age = diff;
};
