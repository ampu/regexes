export const localMatchAll = (engineValue, text, patternValue, flagsValue) => {
  try {
    const regexp = new RegExp(patternValue, `${flagsValue}g`);
    const it = text.matchAll(regexp);
    const results = Array.from(it);
    const matches = results.map((result) => ({
      index: result.index,
      substring: result[0],
    }));
    return {engineValue, matches};
  } catch (exception) {
    return {engineValue, error: {message: exception.message}};
  }
};
