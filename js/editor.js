$('.newPost > div > *').on('focusout', function () {
  if (this.name == 'authorUrl') {
    $('.author').html('<a href="'+this.value+'">'+$('input[name="author"]')[0].value+'</a>');
  } else if (this.name == 'body'){
    $('.'+this.name).html(marked(this.value));
    $('code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
  } else {
    $('.'+this.name).text(this.value);
  };
});

$('input[name="publish"]').on('click', function () {
  if ($(this).is(':checked')) {
    var postObject = {};
    var elements = $('.newPost > div > *');
    for (var i = 0; i < elements.length; i++) {
      if (elements[i].name == 'body') {
        postObject[elements[i].name] = marked(elements[i].value);
      } else {
        postObject[elements[i].name] = elements[i].value;
      }
    }
    var date = new Date().toISOString().slice(0,10);
    postObject.publishedOn = date;
    console.log(postObject);
    $('#previewTarget').text(JSON.stringify(postObject));
  } else {
    $('#previewTarget').text('');
  }
});

$(function() {
  webDB.init();
});
