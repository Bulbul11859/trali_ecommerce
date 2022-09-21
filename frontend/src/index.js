import React from 'react';
import ReactDOM from 'react-dom';
import 'rsuite/dist/rsuite.min.css'
import { createRoot } from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';

import App from './App';
import './style.css'
import './responsibe.css'
import { StoreProvider } from './Store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <StoreProvider>
    <App />
    </StoreProvider>
  
);

