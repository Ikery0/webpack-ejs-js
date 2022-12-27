'use strict';

import { Easing } from './_easing';
//ページ内だけの時はSmoothScroll
//ページ外も対応したい時はOtherPageSmoothScroll

//スムーズスクロール用のtweenみたいなもの
class SmoothScrollTween {
  constructor() {
    this.DOM = {};
    this.DOM.body = document.body;
    this.easing = new Easing();
    this.duration = 600;

    this.args = {
      startTime: 0,
      start: 0,
      stop: 0,
    };
  }

  _animationFrame() {
    const { startTime, start, stop } = this.args;
    //イベント発生後の経過時間
    let elapsedTime = new Date() - startTime;

    //アニメーション終了処理
    if (elapsedTime > this.duration) {
      //実行中class削除
      this.DOM.body.classList.remove('is-scroll-busy');
      //処理を終了
      return false;
    }

    //スクロール処理
    window.scrollTo(
      0,
      //「アニメーションの経過時間」,「始点」,「変化量」,「変化にかける時間」
      this.easing.easeOut(elapsedTime, start, stop, this.duration),
    );

    requestAnimationFrame(this._animationFrame.bind(this));
  }
}

export class SmoothScroll extends SmoothScrollTween {
  constructor() {
    super();
    this.DOM.targets = document.querySelectorAll('a[href^="#"]');
    this._addEvent();
  }

  _addEvent() {
    this.DOM.targets.forEach((el) => {
      el.addEventListener('click', (e) => this._startScrollProcess(e));
    });
  }

  _startScrollProcess(e) {
    this._getArgs(e);
    this._animationFrame();
  }

  _getArgs(e) {
    e.preventDefault();
    const $target = e.target;

    //スクロールイベント重複防止
    if (this.DOM.body.classList.contains('is-scroll-busy')) {
      return false;
    }
    this.DOM.body.classList.add('is-scroll-busy');

    //現在のスクロール量
    this.args.start = window.pageYOffset || document.documentElement.scrollTop;

    //hrefから遷移先を取得
    const href = $target.getAttribute('href');
    const scrollStopTarget = document.querySelector(href === '#' || href === '' ? 'html' : href);
    //スクロール先
    this.args.stop = this._getStop(scrollStopTarget);
    //アニメーション開始時間
    this.args.startTime = new Date();
  }

  /**
   * スクロール先の計算してreturnする
   *
   * @param {DOM} target 遷移先のDOM
   * @returns {number} スクロールの終着点
   */
  _getStop(target) {
    const documentHeight = document.documentElement.scrollHeight;
    const viewHeight = document.documentElement.clientHeight;
    const scrollHeight = documentHeight - viewHeight;
    const scrollableHeight = scrollHeight - this.args.start;

    if (!target) {
      console.error('スクロール先が見つかりません');
      this.DOM.body.classList.remove('is-scroll-busy');
      return;
    }

    //headerの高さの余白
    const headerHeight = document.querySelector('header').clientHeight;
    //スクロール先の遷移先のtopのy座標
    let stop = target.getBoundingClientRect().top - headerHeight;

    if (scrollableHeight < stop) {
      stop = scrollableHeight;
    }

    return stop;
  }
}

export class OtherPageSmoothScroll extends SmoothScroll {
  constructor() {
    super();
    this.urlHash = location.hash;

    if (this.urlHash) {
      setTimeout(this._startLoadedScrollProcess.bind(this), 200);
    }
  }

  _startLoadedScrollProcess() {
    this._getLoadedArgs();
    this._animationFrame();
  }

  _getLoadedArgs() {
    window.scrollTo({ top: 0 }, 0);
    this.DOM.body.classList.add('is-scroll-busy');

    //現在のスクロール量
    this.args.start = window.pageYOffset || document.documentElement.scrollTop;

    const urlTarget = document.getElementById(this.urlHash.replace('#', ''));
    //スクロール先の遷移先のtopのy座標
    this.args.stop = this._getStop(urlTarget);

    //アニメーション開始時間
    this.args.startTime = new Date();
  }
}
