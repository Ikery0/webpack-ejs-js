'use strict';
//ページ内だけの時はSmoothScroll
//ページ外も対応したい時はOtherPageSmoothScroll
export class SmoothScroll {
  constructor() {
    this.DOM = {};
    this.DOM.body = document.body;
    this.DOM.targets = document.querySelectorAll('a[href^="#"]');
    this.animateOpt = {
      speed: 600,
      easing: 'easeOut',
    };

    this._addEvent();
  }

  easing(t, b, c, d) {
    switch (this.animateOpt.easing) {
      case 'swing':
        return c * (0.5 - Math.cos((t / d) * Math.PI) / 2) + b;
        break;

      case 'easeIn':
        return c * (t /= d) * t + b;
        break;

      case 'easeOut':
        return -c * (t /= d) * (t - 2) + b;
        break;

      case 'easeInOut':
        if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
        return (-c / 2) * (--t * (t - 2) - 1) + b;
        break;

      default:
        console.error('options.easingに正しい値を入れてください');
        break;
    }
  }

  animationFrame(startTime, startY, stopY) {
    const that = this;
    const callBack = () => {
      that.animate(startTime, startY, stopY);
    };
    requestAnimationFrame(callBack.bind(this));
  }

  animate(startTime, startY, stopY) {
    //イベント発生後の経過時間
    let elapsedTime = new Date() - startTime;

    //アニメーション終了処理
    if (elapsedTime > this.animateOpt.speed) {
      //実行中class削除
      this.DOM.body.classList.remove('is-scroll-busy');
      //処理を終了
      return false;
    }

    //スクロール処理
    window.scrollTo(
      0,
      //「アニメーションの経過時間」,「始点」,「変化量」,「変化にかける時間」
      this.easing(elapsedTime, startY, stopY, this.animateOpt.speed),
    );

    this.animationFrame(startTime, startY, stopY);
  }

  _getArg(e) {
    e.preventDefault();
    const $target = e.target;

    //スクロールイベント重複防止
    if (this.DOM.body.classList.contains('is-scroll-busy')) {
      return false;
    }
    this.DOM.body.classList.add('is-scroll-busy');

    //現在のスクロール量
    const startY = window.pageYOffset || document.documentElement.scrollTop;

    //hrefから遷移先を取得
    const href = $target.getAttribute('href');
    const scrollStopTarget = document.querySelector(href == '#' || href == '' ? 'html' : href);

    if (!scrollStopTarget) {
      console.error('スクロール先が見つかりません');
      this.DOM.body.classList.remove('is-scroll-busy');
      return;
    }

    //headerの高さの余白
    const headerHeight = document.querySelector('header').clientHeight;
    //スクロール先の遷移先のtopのy座標
    const stopY = scrollStopTarget.getBoundingClientRect().top - headerHeight;

    //アニメーション開始時間
    const startTime = new Date();

    this.animationFrame(startTime, startY, stopY);
  }

  _addEvent() {
    const that = this;
    this.DOM.targets.forEach((el) => {
      el.addEventListener('click', (e) => that._getArg(e));
    });
  }
}

export class OtherPageSmoothScroll extends SmoothScroll {
  constructor() {
    super();
    this._start();
  }

  _start() {
    const urlHash = location.hash;
    const that = this;

    if (urlHash) {
      setTimeout(() => {
        window.scrollTo({ top: 0 }, 0);
      });
      setTimeout(() => {
        //ペー,ジロード用に処理を遅らす
        // スクロール先の要素を取得 （アンカーの リンク先 _.. の _ を取り除いた名前と一致する id名の要素）
        const urlTarget = document.getElementById(urlHash.replace('#', ''));

        //現在のスクロール量
        const startY = window.pageYOffset || document.documentElement.scrollTop;

        //headerの高さの余白
        const headerHeight = document.querySelector('header').clientHeight;
        //スクロール先の遷移先のtopのy座標
        const stopY = urlTarget.getBoundingClientRect().top - headerHeight;

        //アニメーション開始時間
        const startTime = new Date();

        that.animationFrame(startTime, startY, stopY);
      }, 200);
    }
  }
}
