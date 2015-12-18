var util = {};

util.slug = function(str) {
  return str.replace(/\W/g, '-');
};
