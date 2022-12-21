import Swiper, { Autoplay, EffectFade, Navigation, Pagination } from 'swiper';

export class HeroSloder {
  constructor(el) {
    this.el = el;
    this.swiper = this._initSwiper();
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
      loopAdditionalSlides: 1,
      speed: 500,
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

  start(options = {}) {
    options = Object.assign(
      {
        delay: 3000,
        disableOnInteraction: false,
      },
      options,
    );
    this.swiper.params.autoplay = options;
    this.swiper.autoplay.start();
  }

  stop() {
    this.swiper.autoplay.stop();
  }
}
