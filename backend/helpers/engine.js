const {spawn} = require(`child_process`);

const REMOTE_ENGINES_GROUP = `remote`;

/** @enum */
const Engine = {
  NODE_JS: {
    value: `node-js`,
    matchAll(engineValue, text, patternValue, flagsValue) {
      try {
        const regexp = new RegExp(patternValue, `${flagsValue}g`);
        const it = text.matchAll(regexp);
        const matches = Array.from(it);
        return {engineValue, matches};
      } catch (exception) {
        return {engineValue, error: {message: exception.message}};
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

module.exports = {
  REMOTE_ENGINES_GROUP,
  Engine,
  findEngineByValue,
};
