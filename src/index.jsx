import React from 'react';
import { render } from 'react-dom';
//import { Router, Route, IndexRoute } from 'react-router';

import { HashRouter as Router , Route, IndexRoute} from 'react-router-dom'

import App from './components/App';
import Root from './components/Root';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

const container = document.getElementById('app');
const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));


render(
   <Provider store={store}>
    <Root>
        <Router>
            <App/>
        </Router> 
      </Root>
    </Provider>,
    container);