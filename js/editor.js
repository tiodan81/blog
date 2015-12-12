$(function() {
  webDB.init();
  blog.getTemplate();
  blog.watchEditForm();
  blog.prepPostExport();
  blog.handleNewArticle();
});


  // function () {
  //   if (this.name == 'authorUrl') {
  //     $('.author').html('<a href="'+this.value+'">'+$('input[name="author"]')[0].value+'</a>');
  //   } else if (this.name == 'body'){
  //     $('.'+this.name).html(marked(this.value));
  //     $('code').each(function(i, block) {
  //       hljs.highlightBlock(block);
  //     });
  //   } else {
  //     $('.'+this.name).text(this.value);
  //   };
  // });
