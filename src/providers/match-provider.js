import axios from 'axios';

const REQUEST_TIMEOUT = 5000;

class MatchProvider {
  constructor() {
    this._client = axios.create({
      timeout: REQUEST_TIMEOUT,
    });
  }

  /**
   * @param {string[]} engineValues
   * @param {string} text
   * @param {string} pattern
   * @param {string} flagsValue
   * @return {Promise<{matches: string[], error: {message: string}}>}
   */
  async matchAll(engineValues, text, pattern, flagsValue) {
    const {data} = await this._client.get(`http://localhost:3001/match-all`, {
      params: {
        engineValues,
        text,
        pattern,
        flagsValue,
      },
    });
    return data;
  }
}

export const matchProvider = new MatchProvider();
