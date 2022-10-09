'use strict';
import { FitHeight } from './_utils/_fitHeight.js';
import { Drawer } from './_utils/_drawer.js';
import { OtherPageSmoothScroll } from './_utils/_smoothScroll.js';
import { Accordion } from './_utils/_accordion.js';
import { HeroSloder } from './_utils/_Heroslide.js';

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

  const heroSlider = new HeroSloder('#js-kvSwiper');
  
});

