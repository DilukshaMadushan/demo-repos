import React from "react";
import { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import { GoogleLogin } from "react-google-login";
// import FacebookLogin from 'react-facebook-login';
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

const cookies = new Cookies();
const apiUrl = "https://kiyanna.world/api/v1/";
const cookieObject = { path: "/", domain: "kiyanna.world", secure: true }; //{ path: '/',domain : 'kiyanna.world', secure:true };

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mobile: "",
      password: "",
      isSending: false, //to rerender submit button during submission
      redirect: false,
    };
  }

  componentDidMount() {
    //console.log(cookies.get('myCat')); // Pacman
  }

  setRedirect = () => {
    this.setState({ redirect: true });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/home/wall" />;
    }
  };

  changeMobile = (event) => {
    console.log((event.target.value + "*").slice(-10, -1));
    this.setState({ mobile: event.target.value });
  };

  changePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  submitForm = (event) => {
    if (this.state.password && event.key === "Enter" && !event.shiftKey) {
      this.signUp();
    } else {
    }
  };

  signUp = () => {
    this.setState({ isSending: true });
    const mobileNum = (this.state.mobile + "*").slice(-10, -1);
    if (mobileNum.length == 9 && this.state.password) {
      //console.log(this.state.email,this.state.password);
      const body = {
        mobile: "+94" + mobileNum,
        password: this.state.password,
      };

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      };
      fetch(apiUrl + "auth/login", requestOptions)
        .then((response) => response.json())
        .then((json) => {
          this.setState({ isSending: false });
          //console.log(json);
          if (json.success) {
            // alert("Success");
            //console.log(json);
            cookies.set("isSigned", true, cookieObject);
            cookies.set("token", json.token, cookieObject);
            cookies.set("anonymous", true, cookieObject);
            cookies.set(
              "profilePic_URL",
              json.profile.profilePic_URL,
              cookieObject
            );
            cookies.set("username", json.profile.name, cookieObject);
            cookies.set("id", json.profile.id, cookieObject);
            this.setRedirect();
          } else {
            alert(json.error);
            window.location.reload(true);
          }
        });
    } else {
      alert("Something Missing! Check Your Inputs");
    }
  };

  // ---------- Sign in with google ---------------------

  responseGoogle = (response) => {
    const profile = response.profileObj;
    // console.log(response.profileObj);
    // console.log("google in");
    this.signGoogle(
      profile.name,
      profile.email,
      profile.googleId,
      profile.imageUrl
    );
  };

  responseGoogleError = (response) => {
    //alert("Error with Google");
  };

  signGoogle = (name, email, id, image) => {
    //console.log("google in in");
    this.setState({ isSending: true });
    const body = {
      name: name,
      googleID: id,
      email: email,
      profilePic_URL: image,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    fetch(apiUrl + "auth/register/google", requestOptions)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ isSending: false });
        //console.log(json);
        if (json.success) {
          // alert("Success");
          //console.log("Success puthe",json);
          cookies.set("isSigned", true, cookieObject);
          cookies.set("token", json.token, cookieObject);
          cookies.set("anonymous", true, cookieObject);
          cookies.set(
            "profilePic_URL",
            json.profile.profilePic_URL,
            cookieObject
          );
          cookies.set("username", json.profile.name, cookieObject);
          cookies.set("id", json.profile.id, cookieObject);
          this.setRedirect();
        } else {
          alert("Error in google Login");
          window.location.reload(true);
        }
      });
  };

  // -------------------- Sign in with FaceBook ---------------------

  responseFacebook = (res) => {
    //console.log(res);
    try {
      this.signFacebook(res.name, res.userID, res.email, res.picture.data.url);
    } catch {
      alert("Error in login");
      window.location.reload(true);
    }
  };

  signFacebook(name, id, email, image) {
    this.setState({ isSending: true });
    const body = {
      name: name,
      facebookID: id,
      email: email,
      profilePic_URL: image,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    fetch(apiUrl + "auth/register/facebook", requestOptions)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ isSending: false });
        //console.log(json);
        if (json.success) {
          // alert("Success");
          //console.log(json);
          cookies.set("isSigned", true, {
            path: "/",
            domain: "kiyanna.world",
            secure: true,
          });
          cookies.set("token", json.token, {
            path: "/",
            domain: "kiyanna.world",
            secure: true,
          });
          cookies.set("anonymous", true, {
            path: "/",
            domain: "kiyanna.world",
            secure: true,
          });
          cookies.set("profilePic_URL", json.profile.profilePic_URL, {
            path: "/",
            domain: "kiyanna.world",
            secure: true,
          });
          cookies.set("username", json.profile.name, {
            path: "/",
            domain: "kiyanna.world",
            secure: true,
          });
          cookies.set("id", json.profile.id, {
            path: "/",
            domain: "kiyanna.world",
            secure: true,
          });
          this.setRedirect();
        } else {
          alert("Error with Facebook");
        }
      });
  }

  render() {
    return (
      <div className="login">
        <div class="container-fluid">
          <div class="row">
            <div className="col-md-4"></div>

            <div class="col-md-4 mx-auto">
              <div class="card card-signin my-5" style={{ width: "100%" }}>
                <div class="card-body">
                  <h5 class="card-title text-center">Sign In</h5>
                  {/* <form class="form-signin"> */}
                  <div class="">
                    <label for="inputEmail">Mobile Number</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Phone"
                      required
                      value={this.state.mobile}
                      onChange={this.changeMobile}
                    />
                  </div>

                  <div class="">
                    <label for="inputPassword">Password</label>
                    <input
                      type="password"
                      id="inputPassword"
                      class="form-control"
                      placeholder="Password"
                      required
                      value={this.state.password}
                      onChange={this.changePassword}
                      onKeyPress={this.submitForm}
                    />
                  </div>

                  <div class="custom-control custom-checkbox mb-3">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="customCheck1"
                    />
                    <label class="custom-control-label" for="customCheck1">
                      Remember password
                    </label>
                  </div>

                  {this.renderRedirect()}

                  <button
                    className="btn btn-lg btn-primary btn-block text-uppercase"
                    type="submit"
                    disabled={this.state.isSending}
                    onClick={() => this.signUp()}
                    style={{ fontSize: "14px" }}
                  >
                    {this.state.isSending ? `Submitting...` : `Login`}
                  </button>

                  <div className="mt-2">
                    <Link to="/register">
                      <button
                        className="btn btn-lg btn-primary btn-block text-uppercase"
                        type="submit"
                        style={{ fontSize: "14px" }}
                      >
                        Create an Account
                      </button>
                    </Link>
                  </div>

                  <hr class="my-4" />
                  <GoogleLogin
                    clientId="731798999430-fmmet5nbmsfptu4rgb8spmonff9js4i7.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogleError}
                    cookiePolicy={"single_host_origin"}
                    autoLoad={false}
                    render={(renderProps) => (
                      <button
                        onClick={renderProps.onClick}
                        className="btn btn-lg btn-google btn-block text-uppercase"
                        disabled={renderProps.disabled}
                        style={{
                          backgroundColor: "#ea4335",
                          color: "white",
                          fontSize: "14px",
                        }}
                      >
                        Sign in with Google
                      </button>
                    )}
                  />
                  {/* <button
                      class="btn btn-lg btn-google btn-block text-uppercase"
                      style={{ backgroundColor: '#ea4335', color: 'white' }}
                      type="submit"
                    >
                      <i class="fab fa-google mr-2"></i> Sign in with Google
                    </button> */}

                  <div className="mt-2">
                    <FacebookLogin
                      appId="307309177135406"
                      autoLoad={false}
                      isMobile={false}
                      fields="name,email,picture"
                      callback={this.responseFacebook}
                      render={(renderProps) => (
                        <button
                          class="btn btn-lg btn-facebook btn-block text-uppercase"
                          style={{
                            backgroundColor: "#3b5998",
                            color: "white",
                            marginTop: "10px",
                            fontSize: "14px",
                          }}
                          type="submit"
                          onClick={renderProps.onClick}
                        >
                          Sign in with Facebook
                        </button>
                      )}
                    />
                  </div>

                  {/* <button
                      class="btn btn-lg btn-facebook btn-block text-uppercase"
                      style={{ backgroundColor: '#3b5998', color: 'white' }}
                      type="submit"
                    >
                      <i class="fab fa-facebook-f mr-2"></i> Sign in with
                      Facebook
                    </button> */}
                  {/* </form> */}
                </div>
              </div>
            </div>

            <div className="col-md-4"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
