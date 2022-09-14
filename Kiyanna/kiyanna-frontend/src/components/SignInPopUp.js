//Rate bar (as a class component)
import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import "./SignInPopUp.css";

class SignInPopUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: this.props.showIt, ///
    };
  }

  ClosePopUp = () => {
    this.setState({
      show: false,
    });
  };

  render() {
    return (
      <Modal show={this.state.show} size="sm" className="My-modal">
        <div className="container-fluid" style={{ padding: "7px" }}>
          <div className="row m-1">
            <div className="col text-center">Please sign in to like ideas!</div>
          </div>
          <div className="row m-1">
            <div className="col-6 d-flex justify-content-end">
              <div>
                <a href="https://kiyanna.world/home/user-profile">
                  <button className="btn btn-primary btn-sm">Sign In</button>
                </a>
              </div>
            </div>
            <div className="col-6 d-flex justify-content-start">
              <button
                className="btn btn-primary btn-sm"
                onClick={this.ClosePopUp}
              >
                Later
              </button>
            </div>
            {/* <div className="col">
              <div
                className="btn-group d-flex justify-content-center"
                role="group"
              >
                <a href="https://kiyanna.world/home/user-profile">
                  <button
                    className="btn btn-primary btn-sm"
                    // onClick={() => this.fileInput.click()}
                  >
                    Sign In
                  </button>
                </a>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={this.ClosePopUp}
                >
                  Later
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </Modal>
    );
  }
}

export default SignInPopUp;
