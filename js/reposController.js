var reposController = {};

reposController.index = function() {
  repos.requestRepos(aboutView.index);
};
