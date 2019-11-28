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
    prevArrow: '<div class="slick-arrow slick-arrow_prev header__slick-arrow header__slick-arrow_prev"><i class="slick_arr slick_arr-left"></i></div>',
    nextArrow: '<div class="slick-arrow slick-arrow_next header__slick-arrow header__slick-arrow_next"><i class="slick_arr slick_arr-right"></i></div>',
  });
  
  /* Sales Hits Slider */
  $('.salesHits__slider').slick({
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    dots: false,
    prevArrow: '<div class="slick-arrow slick-arrow_prev salesHits__slick-arrow salesHits__slick-arrow_prev"><i class="slick_arr slick_arr-left"></i></div>',
    nextArrow: '<div class="slick-arrow slick-arrow_next salesHits__slick-arrow salesHits__slick-arrow_next"><i class="slick_arr slick_arr-right"></i></div>',
    responsive: [
      {
        breakpoint: 1640,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 1290,
        settings: {
          slidesToShow: 3,
          dots: true,
          dotsClass: 'salesHits__slide-dots',
        }
      },
      {
        breakpoint: 982,
        settings: {
          slidesToShow: 2,
          dots: true,
          dotsClass: 'salesHits__slide-dots',
        }
      },
      {
        breakpoint: 662,
        settings: {
          slidesToShow: 1,
          dots: true,
          dotsClass: 'salesHits__slide-dots',
        }
      }
    ]
  });

  // Mask of the phone
  $(function($) {
    $('[name="tel"]').mask("+7 (999) 999-99-99");
  });

});

