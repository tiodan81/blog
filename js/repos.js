var repos = {};

repos.all = [];

repos.requestRepos = function(callback) {
  $.ajax({
    type: 'GET',
    url:'https://api.github.com/users/tiodan81/repos?sort=updated',
    headers: {Authorization: 'token ' + token}
  }).done(function(data) {
    repos.all = data;
  }).done(callback);
};
