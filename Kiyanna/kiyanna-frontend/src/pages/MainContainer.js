import React from 'react';
import '../App.css';

import Home from './home';
import MpProfile from './MpProfile';
import NavBar from '../components/navBar';
import allMps from './allMps';
import Dashboard from './Dashboard';
import addMp from './addMp';
import SearchResults from './SearchResults';
import LoadingPage from './LoadingPage';
import UserProfileTwo from './UserProfileTwo';
import CookiesPolicyPage from './CookiesPolicyPage';
import PrivacyPolicyPage from './PrivacyPolicyPage';
import TermsConditionsPage from './TermsConditoinsPage';

import {BrowserRouter as Router,
        Route,
        Switch,
        Link,
        Redirect
  } from 'react-router-dom';


function MainContainer() {
  return (
    
    <Router>

      <NavBar/>
      <Switch>
        <Route path="/home/wall" component={Home} />
        <Route path="/home/allmps" component={allMps} />
        <Route path="/home/search" component={SearchResults} />
        <Route path="/home/loading" component={LoadingPage} />
        <Route path="/home/mp-profile" component={MpProfile} />
        <Route path="/home/Dashboard" component={Dashboard} />
        <Route path="/home/addMp" component={addMp} />
        <Route path="/home/user-profile" component={UserProfileTwo} />

      </Switch>

      <footer className="py-5 bg-dark position-bottom" style={{marginTop:"150px"}}>
        <div className="container-fluid text-center">
          <p className="m-0 text-center text-white">
            Copyright &copy; kiyanna.world 2020 Sri Lanka
          </p>
          <a href="http://www.123formbuilder.com/form-5590446/visitor-interaction-form">Report a Problem</a>
          <div className="row" style={{alignItems: 'center',justifyContent: 'center'}}>
            <a href="https://www.kiyanna.world/privacy-policy">Privacy policy</a><h6>,</h6>
            <a href="https://www.kiyanna.world/terms-conditions">Terms & Conditions</a><h5 style={{marginLeft:"3px",marginRight:"3px", fontSize:"16px", marginTop:"7px"}}>and </h5> 
            <a href="https://www.kiyanna.world/cookie-policy">Cookie policy</a>  
          </div>
        </div>
      </footer>

    </Router>
  );
}

export default MainContainer;
