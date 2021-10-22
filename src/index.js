import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Layout from './theme/Layout';
import reducer, { actionTypes, initialState } from './services/reducer';
import { StateProvider, useStateValue } from './services/StateProvider';
import allReducers from './state/reducers/store';

const store = createStore(allReducers);

ReactDOM.render(
  // <StateProvider initialState={initialState} reducer={reducer}>
  <Provider store={store}>
    <Layout>
      <App />
    </Layout>
  </Provider>,
  // </StateProvider>,
  document.getElementById('root')
);

reportWebVitals();
