'use strict';

import { BgFix } from './_utils/_bgFix';

window.addEventListener('DOMContentLoaded', () => {
  //ハンバーガボタンクリック
  //メニューが'is-acive'を持っているか
  //持ってなかったら開く関数を実行
  //持ってなかったら閉じる関数を実行

  const humBtn = document.querySelector('#js-hamburger');
  const menu = document.querySelector('.js-spNav');
  const bgFix = new BgFix();
  const ADD_CLASS = 'is-active';
  const toggleMenu = () => {
    const hasIsActive = menu.classList.contains('is-active');
    if (!hasIsActive) {
      menuOpen();
      return;
    }
    menuClose();
  };
  const menuOpen = () => {
    menu.classList.add(ADD_CLASS);
    humBtn.classList.add(ADD_CLASS);
    bgFix.on();
  };
  const menuClose = () => {
    menu.classList.remove(ADD_CLASS);
    humBtn.classList.remove(ADD_CLASS);
    bgFix.off();
  };
  const resizeMenu = () => {
    const isPc = window.innerWidth > 768;
    if (isPc) {
      menuClose();
    }
  };
  humBtn.addEventListener('click', toggleMenu);
  window.addEventListener('resize', resizeMenu);
});
