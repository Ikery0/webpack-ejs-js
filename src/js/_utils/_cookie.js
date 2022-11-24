'use strict';

export class Cookie {
  set(name, val) {
    document.cookie = `${name}=${val}; path=/`;
  }

  /**
   *
   * @param string key 取得したいクッキーの名前
   * @returns {string | null} クッキーの値設定されていればstringなければnull
   */
  get(key) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const cookiesArray = cookie.split('=');
      if (cookiesArray[0].trim() == key.trim()) {
        return cookiesArray[1];
      }
    }
    return null;
  }
}
