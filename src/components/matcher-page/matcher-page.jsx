import React from 'react';

import {LocalPath} from 'constants/local-path';
import {localMatchAll} from 'helpers/match-helpers';
import {matchProvider} from 'providers/match-provider';

const REMOTE_ENGINES_GROUP = `remote`;

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
};

/** @enum */
const Flag = {
  IGNORE_CASE: {
    title: `Ignore Case`,
    value: `i`,
  },
  SINGLE_LINE: {
    title: `Single Line`,
    value: `s`,
  },
  MULTILINE: {
    title: `Multiline`,
    value: `m`,
  },
};

const createToggle = (Enumeration, toggledItem) => {
  return (previousItems) => {
    const shouldExclude = previousItems.includes(toggledItem);

    return Object.values(Enumeration).filter((item) => {
      return shouldExclude
        ? (previousItems.includes(item) && item !== toggledItem)
        : (previousItems.includes(item) || item === toggledItem);
    });
  };
};

const submitMatchAll = async (engineValues, text, pattern, flagsValue) => {
  const localEngineValue = Engine.BROWSER_JS.value;
  const remoteEngineValues = engineValues.filter((engineValue) => engineValue !== Engine.BROWSER_JS.value);

  const results = [];
  if (engineValues.includes(localEngineValue)) {
    const result = localMatchAll(localEngineValue, text, pattern, flagsValue);
    results.push(result);
  }
  if (remoteEngineValues.length > 0) {
    try {
      const remoteResults = await matchProvider.matchAll(remoteEngineValues, text, pattern, flagsValue);
      results.push(...remoteResults);
    } catch (exception) {
      results.push({engineValue: REMOTE_ENGINES_GROUP, error: {message: exception.message}});
    }
  }
  return results;
};

const MatcherPage = () => {
  const [engines, setEngines] = React.useState([Engine.BROWSER_JS]);
  const [text, setText] = React.useState(``);
  const [pattern, setPattern] = React.useState(``);
  const [flags, setFlags] = React.useState([]);
  const [results, setResults] = React.useState([]);
  const [, setPending] = React.useState(false);

  const onEnginesChange = (toggledEngine) => {
    setEngines(createToggle(Engine, toggledEngine));
  };

  const onFlagsChange = (toggledFlag) => {
    setFlags(createToggle(Flag, toggledFlag));
  };

  const onSubmitClick = (evt) => {
    evt.preventDefault();

    const engineValues = engines.map((engine) => engine.value);
    const flagsValue = flags.map((flag) => flag.value).join(``);

    setPending(true);
    setResults([]);

    submitMatchAll(engineValues, text, pattern, flagsValue)
      .then((matchAllResults) => {
        setResults(matchAllResults);
      })
      .finally(() => {
        setPending(false);
      });
  };

  return <>
    <main className="matcher-page">
      <h1>Regular Expression Pattern Matcher</h1>

      <form method="post" action={LocalPath.MATCH_ALL}>
        <fieldset className="matcher-page__item">
          <legend className="matcher-page__item-title">Engine</legend>
          {Object.values(Engine).map((engine) => {
            return (
              <label key={engine.value} className="matcher-page__checkbox-label">
                <input
                  type="checkbox"
                  name="engines"
                  value={engine.value}
                  checked={engines.includes(engine)}
                  onChange={() => onEnginesChange(engine)}
                  disabled={engine.disabled}
                />
                {engine.title}
              </label>
            );
          })}
        </fieldset>

        <div className="matcher-page__item">
          <label className="matcher-page__item-title">Text</label>
          <textarea
            name="text"
            rows="3"
            value={text}
            onChange={(evt) => setText(evt.currentTarget.value)}
          />
        </div>

        <div className="matcher-page__item">
          <label htmlFor="matcher-pattern" className="matcher-page__item-title">Pattern (regular expression)</label>
          <div className="matcher-page__pattern-inner">
            <input
              id="matcher-pattern"
              type="text"
              name="pattern"
              value={pattern}
              onChange={(evt) => setPattern(evt.currentTarget.value)}
            />
          </div>
        </div>

        <fieldset className="matcher-page__item">
          {Object.values(Flag).map((flag) => {
            return (
              <label key={flag.value} className="matcher-page__checkbox-label">
                <input
                  type="checkbox"
                  name="flags"
                  value={flag.value}
                  checked={flags.includes(flag)}
                  onChange={() => onFlagsChange(flag)}
                />
                {flag.title} (/{flag.value})
              </label>
            );
          })}
        </fieldset>

        <button type="submit" onClick={onSubmitClick}>Match All</button>

        {results.length > 0 && <>
          <ul className="matcher-page__results">
            {results.map(({engineValue, matches, error}) => {
              let subtitle = ``;
              if (error) {
                subtitle = `Error`;
              } else if (matches.length === 0) {
                subtitle = `No matches found`;
              } else {
                subtitle = `Matches`;
              }
              return (
                <div key={engineValue} className="matcher-page__item">
                  <h2 className="matcher-page__item-title">{engineValue} - {subtitle}</h2>
                  {error && <>
                    <span>{error.message}</span>
                  </>}
                  {!error && matches.length > 0 && <>
                    <ol>
                      {matches.map((match, matchIndex) => (
                        <li key={matchIndex}>&ldquo;{match[0]}&ldquo;</li>
                      ))}
                    </ol>
                  </>}
                </div>
              );
            })}
          </ul>
        </>}
      </form>
    </main>
  </>;
};

export {MatcherPage};
