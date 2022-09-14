import React from "react";
import { Component } from "react";
import { render } from "@testing-library/react";

import img1 from "../assets/sample.jpg";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";

import { connect } from "react-redux";
import { addItem } from "../store/mpRedux";

const skyData = {
  //Consists of Bazil rajapakshe's details
  //We tke this data from somewhere else
  userToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjkzMWRiZWM3MDFlMWYzNGMzOTYwNCIsImlhdCI6MTU5NjUzNTI2MCwiZXhwIjoxNTk5MTI3MjYwfQ.70J5YnM7s13RU0HVVAHcn54Nn3GimuGuMxT1wKpevS8",
};

const apiUrl = "https://kiyanna.world/api/v1/";

class AdminIdea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ideas: [],
      ideaID: null,
    };
  }

  passingId = (id) => {
    this.props.addItem(id);
  };

  passingApprove = (id) => {
    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${skyData.userToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ approve: true }),
    };
    fetch(apiUrl + "ideas/" + id + "/approve", requestOptions)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          //console.log(json);
          alert("Data Approved!");
          this.props.reload();
        } else {
          //console.log(json);
          alert("Error Approve data!");
        }
      });
  };

  deleteIdea = (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${skyData.userToken}`,
      },
    };
    fetch(apiUrl + "ideas/" + id, requestOptions)
      .then((res) => res.json())
      .then((json) => {
        //console.log(json);
        if (json.success) {
          alert("Data Deleted!");
          //console.log(json);
          this.props.reload();
        } else {
          //console.log(json);
          alert("Error Delete data!");
        }
      });
  };

  render() {
    return (
      <div>
        {this.props.ideasList.map((idea) => (
          <div class='row' key={idea.id}>
            <div className='col-lg-12 my-4'>
              <div className='row card'>
                <div className='card-body'>
                  <div class='row'>
                    <div class='text-center'>
                      <img
                        src={img1}
                        class='rounded'
                        style={{ marginLeft: "15px", width: "30px" }}
                        alt='...'
                      />
                    </div>

                    <h4
                      className='card-title text-left'
                      style={{ marginLeft: "15px" }}
                    >
                      <Link>{idea.user.name}</Link> @{" "}
                      <Link
                        to='/home/mp-profile'
                        onClick={() => this.passingId(idea.mp_profile._id)}
                      >
                        {idea.mp_profile.name}
                      </Link>
                    </h4>
                  </div>

                  <p className='card-text text-left'>{idea.idea}</p>
                </div>
                <div className='card-footer'>
                  <div class='row'>
                    <div class='row' style={{ marginLeft: "25px" }}>
                      <button
                        disabled={idea.isApproved}
                        href='#'
                        className='btn btn-primary btn-sm'
                        style={{ marginRight: "10px" }}
                        onClick={() => this.passingApprove(idea._id)}
                      >
                        {idea.isApproved ? "Approved" : "Approve"}
                      </button>
                      <button
                        //disabled={idea.isApproved}
                        href='#'
                        className='btn btn-danger btn-sm'
                        //style={{ margin: "10px" }}
                        onClick={() => this.deleteIdea(idea._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (id) => dispatch(addItem(id)),
  };
};

export default connect(null, mapDispatchToProps)(AdminIdea);
