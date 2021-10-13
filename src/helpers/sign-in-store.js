const SIGN_IN_STORE_KEY = `regexes__sign-in`;

class SignInStore {
  /**
   * @param {Storage} storage
   * @param {string} mapKey
   */
  constructor(storage, mapKey) {
    this._storage = storage;
    this._mapKey = mapKey;
  }

  /**
   * @param {object} defaultMap
   * @return {object}
   */
  getMap(defaultMap = {}) {
    try {
      return JSON.parse(this._storage.getItem(this._mapKey)) || defaultMap;
    } catch (_error) {
      return defaultMap;
    }
  }

  /**
   * @param {object} patch
   * @return {boolean}
   */
  patchMap(patch) {
    try {
      const newMap = {...this.getMap(), ...patch};
      this._storage.setItem(this._mapKey, JSON.stringify(newMap));
      return true;
    } catch (_error) {
      return false;
    }
  }
}

export const signInStore = new SignInStore(localStorage, SIGN_IN_STORE_KEY);
