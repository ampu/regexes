export const localMatchAll = (engineValue, text, patternValue, flagsValue) => {
  try {
    const regexp = new RegExp(patternValue, `${flagsValue}g`);
    const it = text.matchAll(regexp);
    const matches = Array.from(it);
    return {engineValue, matches};
  } catch (exception) {
    return {engineValue, error: {message: exception.message}};
  }
};
