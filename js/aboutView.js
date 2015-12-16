var aboutView = {};

aboutView.index = function() {
  $('#repos').empty();
  $('#articles').hide();
  $('#about').show();

  if (aboutView.template) {
    aboutView.filter(aboutView.renderRepos);
  } else {
    $.get('/templates/repo.html', function(data, msg, xhr) {
      aboutView.template = Handlebars.compile(data);
      aboutView.filter(aboutView.renderRepos);
    });
  }
};

aboutView.renderRepos = function(repos) {
  repos.forEach(function(e) {
    $('#repos').append(aboutView.toHTML(e));
  });
  aboutView.ui();
};

aboutView.filter = function(callback) {
  var filtered = [];
  repos.all.forEach(function(e) {
    if (!e.fork) {
      filtered.push(e);
    }
  });
  aboutView.renderRepos(filtered);
};

aboutView.toHTML = function(repo) {
  repo.name = repo.name.charAt(0).toUpperCase() + repo.name.slice(1);
  repo.created_at = repo.created_at.slice(0, 10);
  repo.updated_at = repo.updated_at.slice(0, 10);
  return aboutView.template(repo);
};

aboutView.showRepoDetails = function() {
  $('.repotemplate').on('click', function() {
    $(this).children().toggle();
  });
};

aboutView.ui = function() {
  this.showRepoDetails();
};
