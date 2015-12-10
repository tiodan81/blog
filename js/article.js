// var Article = function(opts) {
//   Object.keys(opts).forEach(function(e, index, keys) {
//     this[e] = opts[e];
//   },this);
//
//   this.markdown = opts.body || marked(this.markdown);
// };

var Article = function (opts) {
  this.title = opts.title;
  this.category = opts.category;
  this.author = opts.author;
  this.authorUrl = opts.authorUrl;
  this.publishedOn = opts.publishedOn;
  this.markdown = marked(opts.markdown);
  this.age = 0;
};

Article.prototype.daysAgo = function() {
  var today = new Date();
  var posted = new Date(this.publishedOn);
  var diff = today.getTime() - posted.getTime();
  diff = Math.floor(diff / 86400000);
  this.age = diff;
};

Article.prototype.insertRecord = function(callback) {
  webDB.execute(
    [
      {
        sql: 'INSERT INTO articles (title, category, author, authorUrl, publishedOn, markdown) VALUES (?, ?, ?, ?, ?, ?)',
        data: [this.title, this.category, this.author, this.authorUrl, this.publishedOn, this.markdown]
      }
    ]
  , callback);
};
