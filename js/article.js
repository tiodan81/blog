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

Article.allArticles = [];
Article.authors = [];
Article.categories = [];

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
  webDB.execute([
    {
      sql: 'DELETE FROM articles WHERE id=?',
      data: [this.id]
    }
  ], callback);
};

Article.requestJSON = function (callback) {
  $.getJSON('/js/hackerIpsum.json', function (data) {
    data.forEach(function(e) {
      var article = new Article(e);
      Article.allArticles.push(article);
      article.insertRecord();
    });
    callback();
  });
};

Article.getDB = function (callback) {
  callback = callback || function() {};
  webDB.execute(
    'SELECT * FROM articles ORDER BY publishedOn DESC;',
    function(rows) {
      if (rows.length === 0) {
        Article.requestJSON(Article.getDB, callback);
      } else {
        rows.forEach(function(e) {
          Article.allArticles.push(new Article(e));
        });
        callback();
      }
    }
  );
};
