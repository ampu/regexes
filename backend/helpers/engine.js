const {spawn} = require(`child_process`);

const foreignMatchAll = async (command, script, engineValue, text, patternValue, flagsValue) => {
  return new Promise((resolve) => {
    try {
      const process = spawn(command, [
        script,
        engineValue,
        text,
        patternValue,
        flagsValue,
      ]);

      let stdout = ``;

      process.stdout.on('data', (data) => {
        stdout += data;
      });

      process.on('close', (code) => {
        try {
          console.log(`stdout`, stdout);
          resolve(JSON.parse(stdout));
        } catch (exception) {
          resolve({error: {message: exception.message}});
        }
      });
    } catch (exception) {
      resolve({error: {message: exception.message}});
    }
  });
};

/** @enum */
const Engine = {
  NODE_JS: {
    value: `node-js`,
    matchAll(_, text, patternValue, flagsValue) {
      console.log(`matchAll`, JSON.stringify({text, patternValue, flagsValue}))
      try {
        const regexp = new RegExp(patternValue, `${flagsValue}g`);
        const it = text.matchAll(regexp);
        return {matches: Array.from(it)};
      } catch (exception) {
        return {error: {message: exception.message}};
      }
    },
  },
  PHP: {
    value: `php`,
    matchAll(engineValue, text, patternValue, flagsValue) {
      return foreignMatchAll(`php`, `${__dirname}/../php/match-all.php`, engineValue, text, patternValue, flagsValue);
    },
  },
};

const findEngineByValue = (engineValue) => {
  return Object.values(Engine).find((engine) => engine.value === engineValue);
};

module.exports = {
  Engine,
  findEngineByValue,
};
