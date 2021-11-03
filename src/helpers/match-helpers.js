const isEqual = require(`lodash/isEqual`);

export const localMatchAll = (engineValue, text, patternValue, flagsValue) => {
  const startDate = new Date();
  try {
    const regexp = new RegExp(patternValue, `${flagsValue}g`);
    const it = text.matchAll(regexp);
    const results = Array.from(it);
    return {
      engineValue,
      performance: new Date() - startDate,
      matches: results.map((result) => ({
        index: result.index,
        substring: result[0],
      })),
    };
  } catch (exception) {
    return {
      engineValue,
      performance: new Date() - startDate,
      error: {message: exception.message},
    };
  }
};

/**
 * @param {Array<{engineValue, performance, matches, error}>} results
 * @return {Array<Array<{engineValue, performance, matches, error}>>}
 */
export const groupResults = (results) => {
  const groups = [];

  for (const result of results) {
    const group = groups.find((it) => isEqual(it[0].matches, result.matches) && isEqual(it[0].error, result.error))
      || groups[groups.push([]) - 1];

    group.push(result);
  }

  return groups;
};
