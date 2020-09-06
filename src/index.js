import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import burgerBuilderreducer from './store/reducer/burgerBuilder';
import orderreducer from './store/reducer/order';
import myOrderreducer from './store/reducer/myOrders';
import authreducer from './store/reducer/auth';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import { watchAuth, watchBurgerBuilder, watchOrder } from './store/saga';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderreducer,
    order: orderreducer,
    myOrder: myOrderreducer,
    auth: authreducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk, sagaMiddleware)));

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurgerBuilder);
sagaMiddleware.run(watchOrder);

const app = (
              <Provider store = {store}>
              <BrowserRouter>
                  <React.StrictMode>
                  <App />
                </React.StrictMode>
              </BrowserRouter>
              </Provider>
            );


ReactDOM.render(
app,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
