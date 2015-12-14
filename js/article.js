var Article = function (opts) {
  this.id = opts.id;
  this.title = opts.title;
  this.category = opts.category;
  this.author = opts.author;
  this.authorUrl = opts.authorUrl;
  this.publishedOn = opts.publishedOn;
  this.markdown = marked(opts.markdown);
  this.age = 0;
};

Article.prototype.template = '';

Article.prototype.toHTML = function() {
  this.age = Math.floor((new Date() - new Date(this.publishedOn)) / 86400000);
  return this.template(this);
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

Article.prototype.updateRecord = function(callback) {
  webDB.execute([
    {
      sql: 'UPDATE articles SET title=?, category=?, author=?, authorUrl=?, publishedOn=?, markdown=? WHERE id=?',
      data: [this.title, this.category, this.author, this.authorUrl, this.publishedOn, this.markdown, this.id]
    }
  ], callback);
};

Article.prototype.deleteRecord = function(callback) {
  webDB.execute(
    'DELETE FROM articles WHERE id='+this.id
    , callback);
};
