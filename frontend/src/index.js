import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { I18nextProvider } from "react-i18next";
import "./i18n";
ReactDOM.render(
  <I18nextProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </I18nextProvider>
  , document.getElementById('root')
);



