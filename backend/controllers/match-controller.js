const doMatchAll = (text, pattern, flagsValue) => {
  try {
    const regexp = new RegExp(pattern, flagsValue);
    const it = text.matchAll(regexp);
    return [Array.from(it)];
  } catch (exception) {
    return [undefined, {message: exception.message}];
  }
};

const matchAll = async (req, res) => {
  const engineValue = req.query.engineValue;
  const text = req.query.text;
  const pattern = req.query.pattern;
  const flagsValue = req.query.flagsValue;

  const [matches, error] = doMatchAll(text, pattern, flagsValue);

  res.set(`Access-Control-Allow-Origin`, `*`)
  res.send([
    {error, matches}
  ]);
};

module.exports = {
  matchAll,
};
