'use strict'

export class Drawer {
  constructor(obj) {
    this.DOM = {}
    this.DOM.hamburger = document.getElementById(obj.hamburger) 
    this.DOM.menu = document.querySelector(`.${obj.menu}`);
    this.DOM.focusTrap = document.getElementById(obj.focusTrap);
    this.CLASS = obj.CLASS
    this.flg = false;

    this._addEvent()
  }

  _addEvent() {
    const that = this
    this.DOM.hamburger.addEventListener("click", () => { //ハンバーガーボタンが選択されたら
      that.flg ? that._close() : that._open();
    });

    this.DOM.focusTrap.addEventListener("focus", () => {
      that.DOM.hamburger.focus();
    });

    window.addEventListener("keydown", () => {//escキー押下でメニューを閉じられるように
      if (event.key === "Escape") {
        that._close()
      }
    });
  }

  _open() {
    this.flg = true;
    this._bgFix(this.flg);
    this.DOM.menu.classList.add(this.CLASS);
    this.DOM.hamburger.classList.add(this.CLASS);
    this.DOM.hamburger.setAttribute("aria-expanded", "false");
    this.DOM.hamburger.focus();
  }

  _close() {
    this.flg = false;
    this._bgFix(this.flg);
    this.DOM.menu.classList.remove(this.CLASS);
    this.DOM.hamburger.classList.remove(this.CLASS);
    this.DOM.hamburger.setAttribute("aria-expanded", "true");
  }

  _bgFix(bool) {
    const scrollY = bool ? this._getSE().scrollTop : parseInt(document.body.style.top || "0");

    const fixedStyles = {
      height: "100vh",
      position: "fixed",
      top: `${scrollY * -1}px`,
      left: "0",
      width: "100vw"
    };

    Object.keys(fixedStyles).forEach((key) => {
      document.body.style[key] = bool ? fixedStyles[key] : "";
    });

    if (!bool) {
      window.scrollTo(0, scrollY * -1);
    }
  }

  _getSE() {
    if ("scrollingElement" in document) {
      return document.scrollingElement;
    } else {
      return document.documentElement;
    }
  }
}