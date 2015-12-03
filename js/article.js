var Article = function(opts) {
  this.title = opts.title;
  this.category = opts.category;
  this.author = opts.author;
  this.authorUrl = opts.authorUrl;
  this.publishedOn = opts.publishedOn;
  this.body = opts.body;
  this.age = 0;
};

Article.prototype.toHTML = function() {
  var templateScript = $('#template').html();
  var compiledTemplate = Handlebars.compile(templateScript);
  var compiledArticle = compiledTemplate(blog);
  
  $('#articles').append(compiledArticle);
};
// Article.prototype.toHTML = function() {
//   var $newPost = $('#template').clone();
//   $newPost.addClass('post');
//   $newPost.removeAttr('id');
//   $newPost.find('.title').text(this.title);
//   $newPost.find('.category').text(this.category);
//   var url = this.authorUrl;
//   var author = this.author;
//   $newPost.find('.author').html(function() {
//     return 'by <a href="' + url + '">' + author + '</a>';
//   });
//   var age = this.age;
//   $newPost.find('.age').html(function() {
//     return 'Published ' + age + ' days ago';
//   });
//   $newPost.find('.body').html(this.body);
//   $newPost.data('info', {author: author, category: this.category});
//   $('#articles').append($newPost);
// };

Article.prototype.daysAgo = function() {
  var today = new Date();
  var posted = new Date(this.publishedOn);
  var diff = today.getTime() - posted.getTime();
  diff = Math.floor(diff / 86400000);
  this.age = diff;
};
