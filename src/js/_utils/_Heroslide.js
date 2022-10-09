import Swiper, { Autoplay, EffectFade, Navigation, Pagination } from 'swiper';

window.addEventListener('DOMContentLoaded', () => {
  const heroSlider = new HeroSloder('#js-kvSwiper');
  heroSlider.start();
});

export class HeroSloder {
  constructor(el) {
    this.el = el;
    this.hero = this._initSwiper();
  }

  _initSwiper() {
    return new Swiper(this.el, {
      modules: [Autoplay, Pagination, Navigation, EffectFade],
      // Optional parameter
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      loop: true,
      // loopAdditionalSlides: 1,
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
      grabCursor: true,
    });
  }

  start() {
    this.hero.start();
  }

  stop() {
    this.hero.stop();
  }
}
