import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "sanitize.css"
import { GlobalStyle } from './style/global';
import { ThemeContext } from 'styled-components';
import { state } from './context/themeContext';

if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mock/browser");
  worker.start();
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeContext.Provider value={state}>
      <App />
    </ThemeContext.Provider>
  </React.StrictMode>
);