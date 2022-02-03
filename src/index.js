import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { CryptoProvider } from './CryptoContext'


ReactDOM.render(
  <React.StrictMode>
      <CryptoProvider>
        <App /> 
      </CryptoProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

