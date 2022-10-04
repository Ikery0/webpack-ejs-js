'use strict'
import { FitHeight } from './_utils/_fitHeight.js'
import { Drawer } from './_utils/_drawer.js'
import { ToggleSlide } from './_utils/_toggleSlide.js'
import { OtherPageSmoothScroll } from './_utils/_smoothScroll.js'

window.addEventListener('DOMContentLoaded', () => {
  const drawerObj = {
    hamburger: 'js-hamburger',
    menu: 'js-spNav',
    CLASS: 'is-active',
    focusTrap: "js-navTrap"
  }
  const smoothOptions = {
    speed: 600,
    easing: 'easeOut'
  }

  new FitHeight()
  new Drawer(drawerObj)
  new ToggleSlide({ triggers: '.js-accoTrigger', targets: '.js-accoTarget'});
  new OtherPageSmoothScroll();
})