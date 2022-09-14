//Need to code API requests to change follow/unfollow status

import React, { Component } from "react";
import RatingIndicatorNoText from "./RatingIndicatorNoText";
import CommentIndicator from "./CommentIndicator";
import InputRating from "./InputRating";
import axios from "axios";
import ReactStars from "react-rating-stars-component";
import { FaComment } from "react-icons/fa";
// import Rating from '@material-ui/lab/Rating';
import Cookies from "universal-cookie";
import { Modal } from "react-bootstrap";
import "./SignInPopUp.css";

const cookies = new Cookies();
const apiUrl = "https://kiyanna.world/api/v1/";

export class CardsampleTwo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFollowing: this.props.isFollow,
      isRate: this.props.isRated || false,
      myRate: this.props.myRate,
      rateCount: this.props.rateCount,
      dataCame: false,
      popModalRate: false, //Used to display "Sign in before rating"
      popModalFollow: false, //Used to display "Sign in before following"
    };
  }

  componentWillMount() {
    if (this.props.isSigned) {
      const token = cookies.get("token");
      this.setState({ token: token });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isFollowing: nextProps.isFollow,
      isRate: nextProps.isRated,
      myRate: nextProps.myRate,
      rateCount: nextProps.rateCount,
      dataCame: true,
    });
  }

  //------------------------- Send Follow --------------------------------

  sendFollowReq = (id, action) => {
    const requestOptions = {
      method: "PUT",
      headers: { Authorization: "Bearer " + this.state.token },
    };

    fetch(apiUrl + "mp-profiles/" + id + "/" + action, requestOptions)
      .then((response) => response.json())
      .then((json) => {
        //console.log(json);
        if (json.success) {
          //alert("Success");
          console.log("Followed");
        } else {
          this.setState({ isFollowing: !this.state.isFollowing });
          alert("Error");
        }
      });
  };

  followMpProf = (id) => {
    if (this.props.isSigned) {
      this.setState({ isFollowing: !this.state.isFollowing });
      if (this.state.isFollowing) {
        this.sendFollowReq(id, "unfollow");
      } else {
        this.sendFollowReq(id, "follow");
      }
    } else {
      // alert("Please Signin before Follow MPS");
      this.setState({
        popModalFollow: true,
      });
    }
  };

  //Call the API to change user's isfollow status
  //what lifecycle method to use?
  //componentDidUpdate? componentWillUnmount?

  //---------------- Rating ----------------

  ratingChanged = (newRating) => {
    //console.log(newRating);
    this.updateRate(newRating);
  };

  updateRate(newRating) {
    if (this.props.isSigned) {
      if (this.state.isRate) {
        alert("Already rated");
      } else {
        this.sendUpdateRateReq(this.props.id, newRating);
      }
    } else {
      // alert("Please Signin before Rate");
      this.setState({
        popModalRate: true,
      });
    }
  }

  sendUpdateRateReq = (id, newRating) => {
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + this.state.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rating: newRating,
      }),
    };

    fetch(apiUrl + "mp-profiles/" + id + "/ratings-mp", requestOptions)
      .then((response) => response.json())
      .then((json) => {
        //console.log(json);
        if (json.success) {
          this.setState({ isRate: true, myRate: newRating });
          alert("Rated");
        } else {
          alert("Error");
        }
      });
  };

  renderRateBar() {
    if (true) {
      return (
        <ReactStars
          count={5}
          value={this.state.myRate}
          onChange={this.ratingChanged}
          size={24}
          activeColor="#ffd700"
        />
      );
    }
  }

  renderRateIndicator() {
    if (true) {
      return (
        <ReactStars
          count={5}
          value={this.props.ratings}
          edit={false}
          size={18}
          activeColor="#ffd700"
        />
      );
    }
  }

  //------------------------ To close the Popups ----------------------------\\
  ClosePopUpFollow = () => {
    this.setState({
      popModalFollow: false,
    });
  };

  ClosePopUpRate = () => {
    this.setState({
      popModalRate: false,
    });
  };

  render() {
    const {
      mpfName,
      mplName,
      ratings,
      nComments,
      description,
      mpPic,
      isFollow,
      rateCount,
    } = this.props;

    return (
      <div className="card m-1" style={{ fontSize: "0.75rem" }}>
        {/* Display this if the user tries to follow the MP without signing in */}
        <div className="container-fluid">
          <div className="row">
            <Modal show={this.state.popModalFollow} size="sm" className="My-modal"  style={{alignItems: 'center',justifyContent: 'center'}}>
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
                        <button className="btn btn-primary btn-sm">Sign In</button>
                      </a>
                    </div>
                  </div>
                  <div className="col-6 d-flex justify-content-start">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={this.ClosePopUpFollow}
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

        {/* Display this if the user tries to rate the MP without signing in */}
        <div className="container-fluid">
          <div className="row">
            <Modal show={this.state.popModalRate} size="sm" className="My-modal"  style={{alignItems: 'center',justifyContent: 'center'}}>
              <div className="container-fluid" style={{ padding: "7px" }}>
                <div className="row m-1">
                  <div className="col text-center">
                    Please sign in to Rate a MP!
                  </div>
                </div>
                <div className="row m-1">
                  <div className="col-6 d-flex justify-content-end">
                    <div>
                      <a href="https://kiyanna.world/login">
                        <button className="btn btn-primary btn-sm">Sign In</button>
                      </a>
                    </div>
                  </div>
                  <div className="col-6 d-flex justify-content-start">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={this.ClosePopUpRate}
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

        <img
          className="img-fluid rounded-circle w-75 mx-auto mt-3"
          src={mpPic}
          alt="Card image cap"
        />
        <div className="card-body">
          <h5 className="card-title">{`${mpfName} ${mplName}`}</h5>
          <p className="card-text" style={{height:130}}>{description}</p>
        </div>
        
        <div className="row mx-auto">
          {/* <ReactStars
              count={5}
              value={ratings}
              edit={false}
              size={18}
              activeColor="#ffd700"
            /> */}
          {this.renderRateIndicator()}

          <h6 style={{ size: "13px", marginTop: "5px", marginLeft: "10px" }}>
            {this.state.rateCount} Rates
          </h6>

          {/* <RatingIndicatorNoText rating={ratings} /> */}
          {/* <h6 style={{size:"13px",marginTop:"5px", marginLeft:"10px"}}>{this.state.rateCount} Rates</h6> */}
        </div>

        <div className="row mx-auto">
          <FaComment style={{ marginTop: "10px", size: "22px" }} />
          <h6 style={{ size: "13px", marginTop: "5px", marginLeft: "10px" }}>
            {nComments} Ideas
          </h6>
          {/* <CommentIndicator nComments={nComments} /> */}
        </div>

        <div className="row mx-auto">
          {this.renderRateBar()}

          {/* <ReactStars
              count={5}
              value={this.state.myRate}
              onChange={(rate)=>this.ratingChanged(rate)}
              size={24}
              activeColor="#ffd700"
            /> */}

          <h6 style={{ size: "13px", marginTop: "10px", marginLeft: "10px" }}>
            Your Rate
          </h6>
        </div>

        {/* <InputRating
          mpfName={mpfName}
          mplName={mplName}
          style={{ margin: "5px" }}
        /> */}
        <div
          className="row mx-auto"
          style={{ marginTop: "5px", marginBottom: "5px" }}
        >
          <div className="col d-flex justify-content-center">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => this.followMpProf(this.props.id)}
            >
              {this.state.isFollowing ? `Unfollow` : `Follow`}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CardsampleTwo;
