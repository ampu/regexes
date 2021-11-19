import axios from 'axios';

const REQUEST_TIMEOUT = 10000;

class MatchProvider {
  constructor() {
    this._client = axios.create({
      timeout: REQUEST_TIMEOUT,
    });
  }

  buildURL(endpoint) {
    return `${process.env.REACT_APP_API_BASE_URL}/${endpoint}`;
  }

  /**
   * @param {string} requestId
   * @param {string[]} engineValues
   * @param {string} text
   * @param {string} pattern
   * @param {string} flagsValue
   * @return {Promise<{matches: {index: number, substring: string}[], error: {message: string}[]}>}
   */
  async matchAll(requestId, engineValues, text, pattern, flagsValue) {
    const {data} = await this._client.request({
      method: `post`,
      url: this.buildURL(`match-all`),
      params: {
        requestId,
      },
      data: {
        engineValues,
        text,
        pattern,
        flagsValue,
      },
    });
    return data.results;
  }
}

export const matchProvider = new MatchProvider();
