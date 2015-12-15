var repos = {};

repos.all = [];

repos.requestAll = function(callback) {
  $.ajax({
    type: 'GET',
    url:'https://api.github.com/users/tiodan81/repos?sort=updated',
    headers: {Authorization: 'token ' + token}
  }).done(function(data) {
    console.log(data);
  });
};
