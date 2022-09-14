import React, {Component} from 'react';
import {BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import img1 from '../assets/person.jpg';
import logo from '../assets/new_logo.png';
import Sidebar from "react-sidebar";
import SideNavBar from './SideNav';
import Autosuggest from 'react-autosuggest';
//import './theme.css';
import { FaBell } from 'react-icons/fa';
import { Dropdown } from 'react-bootstrap';
import Cookies from 'universal-cookie';

import { connect } from 'react-redux';
import { changeIsAnonymous, addUserName } from '../store/userDetailsRedux';
import CookieConsent from "react-cookie-consent";

const cookies = new Cookies();
const apiUrl = 'https://kiyanna.world/api/v1/';
const cookieObject = { path: '/',domain : 'kiyanna.world', secure:true };        //{ path: '/',domain : 'kiyanna.world', secure:true };

const imgconf = {
  //maxWidth: '50%',  //img is resizable but max-width is preserved
  width:"40px",
  height: '40px',
  borderRadius: '100%', //img border is circle
  display: 'block',
  border:'1px solid gray'
  //marginLeft: '15px',   //center alignment
  // marginRight: 'auto',
  //marginTop: '10px',
  //marginBotton: '5px'
}

class NavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      display:false,
      suggestions:[],
      searchWord:"",
      sidebarOpen: false,
      isSigned:false,

      redirect:false,
      redirectProfile:false,
      redirectSearch:false,

      token:"",
      id:"",

      profilePic:img1,
      username:"",
      anonymous:true,

    };

    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  componentWillMount(){
    const isSign = cookies.get('isSigned');
    const profilePic = cookies.get('profilePic_URL');
    const isAnonymous = cookies.get('anonymous');
    const username = cookies.get('username');
    const id = cookies.get('id');
    
    console.log("",isSign);
    if (isSign==='true'){
      const token = cookies.get('token');
      this.setState({isSigned:true});
      this.setState({profilePic:profilePic});
      this.setState({username:username});
      this.props.addUserName(username);
      this.setState({token:token});
      this.setState({id:id});
      //console.log("Dilussa",profilePic);

      if (isAnonymous=='true'){
        //console.log("ano");
        this.setState({anonymous:true});
        this.props.changeIsAnonymous(true);
      }else{
        //console.log("ano newiiii");
        this.setState({anonymous:false});
        this.props.changeIsAnonymous(false);
      }
      
      
    }else{
      this.setState({isSigned:false});
      this.setState({anonymous:true});
      this.props.changeIsAnonymous(true);
    }
    
  }

  componentDidMount(){

  }

  setRedirect = () => {
    if (this.state.isSigned==true){
      cookies.set('isSigned',false, cookieObject);
      cookies.set('token',"", cookieObject);
      this.setState({isSigned: false});
      window.location.reload(true);
    }else{
      this.setState({redirect: true});
      
    }
    
  }
  
  renderRedirect = () => {
    if (this.state.redirect) {
      this.setState({redirect:false});
      return <Redirect to='/login'/>
    }

    if (this.state.redirectProfile){
      this.setState({redirectProfile:false});
      return <Redirect to='/home/user-profile'/>
    }

    if (this.state.redirectSearch){
      this.setState({redirectSearch:false});
      return <Redirect to='/home/loading'/>
    }
  }
 
  onSetSidebarOpen() {
    this.setState({ sidebarOpen: !this.state.sidebarOpen });
    
  }

  //--------------------- Set Anonymous ----------------------

  changeAnonymous(){
      
      let body = {
        anonymous : ""
      }

      console.log(this.state.anonymous);
      if (!this.state.anonymous){
          body.anonymous = "true";
      }else{
          body.anonymous = "false";
      }

      const ano_var = !this.state.anonymous;
      this.setState({anonymous:ano_var});
      this.props.changeIsAnonymous(ano_var);
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization':'Bearer '+this.state.token },
        body:  JSON.stringify(body)
      };
      fetch(apiUrl+'user-profiles/'+this.state.id, requestOptions)
          .then(response => response.json())
          .then(json => {
            this.setState({isSending:false});
            //console.log(json);
              if (json.success){
                //console.log(json);
                cookies.set('anonymous',this.state.anonymous, cookieObject);
                window.location.reload(true);
                // alert("Changed");
              }else{
                alert("Error");
                this.props.changeIsAnonymous(!this.state.anonymous);
                this.setState({anonymous:!this.state.anonymous});
                
              }
          });
  }

  renderAnonymousChanger(){
    if (this.state.isSigned){
      return(
        <Dropdown.Item onClick={()=>this.changeAnonymous()}>Change to {(this.state.anonymous)?this.state.username:'Anonymous'}</Dropdown.Item>
      )
    }
  }

  //---------------- Search Box ------------------

  changeSearchWord = (event) => {
    this.setState({ searchWord: event.target.value });
    console.log(event.target.value);
  };

  searchMp = (event) => {
    console.log("Fuck")
    if (this.state.searchWord && event.key === "Enter" && !event.shiftKey) {
      cookies.set('searchWord',this.state.searchWord, cookieObject);
      this.setState({redirectSearch:true});
    }
  };

  searchMpClick = (name) =>{
    if (name) {
      cookies.set('searchWord',name, cookieObject);
      this.setState({redirectSearch:true});
    }
  }

  searchSelected=(event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method })=>{
    
    this.searchMpClick(suggestionValue);
  }

  renderProfile = () => {
    if (this.state.isSigned){
      return(
        <Dropdown.Item onClick={()=>this.setState({redirectProfile:true})}>Profile</Dropdown.Item>
      );
    }
  }

  // ------------------- Suggestion in Search ---------------------

  onChange = (event, { newValue }) => {
    this.setState({
      searchWord: newValue
    });
    //console.log(newValue);
  };
 
  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.getSuggestionMps(value);
  };
 
  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  getSuggestionMps = (value) => {
    fetch(apiUrl+'mp-profiles/mp/search?name='+this.state.searchWord)
              .then(response => response.json())
              .then(json => {
                  
                  if (json.success===true){
                      this.setState({suggestions:json.data});
                  }
                  
              });
  }
   
   
  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue = (suggestion) => suggestion.name;
   
  // Use your imagination to render suggestions.
  renderSuggestion = (suggestion) => (
    <div>
      {suggestion.name}
    </div>
  );
  

  render(){
  return (
    <div>
      <Sidebar
        className="d-md-none"
        sidebar={<div className="mt-5"><SideNavBar closeDrawer={this.onSetSidebarOpen}/></div>}
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        styles={{ sidebar: { background: "white", width:"75%", backgroundColor:"#eee", position: "fixed" } }}
      >

      <CookieConsent
        location="bottom"
        buttonText="Accept"
        cookieName="kiyanna.world"
        style={{ background: "#2B373B" }}
        buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
        expires={150}
      >
        This website uses cookies to enhance the user experience.{" "}
        {/* <span style={{ fontSize: "10px" }}>This bit of text is smaller :O</span> */}
      </CookieConsent>

      <div className="navBar">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div className="container-fluid">
            {/* <a className="navbar-brand" href="#">
              KIYANNA
            </a> */}
              {this.renderRedirect()}
              <div className="d-md-none">
                  <Link to="/home/wall"><img src={logo} alt="Logo" style={{height:"45px",marginRight:"0px"}} /></Link>
              </div>

              <div className="d-none d-md-block" style={{marginRight:"12%"}}>
                  <Link to="/home/wall"><img src={logo} alt="Logo" style={{height:"45px",marginRight:"0px"}} /></Link>
              </div>

              
            
              <div style={{width:"40%"}}>
                    
                    <Autosuggest
                          
                          suggestions={this.state.suggestions}
                          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                          getSuggestionValue={this.getSuggestionValue}
                          renderSuggestion={this.renderSuggestion}
                          //theme={theme}
                          onSuggestionSelected={this.searchSelected}
                          renderInputComponent = {(inputProps) => (
                            <div className="input-group">
                              <input {...inputProps} />
                              <span className="input-group-append">
                                <button className="btn btn-secondary" type="button" onClick={()=>this.searchMpClick(this.state.searchWord)}>
                                  <FaSearch/>
                                </button>
                              </span>
                            </div>
                          )}
                          inputProps={{
                            className:"form-control",
                            placeholder: 'Search MPs ...',
                            value:this.state.searchWord,
                            onChange: this.onChange,
                            onKeyPress:(e)=>this.searchMp(e)
                            
                          }}
                    />
                    
                    
              </div>

              
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarResponsive"
                aria-controls="navbarResponsive"
                aria-expanded="false"
                aria-label="Toggle navigation"
                onClick={() => this.onSetSidebarOpen()}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              
            
            
            
            <div className="collapse navbar-collapse" id="navbarResponsive">

              <ul className="navbar-nav" style={{marginLeft:"7%"}}>
                <li className="nav-item active">
                  <Link className="nav-link" to="/home/wall">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/home/allmps">
                    ALL MPS
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <a className="nav-link" href="#">
                    Blog
                  </a>
                </li> */}
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    About Us
                  </a>
                </li>
                
              </ul>

              

            </div>

            

          </div>

          <ul className="navbar-nav ml-auto d-none d-md-block">
            
            <li className="nav-item mt-1">
              {/* <Link><FaBell style={{color:"white"}}/></Link> */}
            </li>
            
            <li className="nav-item avatar">
              {/* <Link></Link> */}

              <Dropdown>
                <Dropdown.Toggle className="rounded-circle" style={{backgroundColor:"#A9A9A9",width:"42px",height:"42px",padding:"0px"}}>
                  <img src={(this.state.anonymous)?img1:this.state.profilePic} alt="Me" style={imgconf} />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {this.renderProfile()}
                  {this.renderAnonymousChanger()}
                  {(this.state.isSigned)?<Dropdown.Item onClick={()=>this.setRedirect()}>Logout</Dropdown.Item>:
                  <Dropdown.Item href="/login">Login</Dropdown.Item>}
                  
                </Dropdown.Menu>
              </Dropdown>
            </li> 
          </ul>
          
        </nav>
        
      </div>

      </Sidebar>
    </div>
  );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    changeIsAnonymous: (isAnonymous) => dispatch(changeIsAnonymous(isAnonymous)),
    addUserName : (username) => dispatch(addUserName(username))
  };
};

export default connect(null, mapDispatchToProps)(NavBar);


