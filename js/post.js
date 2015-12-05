$('.newPost > p > *').on('focusout', function () {
  if (this.name == 'authorUrl') {
    $('.author').html('<a href="'+this.value+'">'+$('input[name="author"]')[0].value+'</a>');
  } else if (this.name == 'body'){
    $('.'+this.name).html(marked(this.value));
  } else {
    $('.'+this.name).text(this.value);
  };
});

$('input[name="publish"]').on('click', function () {
  if ($(this).is(':checked')) {
    var postObject = {};
    var elements = $('.newPost > p > *');
    for (var i = 0; i < elements.length; i++) {
      postObject[elements[i].name] = elements[i].value;
    }
    var date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth()+1;
    var d = date.getDate();
    date = y+'-'+m+'-'+d;
    postObject.publishedOn = date;
    console.log(postObject);
    $('#previewTarget').text(JSON.stringify(postObject));
  } else {
    $('#previewTarget').text('');
  }
});
