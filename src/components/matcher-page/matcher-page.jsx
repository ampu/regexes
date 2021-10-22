import React from 'react';

import {LocalPath} from 'constants/local-path';
import {localMatchAll} from 'helpers/match-helpers';
import {generateId} from 'shared/helpers/id-helpers';
import {matchProvider} from 'providers/match-provider';

const ALL_ENGINES_KEY = `all`;
const REMOTE_ENGINES_KEY = `remote`;
const EMPTY_RESULTS = [];

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
};

const findEngineByValue = (engineValue) => {
  return Object.values(Engine).find((engine) => engine.value === engineValue);
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

const submitMatchAll = async (requestId, engineValues, text, pattern, flagsValue) => {
  const localEngineValue = Engine.BROWSER_JS.value;
  const remoteEngineValues = engineValues.filter((engineValue) => engineValue !== Engine.BROWSER_JS.value);

  const results = [];
  if (engineValues.includes(localEngineValue)) {
    const result = localMatchAll(localEngineValue, text, pattern, flagsValue);
    results.push(result);
  }
  if (remoteEngineValues.length > 0) {
    try {
      const remoteData = await matchProvider.matchAll(requestId, remoteEngineValues, text, pattern, flagsValue);
      results.push(...remoteData.results);
    } catch (exception) {
      results.push({engineValue: REMOTE_ENGINES_KEY, error: {message: exception.message}});
    }
  }
  return results;
};

const MatcherPage = () => {
  const [engines, setEngines] = React.useState(Object.values(Engine));
  const [text, setText] = React.useState(``);
  const [pattern, setPattern] = React.useState(``);
  const [flags, setFlags] = React.useState([]);
  const [results, setResults] = React.useState(EMPTY_RESULTS);
  const [requestId, setRequestId] = React.useState();
  const requestIdRef = React.useRef();

  const onEnginesChange = (toggledEngine) => {
    setEngines(createToggle(Engine, toggledEngine));
  };

  const onFlagsChange = (toggledFlag) => {
    setFlags(createToggle(Flag, toggledFlag));
  };

  const onSubmitClick = (evt) => {
    evt.preventDefault();

    const localRequestId = generateId({isSafe: false});
    const engineValues = engines.map((engine) => engine.value);
    const flagsValue = flags.map((flag) => flag.value).join(``);

    setRequestId(requestIdRef.current = localRequestId);
    setResults(EMPTY_RESULTS);

    submitMatchAll(localRequestId, engineValues, text, pattern, flagsValue)
      .then((localResults) => {
        if (requestIdRef.current === localRequestId) {
          setResults(localResults);
          setRequestId(requestIdRef.current = undefined);
        }
      })
      .catch(() => {
        if (requestIdRef.current === localRequestId) {
          setRequestId(requestIdRef.current = undefined);
        }
      });
  };

  React.useEffect(() => {
    setResults(EMPTY_RESULTS);
  }, [engines, text, pattern, flags]);

  return <>
    <main className="matcher-page">
      <h1>Regular Expression Pattern Matcher</h1>

      <div className="matcher-page__inner">
        <form method="post" action={LocalPath.MATCH_ALL}>
          <fieldset className="matcher-page__item">
            <legend className="matcher-page__item-title">Engines</legend>
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

          <button
            type="submit"
            disabled={engines.length === 0}
            onClick={onSubmitClick}
          >
            Match All
          </button>
        </form>

        <ul className="matcher-page__results">
          {engines.length === 0 && (
            <li key={ALL_ENGINES_KEY} className="matcher-page__item">
              <h2 className="matcher-page__item-title">Error</h2>
              <span>No engines checked. Please select one...</span>
            </li>
          )}
          {engines.length > 0 && results.length === 0 && (
            <li key={ALL_ENGINES_KEY} className="matcher-page__item">
              {!requestId && <span>Click «Match All» button to receive results...</span>}
              {requestId && <span>Evaluating...</span>}
            </li>
          )}
          {results.length > 0 && results.map(({engineValue, matches, error}) => {
            let subtitle = ``;
            if (error) {
              subtitle = `Error`;
            } else if (matches.length === 0) {
              subtitle = `No matches found`;
            } else {
              subtitle = `Matches`;
            }

            const engine = findEngineByValue(engineValue);

            return (
              <li key={engineValue} className="matcher-page__item">
                <h2 className="matcher-page__item-title">{engine ? engine.title : engineValue} - {subtitle}</h2>
                {error && <>
                  <span>{error.message}</span>
                </>}
                {!error && matches.length > 0 && <>
                  <ol>
                    {matches.map((match, matchIndex) => (
                      <li key={matchIndex}>&ldquo;{match.substring}&ldquo;</li>
                    ))}
                  </ol>
                </>}
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  </>;
};

export {MatcherPage};
