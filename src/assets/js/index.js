'use strict';
import { FitHeight } from './_utils/_fitHeight.js';
import { Drawer } from './_utils/_drawer.js';
import { OtherPageSmoothScroll } from './_utils/_smoothScroll.js';
import { Accordion } from './_utils/_accordion.js';
import { HeroSloder } from './_utils/_Heroslide.js';
import { ScrollObserver } from './_utils/_scroll';

window.addEventListener('DOMContentLoaded', () => {
  new Main();
});

class Main {
  constructor() {
    this.heroSlider = new HeroSloder('#js-kvSwiper');
    this._observers = [];

    this._scrollInit();
    this._init();
  }

  _init() {
    new FitHeight();
    new Drawer({
      hamburger: 'js-hamburger',
      menu: 'js-spNav',
      CLASS: 'is-active',
    });
    new OtherPageSmoothScroll();
    new Accordion({
      details: '.js-details',
      content: '.js-content',
    });
  }

  _scrollInit() {
    this._observers.push(
      new ScrollObserver('#js-kvSwiper', this._toggleAnimation.bind(this), { once: false }),
      new ScrollObserver('.js-fadeIn', this._fadeIn, { rootMargin: '-100px 0px -100px 0px' }),
    );
  }

  _toggleAnimation(el, inview) {
    inview ? this.heroSlider.start() : this.heroSlider.stop();
  }

  _fadeIn(el, inview) {
    inview ? el.classList.add('u-fadeIn') : el.classList.remove('u-fadeIn');
  }
}
