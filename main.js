$(document).ready(function() {


  $("#index1Box").hide();
  $("#index2Box").hide();
  $("#index3Box").hide();


  $('[id*="show1"]').click(function(e) {
    e.preventDefault();
    $(this).next('div').fadeIn();
    $('body, html').animate({
      scrollTop: $(this).offset().top - $('#indexTitle').height()
    }, 500)
  });

  $('[id*="show2"]').click(function(e) {
    e.preventDefault();
    $(this).next('div').fadeIn();
    $('body, html').animate({
      scrollTop: $(this).offset().top - $('#indexTitle').height()
    }, 500)
  });

  $('[id*="show3"]').click(function(e) {
    e.preventDefault();
    $(this).next('div').fadeIn();
    $('body, html').animate({
      scrollTop: $(this).offset().top - $('#indexTitle').height()
    }, 500)
  });


});
