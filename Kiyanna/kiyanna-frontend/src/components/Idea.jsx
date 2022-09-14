import React from "react";
import { Component } from "react";
import { render } from "@testing-library/react";
import { FaThumbsUp, FaComment } from "react-icons/fa";
import img1 from "../assets/person.jpg";
import "./Idea.css";
import { Modal } from "react-bootstrap";
import "../App.css";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";

import { connect } from "react-redux";
import { addItem } from "../store/mpRedux";
import { addLike } from "../store/ideaListRedux";

import Cookies from "universal-cookie";
const cookies = new Cookies();
const apiUrl = "https://kiyanna.world/api/v1/";

class Idea extends Component {
  state = {
    likeStates: [],
    token: "",
    redirect: false,
    popModal: false,
  };

  componentWillMount() {
    if (this.props.isSigned) {
      const token = cookies.get("token");
      this.setState({ token: token });
    }
  }

  //----------- redirect to MP ------------------

  passingId = (id) => {
    cookies.set("mp-id", id, {
      path: "/",
      domain: "kiyanna.world",
      secure: true,
    });
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

  //-------------- Send Like ----------------------

  sendLikeReq = (idea, action) => {
    const requestOptions = {
      method: "PUT",
      headers: { Authorization: "Bearer " + this.state.token },
    };

    fetch(apiUrl + "ideas/" + idea.id + "/" + action, requestOptions)
      .then((response) => response.json())
      .then((json) => {
        //console.log(json);
        if (json.success) {
          //alert("Success");
        } else {
          this.passingLike(idea);
          alert("Error");
        }
      });
  };

  likeIdea = (idea) => {
    if (this.props.isSigned) {
      const likeState = idea.isLiked;
      this.passingLike(idea);
      if (likeState) {
        this.sendLikeReq(idea, "unlike");
      } else {
        this.sendLikeReq(idea, "like");
      }
    } else {
      //alert("Please Signin before like");
      this.setState({
        popModal: true,
      });
    }
  };
  passingLike = (item) => {
    this.props.addLike(item);
    //console.log(item)
  };

  // ---------- Image ----------

  returnImage = (anonymous, img) => {
    if (anonymous) {
      return img1;
    } else {
      if (img === "no-photo.jpg") {
        return img1;
      } else {
        return img;
      }
    }
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
                    Please sign in to Like a Idea!
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

        <div className="Home-Comment-section" style={{ overflowX: "hidden" }}>
          {this.renderRedirectToMP()}
          {this.props.ideaList.map((idea) => (
            <div className="Comment-card" key={idea.id}>
              <div class="d-flex">
                <div class="p-0">
                  <img
                    src={this.returnImage(
                      idea.user.anonymous,
                      idea.user.profilePic_URL
                    )}
                    class=""
                    style={{
                      marginLeft: "0px",
                      width: "30px",
                      height: "30px",
                      borderRadius: "15px",
                      backgroundColor: "#A9A9A9",
                      padding: "3px",
                    }}
                    alt="Me"
                  />
                </div>
                <div class="d-flex flex-wrap" style={{ marginTop: "1px" }}>
                  <div class="p-0">
                    <div className="row no-gutters">
                      <Link
                        style={{ textDecoration: "none", marginLeft: "7px" }}
                      >
                        {idea.user.anonymous ? "Anonymous" : idea.user.name}
                      </Link>
                      <h6
                        style={{
                          fontSize: "12px",
                          marginTop: "6px",
                          marginLeft: "5px",
                        }}
                      >
                        @
                      </h6>
                    </div>
                  </div>
                  <div class="p-0">
                    {idea.mp_profile.name === "Everybody" ? (
                      <Link
                        //to="/home/mp-profile"
                        style={{
                          textDecoration: "none",
                          marginLeft: "7px",
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        {idea.mp_profile.name}
                      </Link>
                    ) : (
                      <Link
                        //to="/home/mp-profile"
                        onClick={() => this.passingId(idea.mp_profile._id)}
                        style={{
                          textDecoration: "none",
                          marginLeft: "7px",
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        {idea.mp_profile.name}
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              <p className="card-text text-left mt-2">{idea.idea}</p>

              <div class="row">
                <div class="row" style={{ marginLeft: "25px" }}>
                  {/* <button
                          className="btn btn-primary btn-sm mr-2"
                          onClick={()=>this.likeIdea(idea)}
                        >
                          {idea.isLiked ? `Liked` : `Like`}
                        </button> */}

                  <label>
                    {/* <input type='radio' name="like" onClick={() => this.likeIdea(idea)} /> */}
                    <FaThumbsUp
                      className="Like-button"
                      size={20}
                      color={idea.isLiked ? "#ffc107" : "#8c9393"}
                      onClick={() => this.likeIdea(idea)}
                    />
                  </label>

                  <p
                    className="card-text align-center"
                    style={{
                      marginRight: "15px",
                      marginLeft: "8px",
                      marginTop: "3px",
                    }}
                  >
                    {idea.likes}
                  </p>
                </div>

                <label>
                  {idea.mp_profile.name === "Everybody" ? (
                    <div></div>
                  ) : (
                    <FaComment
                      style={{
                        marginTop: "4px",
                        marginLeft: "15px",
                        fontSize: "20px",
                        color: "#2e3030",
                      }}
                      onClick={() => this.passingId(idea.mp_profile._id)}
                      className="Like-button"
                    />
                  )}
                </label>

                {/* <Link
                        to="/home/mp-profile"
                        onClick={() => this.passingId(idea.mp_profile._id)}
                        className="btn btn-dark btn-sm"
                        style={{ marginLeft: '15px' }}
                      >
                        Kiyanna
                      </Link> */}

                <div className="ml-auto">
                  <h6
                    style={{
                      fontSize: "12px",
                      padding: "0px",
                      marginTop: "11px",
                      marginRight: "25px",
                    }}
                  >
                    {idea.createdAt.slice(0, 10)} at{" "}
                    {idea.createdAt.slice(-12, -5)}
                  </h6>
                  {/* <h6  style={{fontSize:"10px",padding:"0px"}}>{idea.createdAt.slice(-12,-5)}</h6> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ideaList: state.ideaListRedux.ideaList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (id) => dispatch(addItem(id)),
    addLike: (item) => dispatch(addLike(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Idea);
