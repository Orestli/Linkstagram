import React from 'react';
import ReactDOM from 'react-dom';
import App from './ui/boot/router/index';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {setupStore} from "./core/store/store";

ReactDOM.render(
  <React.StrictMode>
      <Provider store={setupStore}>
          <BrowserRouter>
              <App />
          </BrowserRouter>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();