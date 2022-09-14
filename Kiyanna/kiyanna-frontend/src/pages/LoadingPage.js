import React from 'react';
import { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class LoadingPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      
    };
  }

  
  renderRedirect = () => {
      return <Redirect to='/home/search'/>
  }


  
  render() {
    return (
      <div className="loading">
        {this.renderRedirect()}
      </div>
    );
  }
}

export default LoadingPage;

