import React from 'react';
import { FaUserAlt, FaUserCheck, FaBook } from 'react-icons/fa';
import { Component } from 'react';
import person from '../assets/person.jpg';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from 'react-router-dom';

import img1 from '../assets/sample.jpg';

import { connect } from 'react-redux';
import { addItem } from '../store/mpRedux';


class Users extends Component {
  passingId = (id) => {
    this.props.addItem(id);
  };

  renderUser = () => {
    if (this.props.isSigned) {
        if (this.props.user.anonymous)
          return (<div>
              <div class="row text-center no-gutters" style={{marginTop:"19px"}}> 
                    <div className="col-3">
                      <img
                        src={person}
                        className="rounded"
                        style={{ marginLeft: '5px', width:"100%", marginTop:"7px", backgroundColor:"#A9A9A9",padding:"3px" }}
                        alt="..."
                      />
                    </div>

                    <div className="col-9" style={{ marginLeft: '0px' }}>
                      <h5 className="card-title font-weight-bold">Logged in As</h5>
                      <p className="card-text font-weight-bold">Anonymous</p>
                    </div>
                  </div>
          </div>);
        else{
          return (<div>
            <div class="row text-center no-gutters" style={{marginTop:"19px"}}>
                  <div className="col-3" >
                    <img
                      src={(this.props.user.profilePic_URL==='no-photo.jpg')?person:this.props.user.profilePic_URL}
                      className="rounded"
                      style={{ marginLeft: '5px', width:"100%", backgroundColor:"#A9A9A9",padding:"3px", marginTop:"7px"}}
                      alt="Me"
                    />
                  </div>

                  <div className="col-9" style={{ marginLeft: '0px' }}>
                    <h5 className="card-title font-weight-bold">Logged in As</h5>
                    <p className="card-text font-weight-bold">{this.props.user.name}</p>
                  </div>
                </div>
        </div>);
        }  
    } else {
      return(<div>
        <div class="row no-gutters text-center" style={{marginTop:"19px"}}>
              <div className="col-3">
                <img
                    src={person}
                    className="rounded"
                    style={{ marginLeft: '5px', width:"100%" , marginTop:"7px", backgroundColor:"#A9A9A9",padding:"3px"}}
                    alt="..."
                  />
              </div>

              <div className="col-9" style={{ marginLeft: '0px', marginTop:"12px" }}>
                <h4 className="card-title font-weight-bold">Guest</h4>
                
              </div>
            </div>
    </div>);
    }

  }

  render() {
    return (
      <div className="col-lg-3">
        <div
          className="row card d-none d-md-block"
          style={{ padding: '0px', marginRight: '5px', marginTop:"0px" }}
        >
          <div className="card" style={{ height:"150px" }}>
            <div className="card-body">
              
              {this.renderUser()}

            </div>
          </div>

          <div className="row mt-4" style={{ height:"150px",}}>
            <div className="col-4 text-cnter" style={{ marginTop:"25px"}}>
              <FaUserAlt
                className="align-middle"
                style={{ fontSize: '20px' }}
              />

              <h6 className="align-middle">{this.props.userList}</h6>
              <h6>Users</h6>
            </div>
            <div className="col-4 text-center" style={{ marginTop:"25px"}}>
              <FaUserCheck
                className="align-middle"
                style={{ fontSize: '25px' }}
              />

              <h6 className="align-middle">{this.props.mps}</h6>
              <h6>MPS</h6>
            </div>
            <div className="col-4 text center" style={{ marginTop:"25px"}}>
              <FaBook className="align-middle" style={{ fontSize: '20px' }} />

              <h6 className="align-middle">{this.props.count}</h6>
              <h6>Ideas</h6>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (id) => dispatch(addItem(id)),
  };
};

export default connect(null, mapDispatchToProps)(Users);
