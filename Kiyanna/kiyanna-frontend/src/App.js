import React from 'react';
import './App.css';

import MainContainer from './pages/MainContainer';
import Login from './pages/login';
import Register from './pages/register';
import CookiesPolicyPage from './pages/CookiesPolicyPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsConditionsPage from './pages/TermsConditoinsPage';

import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import {BrowserRouter as Router,
        Route,
        Switch,
        Link,
        Redirect
  } from 'react-router-dom';

function App() {

  document.title = 'Kiyanna';
  const store = configureStore();
  return (
    <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" ><Redirect to="/home/wall"/> </Route>
            <Route path="/home" component={MainContainer} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/cookie-policy" component={CookiesPolicyPage} />
            <Route path="/privacy-policy" component={PrivacyPolicyPage} />
            <Route path="/terms-conditions" component={TermsConditionsPage} />
          </Switch>
        </Router>
    </Provider>
  );
}

export default App;
