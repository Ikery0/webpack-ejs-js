'use strict';
/**
 * @param {Object} obj detalisのクラスなどの情報をまとめる
 * @param {Object} obj.details detailsタグ
 * @param {Object} obj.content detailのコンテンツ
 *
 */

export class Accordion {
  constructor(obj) {
    this.DOM = {};
    this.DOM.details = document.querySelectorAll(obj.details);
    this.CONTENT_CLASS = obj.content;
    this.RUNNING_VALUE = 'running'; // アニメーション実行中のときに付与する予定のカスタムデータ属性の値
    this.IS_OPENED_CLASS = 'is-open'; // アイコン操作用のクラス名

    this.animTiming = {
      duration: 400,
      easing: 'ease-out',
    };

    /**
     * アコーディオンを閉じるときのキーフレーム
     */
    this.closingAnimKeyframes = (content) => [
      {
        height: content.offsetHeight + 'px', // height: "auto"だとうまく計算されないため要素の高さを指定する
        opacity: 1,
      },
      {
        height: 0,
        opacity: 0,
      },
    ];

    /**
     * アコーディオンを開くときのキーフレーム
     */
    this.openingAnimKeyframes = (content) => [
      {
        height: 0,
        opacity: 0,
      },
      {
        height: content.offsetHeight + 'px',
        opacity: 1,
      },
    ];

    this._addEvent();
  }

  _addEvent() {
    this.DOM.details.forEach((detail) => {
      const summary = detail.querySelector('summary');
      const content = detail.querySelector(this.CONTENT_CLASS);

      summary.addEventListener('click', (event) => {
        event.preventDefault();

        // 連打防止用。アニメーション中だったらクリックイベントを受け付けないでリターンする
        if (detail.dataset.animStatus === this.RUNNING_VALUE) {
          return;
        }

        // アニメーションを実行
        detail.open ? this._close(detail, content) : this._open(detail, content);
      });
    });
  }

  _open(detail, content) {
    detail.classList.toggle(this.IS_OPENED_CLASS);
    detail.setAttribute('open', 'true');
    const openingAnim = content.animate(this.openingAnimKeyframes(content), this.animTiming);
    detail.dataset.animStatus = this.RUNNING_VALUE;

    openingAnim.onfinish = () => {
      detail.dataset.animStatus = '';
    };
  }

  _close(detail, content) {
    detail.classList.toggle(this.IS_OPENED_CLASS);
    const closingAnim = content.animate(this.closingAnimKeyframes(content), this.animTiming);
    detail.dataset.animStatus = this.RUNNING_VALUE;

    closingAnim.onfinish = () => {
      // アニメーションの完了後にopen属性を取り除く
      detail.removeAttribute('open');
      detail.dataset.animStatus = '';
    };
  }
}
