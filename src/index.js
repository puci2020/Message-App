import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Layout from './theme/Layout';
import reducer, { initialState } from './services/reducer';
import { StateProvider } from './services/StateProvider';

ReactDOM.render(
    <StateProvider initialState={initialState} reducer={reducer}>
        <Layout>
            <App />
        </Layout>
    </StateProvider>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
