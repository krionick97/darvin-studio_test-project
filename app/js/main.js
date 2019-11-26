'use strict'

$(document).ready(function() {

  // Heder Slider
  let $status = $('.header__pageInfo');
  let $count = $('.header__count');
  let $slickElement = $('.header__slider');

  $slickElement.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
    //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
    let i = (currentSlide ? currentSlide : 0) + 1;
    $status.text(i);
    $count.text('/' + slick.slideCount);
  });
  
  $slickElement.slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    prevArrow: '<div class="slick-arrow slick-arrow_prev"><i class="slick_arr slick_arr-left"></i></div>',
    nextArrow: '<div class="slick-arrow slick-arrow_next"><i class="slick_arr slick_arr-right"></i></div>',
  });

});