import React from 'react';
import { Component } from 'react';
import { render } from '@testing-library/react';

import img1 from '../assets/sample.jpg'

import {BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from 'react-router-dom';


class AddMp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ideas: [],
      ideaID:null,
    };
  }


  render() {
    return (
        <div className="card" style={{ marginTop: '20px'}}>
          <div className="card-body">
            <h5 className="card-title font-weight-bold">Logged in</h5>
            <form className="col-3">
              <label>
                Name:
                <input type="text" name="name" />
              </label>
              <label>
                Password:
                <input type="text" name="password" />
              </label>
              <input type="button" value="Submit" />
            </form>
          </div>
        </div>
    );
  }
}

  
export default AddMp;
