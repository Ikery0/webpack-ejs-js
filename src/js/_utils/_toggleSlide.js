'use strict'
/**
 *  ex)
 * new ToggleSlide({ triggers: '.js-accoTrigger', targets: '.js-accoTarget' });
 */
//objectにはtriggerとtargetのselectorを渡す
//ex) const obj = {
//    triggers: '.js-accoTrigger',
//    targets: '.js-accoTarget',
//  }

//transitionにはdurationに数字, easingに文字列を渡す
//ex) const transition = {
//    duration: 500,
//    easing: 'ease-in-out'
//  } 

export class ToggleSlide {
  constructor(obj, transition) {
    this.DOM = {};
    const defalutTransiton = {
      duration: 500,
      easing: 'ease-out'
    }
    this.DOM.triggers = document.querySelectorAll(obj.triggers);
    this.DOM.targets = document.querySelectorAll(obj.targets);
    this.transition = Object.assign(defalutTransiton, transition)
    this._addEvent();
  }

  _slideUp($target) {
    const that = this;
    $target.style.height = `${$target.offsetHeight}px`;
    $target.offsetHeight;
    $target.style.transitionProperty = "height, margin, padding";
    $target.style.transitionDuration = `${this.transition.duration}ms`;
    $target.style.transitionTimingFunction = `${this.transition.easing}`;
    $target.style.overflow = "hidden";
    $target.style.height = 0;
    $target.style.paddingTop = 0;
    $target.style.paddingBottom = 0;
    $target.style.marginTop = 0;
    $target.style.marginBottom = 0;
    $target.setAttribute("aria-hidden", 'true');
    setTimeout(() => {
      $target.style.display = "none";
      $target.style.removeProperty("height");
      $target.style.removeProperty("padding-top");
      $target.style.removeProperty("padding-bottom");
      $target.style.removeProperty("margin-top");
      $target.style.removeProperty("margin-bottom");
      $target.style.removeProperty("overflow");
      $target.style.removeProperty("transition-duration");
      $target.style.removeProperty("transition-property");
      $target.style.removeProperty("transition-timing-function");
    }, that.transition.duration);
  }

  _slideDown($target) {
    const that = this;
    $target.style.removeProperty("display");
    let display = window.getComputedStyle($target).display;
    if (display === "none") {
      display = "block";
    }
    $target.style.display = display;
    let height = $target.offsetHeight;
    $target.style.overflow = "hidden";
    $target.style.height = 0;
    $target.style.paddingTop = 0;
    $target.style.paddingBottom = 0;
    $target.style.marginTop = 0;
    $target.style.marginBottom = 0;
    $target.offsetHeight;
    $target.style.transitionProperty = "height, margin, padding";
    $target.style.transitionDuration = `${this.transition.duration}ms`;
    $target.style.transitionTimingFunction = `${this.transition.easing}`;
    $target.style.height = height + "px";
    $target.style.removeProperty("padding-top");
    $target.style.removeProperty("padding-bottom");
    $target.style.removeProperty("margin-top");
    $target.style.removeProperty("margin-bottom");
    $target.setAttribute("aria-hidden", 'false')
    setTimeout(() => {
      $target.style.removeProperty("height");
      $target.style.removeProperty("overflow");
      $target.style.removeProperty("transition-duration");
      $target.style.removeProperty("transition-property");
      $target.style.removeProperty("transition-timing-function");
    }, that.transition.duration);
  }

  _slideToggle(trigger) {
    const $closestDt = trigger.closest('dt');
    const $target = $closestDt.nextElementSibling;

    if (window.getComputedStyle($target).display === "none") {
      return this._slideDown($target);
    } else {
      return this._slideUp($target);
    }
  }

  _addEvent() {
    const that = this;

    this.DOM.triggers.forEach(el => {
      el.addEventListener('click', e => that._slideToggle(e.target));
    });
  }
}

