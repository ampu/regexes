const {spawn} = require(`child_process`);

const logger = require(`../modules/logger`);

const REMOTE_ENGINES_GROUP = `remote`;

/** @enum */
const Engine = {
  NODE_JS: {
    value: `node-js`,
    async matchAll(engineValue, text, patternValue, flagsValue) {
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
    },
  },
  PHP: {
    value: `php`,
    matchAll(engineValue, text, patternValue, flagsValue) {
      return foreignMatchAll(`php`, `${__dirname}/php/match-all.php`, engineValue, text, patternValue, flagsValue);
    },
  },
  PYTHON: {
    value: `python`,
    matchAll(engineValue, text, patternValue, flagsValue) {
      return foreignMatchAll(`python3`, `${__dirname}/python/match-all.py`, engineValue, text, patternValue, flagsValue);
    },
  },
  RUBY: {
    value: `ruby`,
    matchAll(engineValue, text, patternValue, flagsValue) {
      return foreignMatchAll(`ruby`, `${__dirname}/ruby/match-all.rb`, engineValue, text, patternValue, flagsValue);
    },
  },
  DOTNET: {
    value: `dotnet`,
    matchAll(engineValue, text, patternValue, flagsValue) {
      return foreignMatchAll(`sh`, `${__dirname}/dotnet/match-all.sh`, engineValue, text, patternValue, flagsValue);
    },
  },
  JVM: {
    value: `jvm`,
    matchAll(engineValue, text, patternValue, flagsValue) {
      return foreignMatchAll(`sh`, `${__dirname}/jvm/match-all.sh`, engineValue, text, patternValue, flagsValue);
    },
  },
  PCRE1: {
    value: `pcre1`,
    matchAll(engineValue, text, patternValue, flagsValue) {
      return foreignMatchAll(``, `${__dirname}/c/match-via-pcre/bin/match-all`, engineValue, text, patternValue, flagsValue);
    },
  },
  PCRE2: {
    value: `pcre2`,
    matchAll(engineValue, text, patternValue, flagsValue) {
      return foreignMatchAll(``, `${__dirname}/c/match-via-pcre2/bin/match-all`, engineValue, text, patternValue, flagsValue);
    },
  },
};

const findEngineByValue = (engineValue) => {
  return Object.values(Engine).find((engine) => engine.value === engineValue);
};

const foreignMatchAll = async (command, script, engineValue, text, patternValue, flagsValue) => {
  return new Promise((resolve) => {
    try {
      const process = spawn(command || script, [
        script,
        engineValue,
        text,
        patternValue,
        flagsValue,
      ].slice(command ? 0 : 1));

      process.on(`error`, (error) => {
        logger.error(error);
      });

      let stdout = ``;
      let stderr = ``;

      process.stdout.on(`data`, (data) => {
        stdout += data;
      });

      process.stderr.on(`data`, (data) => {
        stderr += data;
      });

      process.on('close', (code) => {
        try {
          console.log(`stdout`, stdout);
          console.log(`stderr`, stderr);
          resolve(JSON.parse(stdout));
        } catch (exception) {
          resolve({engineValue, error: {message: exception.message}});
        }
      });
    } catch (exception) {
      resolve({engineValue, error: {message: exception.message}});
    }
  });
};

module.exports = {
  REMOTE_ENGINES_GROUP,
  Engine,
  findEngineByValue,
};
