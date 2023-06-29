import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import Store from './Store';
import App from './App';
import './App.scss';
createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <App />
  </Provider>
);
