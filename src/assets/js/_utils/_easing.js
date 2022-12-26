'use strict';
/**
 * @param {number} elapsed 経過時間
 * @param {number} start 開始点
 * @param {number}
 */
export class Easing {
  easeOut(t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b;
  }

  easeIn(t, b, c, d) {
    return c * (t /= d) * t + b;
  }

  easeInOut(t, b, c, d) {
    if ((t /= d / 2) < 1) {
      return (c / 2) * t * t + b;
    }

    return (-c / 2) * (--t * (t - 2) - 1) + b;
  }

  swing() {
    return c * (0.5 - Math.cos((t / d) * Math.PI) / 2) + b;
  }
}
