export const localMatchAll = (_, text, pattern, flagsValue) => {
  try {
    const regexp = new RegExp(pattern, `${flagsValue}g`);
    const it = text.matchAll(regexp);
    return {matches: Array.from(it).map((match) => match[0])};
  } catch (e) {
    return {error: e};
  }
};
