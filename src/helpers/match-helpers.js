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
