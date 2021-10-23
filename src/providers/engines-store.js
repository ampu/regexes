import {ENGINES, findEngineByValue} from 'constants/engine';

const ENGINES_STORE_KEY = `regexes__engines`;

class EnginesStore {
  /**
   * @param {Storage} storage
   * @param {string} key
   */
  constructor(storage, key) {
    this._storage = storage;
    this._key = key;
  }

  /**
   * @param {Engine[]} defaultEngines
   * @return {Engine[]}
   */
  getEngines(defaultEngines = ENGINES) {
    try {
      const engineValues = JSON.parse(this._storage.getItem(this._key));
      return engineValues
        .map((engineValue) => findEngineByValue(engineValue))
        .filter(Boolean) || defaultEngines;
    } catch (_error) {
      return defaultEngines;
    }
  }

  /**
   * @param {Engine[]} newEngines
   * @return {boolean}
   */
  setEngines(newEngines) {
    try {
      const engineValues = newEngines.map((engine) => engine.value);
      this._storage.setItem(this._key, JSON.stringify(engineValues));
      return true;
    } catch (_error) {
      return false;
    }
  }
}

export const enginesStore = new EnginesStore(localStorage, ENGINES_STORE_KEY);
