const {REMOTE_ENGINES_GROUP, findEngineByValue} = require(`../engines/engine-helpers`)
const {sleep} = require(`../../shared/helpers/callback-helpers`);

const matchAll = async (req, res) => {
  console.log(`matchAll`, req.body);

  const requestId = req.query.requestId;
  const engineValues = req.body.engineValues;
  const text = req.body.text;
  const pattern = req.body.pattern;
  const flagsValue = req.body.flagsValue;

  let results = [];
  if (!Array.isArray(engineValues) || engineValues.length === 0) {
    results.push({engineValue: REMOTE_ENGINES_GROUP, error: {message: `invalid engines`}})
  } else {
    results = await Promise.all(engineValues.map(async (engineValue) => {
      const engine = findEngineByValue(engineValue);
      if (!engine) {
        return {engineValue, error: {message: `invalid engine`}};
      }
      return engine.matchAll(engineValue, text, pattern, flagsValue);
    }));
  }

  res.set(`Access-Control-Allow-Origin`, `*`)
  res.send({
    requestId,
    results,
  });
};

module.exports = {
  matchAll,
  sleep,
};
