import React from 'react';
import { render } from 'react-dom';
//import { Router, Route, IndexRoute } from 'react-router';

import { Router, hashHistory, Route, IndexRoute } from 'react-router'

import App from './components/App';
import SignIn from './components/SignIn';
import Root from './components/Root';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

const container = document.getElementById('app');
const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));


render(
   <Provider store={store}>
        <Router history={hashHistory}>
            <Route path ='/' component={Root}>
              <IndexRoute component={App} />
              <Route path="SignIn" component={SignIn} />
            </Route>
        </Router> 
    </Provider>,
    container);