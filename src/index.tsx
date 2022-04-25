import React from 'react';
import ReactDOM from 'react-dom';
import './scss/core/resets.scss';
import './scss/core/generic-classes.scss';
import App from './App';
import { Provider } from 'react-redux';
import movieStore from './store';

ReactDOM.render(
  <Provider store={movieStore}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
