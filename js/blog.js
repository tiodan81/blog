var blog = {
  getArticles: function(arr) {
    for (var i = 0; i < arr.length; i++) {
      blog.articles.push(new Article(arr[i]));
    }
    return blog.articles;
  },

  dateAndSort: function() {
    blog.articles.forEach(function(a) {
      a.daysAgo();
    });
    blog.articles = blog.articles.sort(function(a, b) {
      return a.age - b.age;
    });
  },

  publish: function() {
    blog.articles.forEach(function(a) {
      a.toHTML();
    });
    $('#template').remove();
  },

  hideArticles: function() {
    var $ps = $('.body p:not(:first-child)');
    console.log($ps);
    $('.body p:not(:first-child)').hide();
    $('.read-on').on('click', function(e) {
      e.preventDefault();
      $(this).parent().find('p').fadeIn();
      $(this).hide();
    });
  }
};

blog.articles = [];

$(function() {
  blog.getArticles(blog.rawData);
  blog.dateAndSort();
  blog.publish();
  blog.hideArticles();
});
