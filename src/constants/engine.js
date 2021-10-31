/** @enum */
const Engine = {
  BROWSER_JS: {
    title: `JavaScript (browser)`,
    value: `browser-js`,
  },
  NODE_JS: {
    title: `JavaScript (node.js)`,
    value: `node-js`,
  },
  PHP: {
    title: `PHP`,
    value: `php`,
  },
  PYTHON: {
    title: `Python`,
    value: `python`,
  },
  RUBY: {
    title: `Ruby`,
    value: `ruby`,
  },
  DOTNET: {
    title: `.NET (C#)`,
    value: `dotnet`,
  },
  JVM: {
    title: `JVM (Kotlin)`,
    value: `jvm`,
  },
  GO: {
    title: `Go`,
    value: `go`,
  },
  RUST: {
    title: `Rust`,
    value: `rust`,
  },
  PCRE1: {
    title: `PCRE1 (C++)`,
    value: `pcre1`,
  },
  PCRE2: {
    title: `PCRE2 (C++)`,
    value: `pcre2`,
  },
};

const ENGINES = Object.values(Engine);

const findEngineByValue = (engineValue) => {
  return Object.values(Engine).find((engine) => engine.value === engineValue);
};

export {
  Engine,
  ENGINES,
  findEngineByValue,
};
