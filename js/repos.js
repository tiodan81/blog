var repos = {};

repos.all = [];

repos.requestAll = function(callback) {
  console.log(token);
  $.ajax({
    type: 'GET',
    url:'https://api.github.com/users/tiodan81/repos?sort=updated',
    headers: {Authorization: 'token ' + token}
  }).done(function(data) {
    repos.all = data;
  }).done(callback);
};
