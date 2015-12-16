var repos = {};

repos.all = [];

repos.requestRepos = function(callback) {
  $.ajax({
    type: 'GET',
    url:'github/users/tiodan81/repos?sort=updated',
  }).done(function(data) {
    repos.all = data;
  }).done(callback);
};
