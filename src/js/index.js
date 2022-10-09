'use strict';
import { FitHeight } from './_utils/_fitHeight.js';
import { Drawer } from './_utils/_drawer.js';
import { OtherPageSmoothScroll } from './_utils/_smoothScroll.js';
import { Accordion } from './_utils/_accordion.js';

window.addEventListener('DOMContentLoaded', () => {
  new FitHeight();
  new Drawer({
    hamburger: 'js-hamburger',
    menu: 'js-spNav',
    CLASS: 'is-active',
    focusTrap: 'js-navTrap',
  });
  new OtherPageSmoothScroll();
  new Accordion();
});

import Swiper, { Autoplay, EffectFade, Navigation, Pagination } from 'swiper';

window.addEventListener('DOMContentLoaded', () => {

  const swiper = new Swiper('#js-kvSwiper', {
    modules: [Autoplay, Pagination, Navigation, EffectFade,],
    // Optional parameter
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    loop: true,
    loopAdditionalSlides: 1,
    speed: 500,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      bulletElement: 'button',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  swiper.start();
});
