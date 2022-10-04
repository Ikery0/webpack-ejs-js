/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/_utils/_drawer.js":
/*!**********************************!*\
  !*** ./src/js/_utils/_drawer.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Drawer": () => (/* binding */ Drawer)
/* harmony export */ });


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Drawer = /*#__PURE__*/function () {
  function Drawer(obj) {
    _classCallCheck(this, Drawer);

    this.DOM = {};
    this.DOM.hamburger = document.getElementById(obj.hamburger);
    this.DOM.menu = document.querySelector(".".concat(obj.menu));
    this.DOM.focusTrap = document.getElementById(obj.focusTrap);
    this.CLASS = obj.CLASS;
    this.flg = false;

    this._addEvent();
  }

  _createClass(Drawer, [{
    key: "_addEvent",
    value: function _addEvent() {
      var that = this;
      this.DOM.hamburger.addEventListener("click", function () {
        //ハンバーガーボタンが選択されたら
        that.flg ? that._close() : that._open();
      });
      this.DOM.focusTrap.addEventListener("focus", function () {
        that.DOM.hamburger.focus();
      });
      window.addEventListener("keydown", function () {
        //escキー押下でメニューを閉じられるように
        if (event.key === "Escape") {
          that._close();
        }
      });
    }
  }, {
    key: "_open",
    value: function _open() {
      this.flg = true;

      this._bgFix(this.flg);

      this.DOM.menu.classList.add(this.CLASS);
      this.DOM.hamburger.classList.add(this.CLASS);
      this.DOM.hamburger.setAttribute("aria-expanded", "false");
      this.DOM.hamburger.focus();
    }
  }, {
    key: "_close",
    value: function _close() {
      this.flg = false;

      this._bgFix(this.flg);

      this.DOM.menu.classList.remove(this.CLASS);
      this.DOM.hamburger.classList.remove(this.CLASS);
      this.DOM.hamburger.setAttribute("aria-expanded", "true");
    }
  }, {
    key: "_bgFix",
    value: function _bgFix(bool) {
      var scrollY = bool ? this._getSE().scrollTop : parseInt(document.body.style.top || "0");
      var fixedStyles = {
        height: "100vh",
        position: "fixed",
        top: "".concat(scrollY * -1, "px"),
        left: "0",
        width: "100vw"
      };
      Object.keys(fixedStyles).forEach(function (key) {
        document.body.style[key] = bool ? fixedStyles[key] : "";
      });

      if (!bool) {
        window.scrollTo(0, scrollY * -1);
      }
    }
  }, {
    key: "_getSE",
    value: function _getSE() {
      if ("scrollingElement" in document) {
        return document.scrollingElement;
      } else {
        return document.documentElement;
      }
    }
  }]);

  return Drawer;
}();

/***/ }),

/***/ "./src/js/_utils/_fitHeight.js":
/*!*************************************!*\
  !*** ./src/js/_utils/_fitHeight.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FitHeight": () => (/* binding */ FitHeight)
/* harmony export */ });
 //iosの100vhに対応

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var FitHeight = /*#__PURE__*/function () {
  function FitHeight() {
    _classCallCheck(this, FitHeight);

    this._addEvent();

    this.windowHeight = window.innerHeight;
  }

  _createClass(FitHeight, [{
    key: "_set",
    value: function _set() {
      var vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
    }
  }, {
    key: "_checkHeight",
    value: function _checkHeight() {
      if (this.windowHeight === window.innerHeight) {
        return false;
      }

      this._set();
    }
  }, {
    key: "_addEvent",
    value: function _addEvent() {
      this._set();

      var that = this;
      window.addEventListener('resize', that._checkHeight.bind(this));
    }
  }]);

  return FitHeight;
}();

/***/ }),

/***/ "./src/js/_utils/_smoothScroll.js":
/*!****************************************!*\
  !*** ./src/js/_utils/_smoothScroll.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OtherPageSmoothScroll": () => (/* binding */ OtherPageSmoothScroll),
/* harmony export */   "SmoothScroll": () => (/* binding */ SmoothScroll)
/* harmony export */ });
 //ページ内だけの時はSmoothScroll
//ページ外も対応したい時はOtherPageSmoothScroll

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var SmoothScroll = /*#__PURE__*/function () {
  function SmoothScroll() {
    _classCallCheck(this, SmoothScroll);

    this.DOM = {};
    this.DOM.body = document.body;
    this.DOM.targets = document.querySelectorAll('a[href^="#"]');
    this.animateOpt = {
      speed: 600,
      easing: 'easeOut'
    };

    this._addEvent();
  }

  _createClass(SmoothScroll, [{
    key: "easing",
    value: function easing(t, b, c, d) {
      switch (this.animateOpt.easing) {
        case 'swing':
          return c * (0.5 - Math.cos(t / d * Math.PI) / 2) + b;
          break;

        case 'easeIn':
          return c * (t /= d) * t + b;
          break;

        case 'easeOut':
          return -c * (t /= d) * (t - 2) + b;
          break;

        case 'easeInOut':
          if ((t /= d / 2) < 1) return c / 2 * t * t + b;
          return -c / 2 * (--t * (t - 2) - 1) + b;
          break;

        default:
          alert('options.easingに正しい値を入れてください');
          break;
      }
    }
  }, {
    key: "animationFrame",
    value: function animationFrame(startTime, startY, stopY) {
      var that = this;

      var callBack = function callBack() {
        that.animate(startTime, startY, stopY);
      };

      requestAnimationFrame(callBack.bind(this));
    }
  }, {
    key: "animate",
    value: function animate(startTime, startY, stopY) {
      //イベント発生後の経過時間
      var elapsedTime = new Date() - startTime; //アニメーション終了処理

      if (elapsedTime > this.animateOpt.speed) {
        //実行中class削除
        this.DOM.body.classList.remove('is-scroll-busy'); //処理を終了

        return false;
      } //スクロール処理


      window.scrollTo(0, //「アニメーションの経過時間」,「始点」,「変化量」,「変化にかける時間」
      this.easing(elapsedTime, startY, stopY, this.animateOpt.speed));
      this.animationFrame(startTime, startY, stopY);
    }
  }, {
    key: "_getArg",
    value: function _getArg(e) {
      e.preventDefault();
      var $target = e.target; //スクロールイベント重複防止

      if (this.DOM.body.classList.contains('is-scroll-busy')) {
        return false;
      }

      this.DOM.body.classList.add('is-scroll-busy'); //現在のスクロール量

      var startY = window.pageYOffset || document.documentElement.scrollTop; //hrefから遷移先を取得

      var href = $target.getAttribute('href');
      var scrollStopTarget = document.querySelector(href == '#' || href == '' ? 'html' : href); //headerの高さの余白

      var headerHeight = document.querySelector('header').clientHeight; //スクロール先の遷移先のtopのy座標

      var stopY = scrollStopTarget.getBoundingClientRect().top - headerHeight; //アニメーション開始時間

      var startTime = new Date();
      this.animationFrame(startTime, startY, stopY);
    }
  }, {
    key: "_addEvent",
    value: function _addEvent() {
      var that = this;
      this.DOM.targets.forEach(function (el) {
        el.addEventListener('click', function (e) {
          return that._getArg(e);
        });
      });
    }
  }]);

  return SmoothScroll;
}();
var OtherPageSmoothScroll = /*#__PURE__*/function (_SmoothScroll) {
  _inherits(OtherPageSmoothScroll, _SmoothScroll);

  var _super = _createSuper(OtherPageSmoothScroll);

  function OtherPageSmoothScroll() {
    var _this;

    _classCallCheck(this, OtherPageSmoothScroll);

    _this = _super.call(this);

    _this._start();

    return _this;
  }

  _createClass(OtherPageSmoothScroll, [{
    key: "_start",
    value: function _start() {
      var urlHash = location.hash;
      var that = this;

      if (urlHash) {
        setTimeout(function () {
          window.scrollTo({
            top: 0
          }, 0);
        });
        setTimeout(function () {
          //ペー,ジロード用に処理を遅らす
          // スクロール先の要素を取得 （アンカーの リンク先 _.. の _ を取り除いた名前と一致する id名の要素）
          var urlTarget = document.getElementById(urlHash.replace('#', '')); //現在のスクロール量

          var startY = window.pageYOffset || document.documentElement.scrollTop; //headerの高さの余白

          var headerHeight = document.querySelector('header').clientHeight; //スクロール先の遷移先のtopのy座標

          var stopY = urlTarget.getBoundingClientRect().top - headerHeight; //アニメーション開始時間

          var startTime = new Date();
          that.animationFrame(startTime, startY, stopY);
        }, 200);
      }
    }
  }]);

  return OtherPageSmoothScroll;
}(SmoothScroll);

/***/ }),

/***/ "./src/js/_utils/_toggleSlide.js":
/*!***************************************!*\
  !*** ./src/js/_utils/_toggleSlide.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ToggleSlide": () => (/* binding */ ToggleSlide)
/* harmony export */ });
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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var ToggleSlide = /*#__PURE__*/function () {
  function ToggleSlide(obj, transition) {
    _classCallCheck(this, ToggleSlide);

    this.DOM = {};
    var defalutTransiton = {
      duration: 500,
      easing: 'ease-out'
    };
    this.DOM.triggers = document.querySelectorAll(obj.triggers);
    this.DOM.targets = document.querySelectorAll(obj.targets);
    this.transition = Object.assign(defalutTransiton, transition);

    this._addEvent();
  }

  _createClass(ToggleSlide, [{
    key: "_slideUp",
    value: function _slideUp($target) {
      var that = this;
      $target.style.height = "".concat($target.offsetHeight, "px");
      $target.offsetHeight;
      $target.style.transitionProperty = "height, margin, padding";
      $target.style.transitionDuration = "".concat(this.transition.duration, "ms");
      $target.style.transitionTimingFunction = "".concat(this.transition.easing);
      $target.style.overflow = "hidden";
      $target.style.height = 0;
      $target.style.paddingTop = 0;
      $target.style.paddingBottom = 0;
      $target.style.marginTop = 0;
      $target.style.marginBottom = 0;
      $target.setAttribute("aria-hidden", 'true');
      setTimeout(function () {
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
  }, {
    key: "_slideDown",
    value: function _slideDown($target) {
      var that = this;
      $target.style.removeProperty("display");
      var display = window.getComputedStyle($target).display;

      if (display === "none") {
        display = "block";
      }

      $target.style.display = display;
      var height = $target.offsetHeight;
      $target.style.overflow = "hidden";
      $target.style.height = 0;
      $target.style.paddingTop = 0;
      $target.style.paddingBottom = 0;
      $target.style.marginTop = 0;
      $target.style.marginBottom = 0;
      $target.offsetHeight;
      $target.style.transitionProperty = "height, margin, padding";
      $target.style.transitionDuration = "".concat(this.transition.duration, "ms");
      $target.style.transitionTimingFunction = "".concat(this.transition.easing);
      $target.style.height = height + "px";
      $target.style.removeProperty("padding-top");
      $target.style.removeProperty("padding-bottom");
      $target.style.removeProperty("margin-top");
      $target.style.removeProperty("margin-bottom");
      $target.setAttribute("aria-hidden", 'false');
      setTimeout(function () {
        $target.style.removeProperty("height");
        $target.style.removeProperty("overflow");
        $target.style.removeProperty("transition-duration");
        $target.style.removeProperty("transition-property");
        $target.style.removeProperty("transition-timing-function");
      }, that.transition.duration);
    }
  }, {
    key: "_slideToggle",
    value: function _slideToggle(trigger) {
      var $closestDt = trigger.closest('dt');
      var $target = $closestDt.nextElementSibling;

      if (window.getComputedStyle($target).display === "none") {
        return this._slideDown($target);
      } else {
        return this._slideUp($target);
      }
    }
  }, {
    key: "_addEvent",
    value: function _addEvent() {
      var that = this;
      this.DOM.triggers.forEach(function (el) {
        el.addEventListener('click', function (e) {
          return that._slideToggle(e.target);
        });
      });
    }
  }]);

  return ToggleSlide;
}();

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_fitHeight_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_utils/_fitHeight.js */ "./src/js/_utils/_fitHeight.js");
/* harmony import */ var _utils_drawer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_utils/_drawer.js */ "./src/js/_utils/_drawer.js");
/* harmony import */ var _utils_toggleSlide_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_utils/_toggleSlide.js */ "./src/js/_utils/_toggleSlide.js");
/* harmony import */ var _utils_smoothScroll_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_utils/_smoothScroll.js */ "./src/js/_utils/_smoothScroll.js");






window.addEventListener('DOMContentLoaded', function () {
  var drawerObj = {
    hamburger: 'js-hamburger',
    menu: 'js-spNav',
    CLASS: 'is-active',
    focusTrap: "js-navTrap"
  };
  var smoothOptions = {
    speed: 600,
    easing: 'easeOut'
  };
  new _utils_fitHeight_js__WEBPACK_IMPORTED_MODULE_0__.FitHeight();
  new _utils_drawer_js__WEBPACK_IMPORTED_MODULE_1__.Drawer(drawerObj);
  new _utils_toggleSlide_js__WEBPACK_IMPORTED_MODULE_2__.ToggleSlide({
    triggers: '.js-accoTrigger',
    targets: '.js-accoTarget'
  });
  new _utils_smoothScroll_js__WEBPACK_IMPORTED_MODULE_3__.OtherPageSmoothScroll();
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map