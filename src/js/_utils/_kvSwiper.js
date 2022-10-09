import Swiper, { Autoplay, EffectFade, Navigation, Pagination } from 'swiper';

window.addEventListener('DOMContentLoaded', () => {
  const swiper = new Swiper('#js-kvSwiper', {
     // configure Swiper to use modules
     modules: [Autoplay, EffectFade, Pagination, Navigation],
    // Optional parameter
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    loop: true,
    speed: 500,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  swiper.start();
})