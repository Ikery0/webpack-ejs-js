'use strict';

const createInteractiveElArray = (parentElement) => {
  const interactiveItems = parentElement.querySelectorAll('button, a');
  const interactiveArray = Array.from(interactiveItems);
  const hamburger = document.querySelector('#js-hamburger');
  interactiveArray.unshift(hamburger);

  return interactiveArray;
};

/**
 * 要素の先頭と末尾どちらかにフォーカスを与えます。
 * @param parentElement 対象の親要素
 */
const focusToButton = (parentElement, isFirstFocus = true) => {
  if (!parentElement) {
    throw new Error('要素が見つかりませんでした');
  }

  const focusableArray = createInteractiveElArray(parentElement);

  if (focusableArray.length > 0) {
    focusableArray[isFirstFocus ? 0 : focusableArray.length - 1].focus();
  }
};

/**
 * モーダルのキーボードフォーカスを制御するイベントです。
 * @param event
 * @param parentElement 対象の親要素
 */
export const modalFocus = (event, parentElement) => {
  if (!parentElement) {
    return;
  }

  console.log(event.key);
  switch (event.key) {
    case 'Tab': {
      // モーダル画面内にフォーカスが当たっているか検証
      const interactiveElArray = createInteractiveElArray(parentElement);
      const focusIndex = interactiveElArray.findIndex((el) => el === document.activeElement);

      //フォーカス可能な要素が1つしかない場合、その要素のみフォーカス
      if (interactiveElArray.length === 1) {
        event.preventDefault();
        event.stopImmediatePropagation();
        focusToButton(parentElement, true);
        break;
      }

      if (focusIndex === 0) {
        //最初の要素にfocueが当たっていて、shift + tabが押された時
        if (event.shiftKey) {
          event.preventDefault();
          event.stopImmediatePropagation();

          focusToButton(parentElement, false);
        }
      }
      if (focusIndex >= interactiveElArray.length - 1) {
        // 最後の要素にfocueが当たっていて、tabを押された時
        if (!event.shiftKey) {
          event.preventDefault();
          event.stopImmediatePropagation();

          focusToButton(parentElement, true);
        }
      }
      //画面外の要素にフォーカスがあたっていたら1番目の要素にフォーカスをあてる
      if (focusIndex === -1) {
        focusToButton(parentElement, true);
      }
      break;
    }
  }
};
