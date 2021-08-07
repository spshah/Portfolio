/*$num = $('.my-card').length;
$even = $num / 2;
$odd = ($num + 1) / 2;
$card_no = $num % 2 == 0 ? $even : $odd;
$default_card = $('.my-card:nth-child(' + $card_no + ')');
$default_card.addClass('active');
$default_card.prev().addClass('prev');
$default_card.next().addClass('next');
$('#project-info-'+ $card_no).css("display", "block");
$('#project-info-'+ $card_no).addClass("project_info");



$('.my-card').click(function() {
  var card_no;
  $slide = $('.active').width();
  console.log($('.active').position().left);;

  if ($(this).hasClass('next')) {
    $('.card-carousel').stop(false, true).animate({left: '-=' + $slide});

  } else if ($(this).hasClass('prev')) {
    $('.card-carousel').stop(false, true).animate({left: '+=' + $slide});
  }

  $(this).removeClass('prev next');
  $(this).siblings().removeClass('prev active next project_info');

  $(this).addClass('active');

  card_no = (parseInt($(this).attr("ID")[13]) % $num ).toString();
  $('#project-info-'+card_no).css("display", "block");
  $('#project-info-'+card_no).addClass("project_info");


  if( typeof $(this).prev() !== "undefined")
  {
    $(this).prev().addClass('prev');
    card_no = $(this).prev().attr("ID")[13];
    $('#project-info-'+card_no).css("display", "none");
    $('#project-info-'+card_no).removeClass("project_info");
  }

  if( typeof $(this).next() !== "undefined")
  {
    $(this).next().addClass('next');
    card_no = $(this).next().attr("ID")[13];
    $('#project-info-'+card_no).css("display", "none");
    $('#project-info-'+card_no).removeClass("project_info");
  }



});


// Keyboard nav
$('html body').keydown(function(e) {
  if (e.keyCode == 37) { // left
    $('.active').prev().trigger('click');
  }
  else if (e.keyCode == 39) { // right
    $('.active').next().trigger('click');
  }
});








*/




$len = $('.my-card').length;
$even = $len / 2;
$odd = ($len + 1) / 2;
$card_no = $len % 2 == 0 ? $even : $odd;
$default_card = $('.my-card:nth-child(' + $card_no + ')');
$next_card = $('.my-card:nth-child(' + ( $card_no + 1) + ')');
$prev_card = $('.my-card:nth-child(' + ( $card_no - 1) + ')');
$default_card.addClass('active');
$prev_card.addClass('prev');
$next_card.addClass('next');
$('#project-info-'+ $card_no).css("display", "block");
$('#project-info-'+ $card_no).addClass("project_anim");


$('.my-card').click(function() {
  var card_no = parseInt($(this).attr('id')[13]);
  console.log(card_no);
  console.log($(this).attr('id'));
  $slide = $('.active').width();
  if ($(this).hasClass('next'))
  {
    $('.card-carousel').stop(false, true).animate({left: '-=' + $slide});
  } else if ($(this).hasClass('prev')) {
    $('.card-carousel').stop(false, true).animate({left: '+=' + $slide});
  }

  $(this).removeClass('prev next');
  $(this).siblings().removeClass('prev active next project_anim');
  $(this).addClass('active');


  $('.project_info:nth-child(' + card_no + ')').css("display", "block");
  $('.project_info:nth-child(' + card_no + ')').addClass("project_anim");



  if(card_no != 1)
  {
    $prev_card = $('.project_info:nth-child(' + (card_no - 1).toString() + ')');
    console.log("prev card: ");
     console.log($prev_card);
    $prev_card.css("display", "none");
    $prev_card.removeClass("project_anim");
    $('.my-card:nth-child(' + ( card_no - 1) + ')').addClass('prev');
    console.log($('.my-card:nth-child(' + ( card_no - 1) + ')'));
  }

  if(card_no != $len)
  {
    $next_card = $('.project_info:nth-child(' + ( card_no + 1).toString() + ')');
      console.log("next card: ");
    console.log($next_card);
    $next_card.css("display", "none");
    $next_card.removeClass("project_anim");
    $('.my-card:nth-child(' + ( card_no + 1) + ')').addClass('next');
    console.log($('.my-card:nth-child(' + ( card_no + 1) + ')'));
  }
});


/*

  card_no = (parseInt($(this).attr("ID")[13]) % $num ).toString();
  $('#project-info-'+card_no).css("display", "block");
  $('#project-info-'+card_no).addClass("project_info");


  if( typeof $(this).prev() !== "undefined")
  {
    $(this).prev().addClass('prev');
    card_no = $(this).prev().attr("ID")[13];
    $('#project-info-'+card_no).css("display", "none");
    $('#project-info-'+card_no).removeClass("project_info");
  }

  if( typeof $(this).next() !== "undefined")
  {
    $(this).next().addClass('next');
    card_no = $(this).next().attr("ID")[13];
    $('#project-info-'+card_no).css("display", "none");
    $('#project-info-'+card_no).removeClass("project_info");
  }
  */



// Keyboard nav
$('html body').keydown(function(e) {
  if (e.keyCode == 37) { // left
    $('.active').prev().trigger('click');
  }
  else if (e.keyCode == 39) { // right
    $('.active').next().trigger('click');
  }
});
