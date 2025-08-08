import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContext from './Context/AuthContext.jsx'
import  UserContext  from './Context/UserContext.jsx'
import { Auth0Provider } from '@auth0/auth0-react';
createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain="dev-lmm83bwhrqtim6qx.us.auth0.com"
    clientId="gcY1UYPUQscuShXwMN0ZrYEc31jkuvZr"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
 <BrowserRouter>
 <AuthContext>
  <UserContext>
    <App />
    </UserContext>
    </AuthContext>
   </BrowserRouter>
   
  </Auth0Provider>
)
