const {findEngineByValue} = require(`../helpers/engine`)

const matchAll = async (req, res) => {
  const engineValues = req.query.engineValues;
  const text = req.query.text;
  const pattern = req.query.pattern;
  const flagsValue = req.query.flagsValue;

  let results = [];
  if (!Array.isArray(engineValues) || engineValues.length === 0) {
    results.push({error: {message: `invalid engines`}})
  } else {
    results = await Promise.all(engineValues.map(async (engineValue) => {
      const engine = findEngineByValue(engineValue);
      if (!engine) {
        return {error: {message: `invalid engine`}};
      }
      return engine.matchAll(engineValue, text, pattern, flagsValue);
    }));
  }

  res.set(`Access-Control-Allow-Origin`, `*`)
  res.send(results);
};

module.exports = {
  matchAll,
};
