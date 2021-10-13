import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router} from 'react-router-dom';

import {App} from './components/app/app';

import './index.scss';

ReactDOM.render((
  <StrictMode>
    <Router>
      <App/>
    </Router>
  </StrictMode>
), document.querySelector(`#root`));

