'use strict';
import { FitHeight } from './_utils/_fitHeight.js';
import { Drawer } from './_utils/_drawer.js';
import { OtherPageSmoothScroll } from './_utils/_smoothScroll.js';
import { Accordion } from './_utils/_accordion.js';
import { HeroSloder } from './_utils/_Heroslide.js';
import { ScrollObserver } from './_utils/_scroll';

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

  const fadeIn = (el, inview) => {
    inview ? el.classList.add('u-fadeIn') : el.classList.remove('u-fadeIn');
  };
  const so1 = new ScrollObserver('.js-fadeIn', fadeIn, { rootMargin: '-100px 0px -100px 0px' });



  const toggleAnimation = (el, inview) => {
    inview ? heroSlider.start() : heroSlider.stop();
  };
  const heroSlider = new HeroSloder('#js-kvSwiper');
  const so2 = new ScrollObserver('#js-kvSwiper', toggleAnimation, { once: false });
});
