export const localMatchAll = (_, text, pattern, flagsValue) => {
  try {
    const regexp = new RegExp(pattern, flagsValue);
    const it = text.matchAll(regexp);
    return {matches: Array.from(it)};
  } catch (e) {
    return {error: e};
  }
};
