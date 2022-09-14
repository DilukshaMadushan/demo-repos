import React from "react";
import { Component } from "react";
import { render } from "@testing-library/react";
import RatingIndicatorNoText from "./RatingIndicatorNoText";
import { Modal } from "react-bootstrap";
import "./SignInPopUp.css";
import ReactStars from "react-rating-stars-component";

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
import { addFollow } from "../store/mpListRedux";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const apiUrl = "https://kiyanna.world/api/v1/";
const cookieObject = { path: "/" }; //{ path: '/',domain : 'kiyanna.world', secure:true };

class MpItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mpList: this.props.mpList,
      token: "",
      popModal: false, //used to pop-up the modal when the user tries follow a MP without signing in
    };

    this.passingId = this.passingId.bind(this);
  }

  componentWillMount() {
    if (this.props.isSigned) {
      const token = cookies.get("token");
      this.setState({ token: token });
    }
  }

  //----------- redirect to MP ------------------

  passingId = (id) => {
    cookies.set("mp-id", id, cookieObject);
    this.setRedirectToMp();
    //this.props.addItem(id);
  };

  setRedirectToMp = () => {
    this.setState({ redirect: true });
  };

  renderRedirectToMP = () => {
    if (this.state.redirect) {
      return <Redirect to="/home/mp-profile" />;
    }
  };

  //------------- Send Follow --------------------------------

  sendFollowReq = (item, action) => {
    const requestOptions = {
      method: "PUT",
      headers: { Authorization: "Bearer " + this.state.token },
    };

    fetch(apiUrl + "mp-profiles/" + item.id + "/" + action, requestOptions)
      .then((response) => response.json())
      .then((json) => {
        //console.log(json);
        if (json.success) {
          //alert("Success");
        } else {
          this.passingAddFollow(item);
          alert("Error");
        }
      });
  };

  followMp = (item) => {
    if (this.props.isSigned) {
      this.passingAddFollow(item);
      if (item.isFollow) {
        this.sendFollowReq(item, "follow");
      } else {
        this.sendFollowReq(item, "unfollow");
      }
    } else {
      // alert("Please Signin before Follow MPS");
      this.setState({
        popModal: true,
      });
    }
  };

  passingAddFollow = (item) => {
    this.props.addFollow(item);
    //console.log(item);
  };

  // --------- For Searching Only ---------------

  renderNoItems() {
    if (this.props.mpList.length === 0) {
      return (
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: "150px",
            marginBottom: "300px",
          }}
        >
          <h3 style={{ color: "gray" }}>No Search Results</h3>
        </div>
      );
    }
  }

  //------------------------ To close the Popup ----------------------------\\
  ClosePopUp = () => {
    this.setState({
      popModal: false,
    });
  };

  render() {
    return (
      <div>
        {/* Display thtis Modal if the user tries to follow a MP before signing in */}
        <div className="container-fluid">
          <div className="row">
            <Modal
              show={this.state.popModal}
              size="sm"
              className="My-modal"
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <div className="container-fluid" style={{ padding: "7px" }}>
                <div className="row m-1">
                  <div className="col text-center">
                    Please sign in to Follow a MP!
                  </div>
                </div>
                <div className="row m-1">
                  <div className="col-6 d-flex justify-content-end">
                    <div>
                      <a href="https://kiyanna.world/login">
                        <button className="btn btn-primary btn-sm">
                          Sign In
                        </button>
                      </a>
                    </div>
                  </div>
                  <div className="col-6 d-flex justify-content-start">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => this.setState({ popModal: false })}
                    >
                      Later
                    </button>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        </div>
        {/* End of the Modal */}

        {this.renderRedirectToMP()}
        {/* {this.renderNoItems()} */}
        {this.props.mpList.map((item) => (
          <div>
            {item.name === "Everybody" ? (
              <div></div>
            ) : (
              <div>
                {/* <p> ------ mobile View --------------</p> */}

                <div className="row no-gutters d-md-none" key={item.id + "1"}>
                  <div className="col-lg-12 my-4">
                    <div className="row card no-gutters">
                      <div className="card-body ">
                        <Link
                          to="/home/mp-profile"
                          onClick={() => this.passingId(item._id)}
                          style={{ textDecoration: "none" }}
                        >
                          <div className="row no-gutters">
                            <div class="col-3">
                              <div class="text-center">
                                <img
                                  src={item.profilePic}
                                  className="rounded"
                                  style={{ width: "100%" }}
                                  alt="..."
                                />
                              </div>
                            </div>

                            <div class="col-9">
                              <div class="row ml-3">
                                <h5
                                  className="card-title text-left"
                                  style={{ color: "black", fontSize: 17 }}
                                >
                                  {item.name}
                                </h5>
                              </div>
                              <div className="text-left ml-3">
                                {/* <RatingIndicatorNoText
                              rating={item.averageRating}
                            /> */}
                                <ReactStars
                                  count={5}
                                  value={item.averageRating}
                                  edit={false}
                                  size={18}
                                  activeColor="#ffd700"
                                />
                              </div>

                              <p
                                className="card-text text-left ml-3 mt-1"
                                style={{ fontSize: "14px" }}
                              >
                                {item.description.slice(0, 50)}...
                              </p>
                            </div>
                          </div>
                        </Link>
                      </div>

                      <div className="card-footer">
                        <div
                          class="row"
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <button
                            className="btn btn-primary btn-sm"
                            style={{ marginRight: "5px" }}
                            onClick={() => this.followMp(item)}
                          >
                            {item.isFollow ? `Followed` : `Follow`}
                          </button>

                          <Link
                            to="/home/mp-profile"
                            onClick={() => this.passingId(item._id)}
                            className="btn btn-dark btn-sm"
                            style={{ marginLeft: "5px" }}
                          >
                            Kiyanna
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <p> ------------- PC View --------------</p> */}

                <div
                  className="row no-gutters d-none d-md-block"
                  key={item.id + "2"}
                >
                  <div className="col-lg-12 my-4">
                    <div className="row card no-gutters">
                      <div className="card-body ">
                        <Link
                          to="/home/mp-profile"
                          onClick={() => this.passingId(item._id)}
                          style={{ textDecoration: "none" }}
                        >
                          <div className="row no-gutters">
                            <div class="col-3">
                              <div class="text-center">
                                <img
                                  src={item.profilePic}
                                  className="rounded"
                                  style={{ width: "100%" }}
                                  alt="..."
                                />
                              </div>
                            </div>

                            <div class="col-9">
                              <div class="row ml-3">
                                <h5
                                  className="card-title text-left"
                                  style={{ color: "black" }}
                                >
                                  {item.name}
                                </h5>
                              </div>
                              <div className="text-left ml-3">
                                {/* <RatingIndicatorNoText
                              rating={item.averageRating}
                            /> */}
                                <ReactStars
                                  count={5}
                                  value={item.averageRating}
                                  edit={false}
                                  size={22}
                                  activeColor="#ffd700"
                                />
                              </div>

                              <p className="card-text text-left ml-3 mt-2">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </div>

                      <div className="card-footer">
                        <div class="row">
                          <div class="row" style={{ marginLeft: "40px" }}>
                            <button
                              className="btn btn-primary btn-sm"
                              style={{ marginRight: "10px" }}
                              onClick={() => this.followMp(item)}
                            >
                              {item.isFollow ? `Followed` : `Follow`}
                            </button>
                            {/* <p
                        className="card-text align-center"
                        style={{ marginRight: '15px' }}
                      >
                        955
                      </p> */}
                          </div>
                          <Link
                            to="/home/mp-profile"
                            onClick={() => this.passingId(item._id)}
                            className="btn btn-dark btn-sm"
                            style={{ marginLeft: "15px" }}
                          >
                            Kiyanna
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    mpList: state.mpListRedux.mpList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (item) => dispatch(addItem(item)),
    addFollow: (item) => dispatch(addFollow(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MpItem);
