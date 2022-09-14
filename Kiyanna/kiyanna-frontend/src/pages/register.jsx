import React from 'react';
import '../assets/css/Register.css';
import '../App.css';

import { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import Cookies from 'universal-cookie';
import firebase from '../services/firebase';
const cookies = new Cookies();
const apiUrl =  'http://localhost:4000/api/v1/';         //'https://kiyanna.world/api/v1/';

class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      mobile:"",
      email:"",
      password:"",
      confirmPassword:"",
      isSending: false, //to rerender submit button during submission
    };
  }

  setRedirect = () => {
    this.setState({redirect: true})
  }  
  
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/home/wall'/>
    }
  }

  componentDidMount(){

  }

  changeUsername = (event) => {
    this.setState({ username: event.target.value });
    console.log(event.target.value);
  };

  changeMobile = (event) => {
    
    this.setState({ mobile: event.target.value });
  };

  changeEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  changePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  changeConfirmPas = (event) => {
    this.setState({ confirmPassword: event.target.value });
  };

  submitForm = (event) => {
    if (this.state.username && this.state.password && this.state.confirmPassword && event.key === "Enter" && !event.shiftKey) {
      this.submitForVerify();
    }
  };

  signUp = () => {
    this.setState({isSending:true});
    const mobileNum = (this.state.mobile+"*").slice(-10,-1);
    
    //console.log(this.state.username,this.state.email,this.state.password,this.state.confirmPassword);
    const body = {
              "name" : this.state.username,
              "avatar_name":"ex-avatar",
              "mobile" : "+94"+mobileNum,
              "email" : this.state.email,
              "password": this.state.password,
              "role": "user"   
          }

    const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        };
    fetch(apiUrl+'auth/register', requestOptions)
            .then(response => response.json())
            .then(json => {
              this.setState({isSending:false});
              //console.log(json);
                if (json.success){
                  // alert("Success");
                  cookies.set('isSigned', true, { path: '/' ,domain : 'kiyanna.world', secure:true});
                  cookies.set('token', json.token, { path: '/' ,domain : 'kiyanna.world', secure:true});
                  cookies.set('anonymous', true, { path: '/' ,domain : 'kiyanna.world', secure:true});
                  cookies.set('profilePic_URL', json.profile.profilePic_URL, { path: '/' ,domain : 'kiyanna.world', secure:true});
                  cookies.set('username', json.profile.name, { path: '/',domain : 'kiyanna.world', secure:true });
                  cookies.set('id', json.profile.id, { path: '/' ,domain : 'kiyanna.world', secure:true});
                  this.setRedirect();

                }else{
                  alert(json.error);
                  window.location.reload(true);
                }
            });

      
    

  };

  // ------------- Firebase ----------------------------

  submitForVerify = () => {
    if (this.state.username && (this.state.mobile.length===12 || this.state.mobile.length===10) && this.state.password && this.state.confirmPassword){
      if (this.state.password === this.state.confirmPassword){
          this.sendVerification();
      }else{
        alert("Password Not Matched");
      }
    }else{
      alert("Please Fill all the Fields Correctly");
    }
  }

  sendVerification = () => {
    this.setState({isSending:true});
    const mobileNum = "+94"+(this.state.mobile+"*").slice(-10,-1);
    let recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');
    firebase.auth().signInWithPhoneNumber(mobileNum,recaptcha).then((e) => {
      let code = prompt('Enter the OTP','');
      if (code==null) return;
      e.confirm(code).then((result) => {
        //console.log(result,'user');
        if (result.user.phoneNumber===mobileNum){
          //console.log("Im In")
          this.signUp();
        }else{
          //console.log("error");
          alert("Problem in Verification");
          window.location.reload(true);
        }
        //document.querySelector('label').textContent = result.user.phoneNumber + "Number verified";
        

      }).catch((error)=>{
        
        //console.log("error",error);
        alert("Problem in Verification");
        window.location.reload(true);
        //this.setState({isSending:false});
      })
    })
  
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3">

          </div>

          <div className="col-lg-6">
            <div className="card card-signin" style={{width:"100%"}}>
              <div className="card-body">
                
                <h5 className="card-title text-center">Register</h5>
                {/* <form className="form-signin"> */}

                  <div className="mb-2">
                    <label for="inputUserame" className="mb-3">Name</label>
                    <input
                      type="text"
                      id="inputUserame"
                      className="form-control"
                      placeholder="Username"
                      required
                      autofocus
                      value={this.state.username}
                      onChange={this.changeUsername}
                      
                    />
                    
                  </div>

                  <div className="mb-2">
                    <label for="inputEmail">Mobile Number</label>
                    <input
                      type="text"
                      
                      className="form-control"
                      placeholder="Phone"
                      required
                      value={this.state.mobile}
                      onChange={this.changeMobile}
                      
                    />
                    
                  </div>

                  <div className="mb-2">
                    <label for="inputEmail">Email address (optional)</label>
                    <input
                      type="email"
                      id="inputEmail"
                      className="form-control"
                      placeholder="Email address"
                      required
                      value={this.state.email}
                      onChange={this.changeEmail}
                      
                    />
                    
                  </div>

                  <div className="mb-2">
                    <label for="inputPassword">Password</label>
                    <input
                      type="password"
                      id="inputPassword"
                      className="form-control"
                      placeholder="Password"
                      required
                      value={this.state.password}
                      onChange={this.changePassword}
                      
                    />
                    {/* <label for="inputPassword">Password</label> */}
                  </div>

                  <div className="mb-2">
                    <label for="inputConfirmPassword">Confirm password</label>
                    <input
                      type="password"
                      id="inputConfirmPassword"
                      className="form-control"
                      placeholder="Confirm Password"
                      required
                      value={this.state.confirmPassword}
                      onChange={this.changeConfirmPas}
                      onKeyPress={this.submitForm}
                    />
                    
                  </div>

                  
                  <div id="recaptcha" style={{marginLeft:"20%"}}></div>
                  

                  {this.renderRedirect()}
                  <button
                    className="btn btn-lg btn-primary btn-block text-uppercase mt-2"
                    type="submit"
                    disabled={this.state.isSending}
                    onClick={()=>this.submitForVerify()}
                    style={{ fontSize:"14px"}}
                  >
                    {this.state.isSending ? `Submitting...` : `Sign Up`}
                  </button>
                  <Link 
                    className="d-block text-center mt-2 small" to="/login">
                    Sign In
                  </Link>
                  {/* <hr className="my-4" />
                  <button
                    className="btn btn-lg btn-block text-uppercase"
                    style={{ backgroundColor: '#ea4335', color: 'white' }}
                    type="submit"
                  >
                    <i className="fab fa-google mr-2"></i> Sign up with Google
                  </button>
                  <button
                    className="btn btn-lg btn-block text-uppercase"
                    style={{ backgroundColor: '#3b5998', color: 'white' }}
                    type="submit"
                  >
                    <i className="fab fa-facebook-f mr-2"></i> Sign up with
                    Facebook
                  </button> */}
                {/* </form> */}
              </div>
            </div>
          </div>

          <div className="col-lg-3">

          </div>
        </div>
      </div>
    );
  }
}

export default Register;
