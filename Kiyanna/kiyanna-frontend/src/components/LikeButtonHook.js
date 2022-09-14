//Like button in comment cards - (as a functional component)
import React, { useState, Component } from "react";
import { FaThumbsUp } from "react-icons/fa"; //like symbol
import "./Likebutton.css";
import { connect } from "react-redux";
import { addLike } from "../store/ideaListRedux";
import Cookies from "universal-cookie";
import { render } from "@testing-library/react";
import Popup from "reactjs-popup";
import { Modal } from "react-bootstrap";
import "./SignInPopUp.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";
const cookies = new Cookies();
const apiUrl = "https://kiyanna.world/api/v1/";

class LikeButtonHook extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    likeStates: [],
    token: "",
    liked: this.props.idea.isLiked,
    redirect: false,
    popModal: false, //used to pop-up the modal when the user tries to like without signing in
  };

  componentWillMount() {
    if (this.props.isSigned) {
      const token = cookies.get("token");
      this.setState({ token: token });
    }
  }

  // ------------ Redirect Login ----------------

  renderRedirect = () => {
    if (this.state.redirect) {
      this.setState({ redirect: false });
      return <Redirect push to="/login" />;
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
      // alert("Please Signin before like");
      //this.setState({redirect:true});
    }
  };
  passingLike = (item) => {
    this.props.addLike(item);
    //console.log(item);
  };

  //------------------------ To close the Popup ----------------------------\\
  ClosePopUp = () => {
    this.setState({
      popModal: false,
    });
  };

  ShouldPopUp = () => {
    if (this.props.isSigned) {
      this.setState({ liked: !this.state.liked });
    } else {
      this.setState({ popModal: true });
    }
  };

  render() {
    // const [temp, toggleTemp] = useState(false)
    return (
      <div>
        {/* Display thtis Modal if the user tries to like an Idea before signing in */}
        <div className="container-fluid">
          <div className="row">
            <Modal show={this.state.popModal} size="sm" className="My-modal"  style={{alignItems: 'center',justifyContent: 'center'}}>
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
                        <button className="btn btn-primary btn-sm">Sign In</button>
                      </a>
                    </div>
                  </div>
                  <div className="col-6 d-flex justify-content-start">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={()=>this.setState({popModal:false})}
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

        {this.renderRedirect()}
        <label>
          <input
            type="radio"
            name="like"
            onClick={() => this.likeIdea(this.props.idea)}
          />
          <FaThumbsUp
            className="Like-button"
            size={20}
            color={
              this.props.isSigned && this.state.liked ? "#ffc107" : "#e4e5e9"
            }
            onClick={this.ShouldPopUp}
          />
          {/* <SignInPopUp showIt={this.state.popModal} /> */}
        </label>
        {/* <Popup trigger={<button> Trigger</button>} position="right center">
              <div>Popup content here !!</div>
            </Popup> */}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addLike: (item) => dispatch(addLike(item)),
  };
};

export default connect(null, mapDispatchToProps)(LikeButtonHook);
