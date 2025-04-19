import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';
import { AppContextProvider } from './Context/AppContext.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </Auth0Provider>
  </BrowserRouter>
);
