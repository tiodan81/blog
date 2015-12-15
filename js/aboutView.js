var aboutView = {};

aboutView.index = function() {
  var _renderRepos = function() {
    $('#articles').hide();
    $('#about').show();
    repos.all.forEach(function(e) {
      $('#repos').append(aboutView.toHTML(e));
    });
  };

  if (aboutView.template) {
    _renderRepos();
  } else {
    $.get('/templates/repo.html', function(data, msg, xhr) {
      aboutView.template = Handlebars.compile(data);
      _renderRepos();
    });
  }
};

aboutView.toHTML = function(repo) {
  repo.name = repo.name.charAt(0).toUpperCase() + repo.name.slice(1);
  repo.created_at = repo.created_at.slice(0, 10);
  repo.updated_at = repo.updated_at.slice(0, 10);
  return aboutView.template(repo);
};
