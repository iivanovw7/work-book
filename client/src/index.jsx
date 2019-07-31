import '@babel/polyfill/noConflict';
import dotenv from 'dotenv';
import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import { BrowserRouter } from 'react-router-dom';
import StoreContext from 'storeon/react/context';
import routes from './routes';
import { store } from './store';
import { Global } from './styles';

dotenv.config();
const mountPoint = document.getElementById('root');

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <Helmet>
      <meta charSet="utf-8" />
      <title>workbook</title>
      <link rel="canonical" href="/" />
    </Helmet>
    <BrowserRouter>
      <Global />
      {routes}
    </BrowserRouter>
  </StoreContext.Provider>,
  mountPoint
);

module.hot.accept();
