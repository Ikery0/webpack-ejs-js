'use strict';
/**
 * @param {number} elapsed 経過時間
 * @param {number} start 開始点
 * @param {number} destination 終了点
 * @param {number} duration 変化にかける時間
 */
export class Easing {
  easeOut(elapsed, start, destination, duration) {
    return -destination * (elapsed /= duration) * (elapsed - 2) + start;
  }

  easeIn(elapsed, start, destination, duration) {
    return destination * (elapsed /= duration) * elapsed + start;
  }

  easeInOut(elapsed, start, destination, duration) {
    if ((elapsed /= duration / 2) < 1) {
      return (destination / 2) * elapsed * elapsed + start;
    }

    return (-destination / 2) * (--elapsed * (elapsed - 2) - 1) + start;
  }

  swing(elapsed, start, destination, duration) {
    return destination * (0.5 - Math.cos((elapsed / duration) * Math.PI) / 2) + start;
  }
}
