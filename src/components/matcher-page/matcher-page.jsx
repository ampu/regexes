import React from 'react';

import {LocalPath} from 'constants/local-path';
import {Engine, ENGINES, findEngineByValue} from 'constants/engine';
import {localMatchAll} from 'helpers/match-helpers';
import {generateId} from 'shared/helpers/id-helpers';
import {formatTotalSeconds} from 'shared/helpers/date-helpers';
import {matchProvider} from 'providers/match-provider';
import {enginesStore} from 'providers/engines-store';

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
  UNICODE: {
    title: `Unicode`,
    value: `u`,
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

const getSubstrings = (text, matches) => {
  if (matches.length === 0) {
    return [text];
  }
  let afterMatchIndex = 0;
  const substrings = [];
  for (const match of matches) {
    substrings.push(text.substring(afterMatchIndex, match.index), match.substring);
    afterMatchIndex = match.index + match.substring.length;
  }
  substrings.push(text.substring(afterMatchIndex));
  return substrings;
};

const MatcherPage = () => {
  const [engines, setEngines] = React.useState(ENGINES);
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
    setEngines(enginesStore.getEngines());
  }, []);

  React.useEffect(() => {
    enginesStore.setEngines(engines);
  }, [engines]);

  React.useEffect(() => {
    setResults(EMPTY_RESULTS);
  }, [text, pattern, flags]);

  return <>
    <main className="matcher-page">
      <h1>Regular Expression Pattern Matcher</h1>

      <div className="matcher-page__inner">
        <form method="post" action={LocalPath.MATCH_ALL}>
          <fieldset className="matcher-page__item">
            <legend className="matcher-page__item-title">Engines</legend>
            <div className="matcher-page__engines-inner">
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
            </div>
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
              <span>No engines checked. Please select one...</span>
            </li>
          )}
          {engines.length > 0 && results.length === 0 && (
            <li key={ALL_ENGINES_KEY} className="matcher-page__item">
              {!requestId && <span>Click «Match All» button to receive results...</span>}
              {requestId && <span>Evaluating...</span>}
            </li>
          )}
          {results.length > 0 && results.map(({engineValue, performance, matches, error}) => {
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
                <h2 className="matcher-page__item-title">
                  {engine ? engine.title : engineValue} - {subtitle}
                  {Number.isFinite(performance) &&
                  <span className="matcher-page__result-performance"> (in {formatTotalSeconds(performance)}s)</span>}
                </h2>
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
                {!error && (
                  <p className="matcher-page__text-with-matches">
                    {getSubstrings(text, matches).map((substring, substringIndex) => {
                      return substringIndex % 2 === 1
                        ? <b key={substringIndex}>{substring}</b>
                        : <span key={substringIndex}>{substring}</span>;
                    })}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  </>;
};

export {MatcherPage};
