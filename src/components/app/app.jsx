import React from 'react';
import {Route, Switch} from 'react-router-dom';

import {MatcherPage} from '../matcher-page/matcher-page';
import {NotFoundPage} from '../not-found-page/not-found-page';

import {LocalPath} from '../../constants/local-path';

const App = () => {
  return <>
    <Switch>
      <Route exact path={LocalPath.MATCHER}>
        <MatcherPage/>
      </Route>
      <Route>
        <NotFoundPage/>
      </Route>
    </Switch>
  </>;
};

export {App};
