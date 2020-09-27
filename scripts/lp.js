/*
 * Stuff to do:
 * OK - Add code for Next and Back buttons
 * OK - Add code to lpcover click to update Prev/Next buttons
 * OK - Add block for Album details
 * OK - Move lpcoverbox up to top of wrapper
 * Add Drupal variables
 * http://drupal.stackexchange.com/questions/21566/how-to-pass-php-variables-to-javascript-jquery
 *
 */

$(function() {

  // Set counters for setTimeout functions
  var counter = $('.lpcover').length;
  var dropCounter = counter*5;
  var spreadCounter = counter*275;
  var activated = 0;

  // Move each cover 5px left and set display order so first is on top
  for(i = counter;i >= 0; i--) {
    var firstShift = (i*5) + "px";
   $('.lpcover').eq(i).css({ 'left': firstShift, 'z-index': 20-i});
  }

setTimeout(function() { dropCovers(); }, dropCounter);
setTimeout(function() { spreadCovers(); }, spreadCounter);

  $('.lpcover').on('click', function() {
    $(this).toggleClass('activeCov');
    $(this).siblings().removeClass('activeCov');
    var clickedCover = $(this).index();
    $('.artist-name').html(clickedCover);

    /* Disable Prev button when first lp cover is clicked */
    if (clickedCover === 0) {
      if (!$('.prevBtn').hasClass('off')) {
        $('.prevBtn').addClass('off');
      }
      if ($('.nextBtn').hasClass('off')) {
        $('.nextBtn').removeClass('off');
      }
    }

    /* Disable Next button when last lp cover is clicked */
    if (clickedCover === 19) {
      if ($('.prevBtn').hasClass('off')) {
        $('.prevBtn').removeClass('off');
      }
      if (!$('.nextBtn').hasClass('off')) {
        $('.nextBtn').addClass('off');
      }
    }

    /*
    * Activate both Next and Prev buttons when  lp cover
    * other than first or last is selected
    */
    if (clickedCover > 0 && clickedCover <19) {
        $('.prevBtn').removeClass('off');
        $('.nextBtn').removeClass('off');
    }
  });

  $('.prevBtn').on('click', prevBtn);
  $('.nextBtn').on('click', nextBtn);

});

 /* Set function to spread covers out to the left */
  function dropCovers() {
    var dropCount = $('.lpcover').length;
    for(i = dropCount; i >= 0; i--) {
      var delayTime = i*250;
      $('.lpcover').eq(dropCount-i).delay(delayTime).queue(function (next) {
        $(this).removeClass('initial').css('opacity', '.8');
        next();
      });
    }
  }

 /* Set function to spread covers out to the left */
  function spreadCovers() {
    if($('.lpcover').length > 0) {
      var counter = $('.lpcover').length;
      for(i=0;i < counter; i++) {
        var shiftLeft = (i*40) + "px";
       $('.lpcover').eq(i).css({ 'left': shiftLeft, 'opacity': 1 });
      }
    }
  }

  /* Set functions for next and previous buttons */
  function nextBtn() {
    if ($('.lpcover.activeCov').length) {
      activated = $('.lpcover.activeCov').index();
    }

    console.log(activated + 1);

    $('.artist-name').html(activated + 1);

    if (activated === 0) {
      $('.lpcover').eq(activated).removeClass('activeCov');
      $('.lpcover').eq(activated + 1).addClass('activeCov');
      if ($('.prevBtn').hasClass('off')) {
        $('.prevBtn').removeClass('off');
      }
    }

    if (activated > 0 && activated < 18) {
      $('.lpcover').eq(activated).removeClass('activeCov');
      $('.lpcover').eq(activated + 1).addClass('activeCov');
    }

    if (activated === 18) {
      $('.lpcover').eq(activated).removeClass('activeCov');
      $('.lpcover').eq(activated + 1).addClass('activeCov');
      if (!$('.nextBtn').hasClass('off')) {
        $('.nextBtn').addClass('off');
      }
    }
  }

  function prevBtn() {
    activated = $('.lpcover.activeCov').index();

    if (activated === 19) {
      $('.lpcover').eq(activated).removeClass('activeCov');
      $('.lpcover').eq(activated - 1).addClass('activeCov');
      if ($('.nextBtn').hasClass('off')) {
        $('.nextBtn').removeClass('off');
      }
    }

    if (activated < 19 && activated > 1) {
      $('.lpcover').eq(activated).removeClass('activeCov');
      $('.lpcover').eq(activated - 1).addClass('activeCov');
    }

    if (activated === 1) {
      $('.lpcover').eq(activated).removeClass('activeCov');
      $('.lpcover').eq(activated - 1).addClass('activeCov');
      if (!$('.prevBtn').hasClass('off')) {
        $('.prevBtn').addClass('off');
    }
  }
}
