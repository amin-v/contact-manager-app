import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "react-confirm-alert/src/react-confirm-alert.css"
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter } from 'react-router-dom';

/*import "bootstrap/dist/css/cssbootstarp.min.css"; //rahe aval estefade az bootstarp
import "bootstarp/dist/js/bootstarp.min.js";*/ 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </BrowserRouter>
);
