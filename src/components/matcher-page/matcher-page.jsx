import React from 'react';

import {LocalPath} from 'constants/local-path';

/** @enum */
const Engine = {
  BROWSER_JS: {
    title: `JavaScript (browser)`,
    value: `browser-js`,
  },
  NODE_JS: {
    title: `JavaScript (node.js)`,
    value: `node-js`,
    disabled: true,
  },
  PHP: {
    title: `PHP`,
    value: `php`,
    disabled: true,
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

const MatcherPage = () => {
  const [engines, setEngines] = React.useState([Engine.BROWSER_JS]);
  const [text, setText] = React.useState(``);
  const [pattern, setPattern] = React.useState(``);
  const [flags, setFlags] = React.useState([]);
  const [shouldShowResults, setShowResults] = React.useState(false);
  const [matches, setMatches] = React.useState([]);
  const [error, setError] = React.useState();

  /* eslint-disable no-unused-vars */
  const onEnginesChange = (toggledEngine) => {
    setEngines(createToggle(Engine, toggledEngine));
  };
  /* eslint-enable no-unused-vars */

  const onFlagsChange = (toggledFlag) => {
    setFlags(createToggle(Flag, toggledFlag));
  };

  const onSubmitClick = (evt) => {
    evt.preventDefault();
    setShowResults(false);
    setError();
    setMatches([]);

    try {
      const regexp = new RegExp(pattern, `g` + flags.map((flag) => flag.value).join(``));
      const it = text.matchAll(regexp);
      setMatches(Array.from(it));
    } catch (exception) {
      setError(exception);
    }

    setShowResults(true);
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
                  readOnly
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

        {shouldShowResults && error && (
          <div className="matcher-page__item">
            <span className="matcher-page__item-title">Error</span>
            <span>{error.message}</span>
          </div>
        )}

        {shouldShowResults && !error && matches.length === 0 && (
          <div className="matcher-page__item">
            <span className="matcher-page__item-title">No matches found. Try to adjust your search...</span>
          </div>
        )}

        {shouldShowResults && !error && matches.length > 0 && (
          <div className="matcher-page__item">
            <span className="matcher-page__item-title">Matches</span>
            <ol>
              {matches.map((match, matchIndex) => (
                <li key={matchIndex}>&ldquo;{match[0]}&ldquo;</li>
              ))}
            </ol>
          </div>
        )}
      </form>
    </main>
  </>;
};

export {MatcherPage};
