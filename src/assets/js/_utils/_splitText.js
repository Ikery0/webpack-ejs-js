'use strict';

export class SplitText {
  constructor(el) {
    this.DOM = {};
    this.DOM.el = el instanceof HTMLElement ? el : document.querySelector(el);
    this.chars = this.DOM.el.innerHTML.trim().split('');
    this.DOM.el.innerHTML = this.#splitText();
  }

  #splitText() {
    return this.chars.reduce((accu, curr) => {
      curr = curr.replace(/\s+/, '&nbsp;');
      return `${accu}<span class="char">${curr}</span>`;
    }, '');
  }

  animate() {
    this.DOM.el.classList.toggle('inview');
  }
}

export class GsapSplitText extends SplitText {
  constructor(el) {
    super(el);
    this.DOM.chars = this.DOM.el.querySelectorAll('.char');
  }

  fadeInDown() {
    this.DOM.el.classList.toggle('inview');
    this.DOM.chars.forEach((c, i) => {
      gsap.to(c, 0.5, {
        ease: 'power1.inOut',
        delay: i * 0.05,
        startAt: { y: '-50%', opacity: 0 },
        y: '0%',
        opacity: 1,
      });
    });
  }

  fadeInRight() {
    this.DOM.el.classList.toggle('inview');
    this.DOM.chars.forEach((c, i) => {
      gsap.to(c, 0.5, {
        ease: 'power1.inOut',
        delay: i * 0.05,
        startAt: { x: '40px', opacity: 0 },
        x: '0px',
        opacity: 1,
      });
    });
  }
}
