import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import App from './components/App';
render(
  ( <Router history={browserHistory}>
            <Route path="/" component={App} >
            </Route>
      </Router> ),
    document.getElementById('app')
);
