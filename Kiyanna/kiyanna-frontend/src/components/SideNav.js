import React, {Component} from 'react';
import './SideNav.css';
import {Link, Redirect} from 'react-router-dom';
import img1 from '../assets/person.jpg';
import { FaUserAlt,FaUserCheck , FaBook} from 'react-icons/fa';
import logo from '../assets/logo.png';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const apiUrl = 'https://kiyanna.world/api/v1/';

const imgconf = {
    //maxWidth: '50%',  //img is resizable but max-width is preserved
    width:"60px",
    height: '60px',
    borderRadius: '100%', //img border is circle
    display: 'block',
    marginLeft: '15px',   //center alignment
    // marginRight: 'auto',
    marginTop: '10px',
    marginBotton: '5px',
    backgroundColor:"#A9A9A9",padding:"3px"
}

class SideNavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
     
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
      this.setState({token:token});
      this.setState({id:id});

      if (isAnonymous=='true'){
        //console.log("ano");
        this.setState({anonymous:true});
      }else{
        //console.log("ano newiiii");
        this.setState({anonymous:false});
      }
      
      
    }else{
      this.setState({isSigned:false});
      this.setState({anonymous:true});
    }
    
  }

  componentDidMount(){

  }

  setRedirect = () => {
    if (this.state.isSigned==true){
      cookies.set('isSigned',false, { path: '/',domain : 'kiyanna.world', secure:true });
      cookies.set('token',"", { path: '/',domain : 'kiyanna.world', secure:true });
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

      this.setState({anonymous:!this.state.anonymous})
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
                cookies.set('anonymous',this.state.anonymous, { path: '/',domain : 'kiyanna.world', secure:true });
                window.location.reload(true);
                // alert("Changed");
              }else{
                alert("Error");
              }
          });
  }

  renderAnonymousChanger(){
    if (this.state.isSigned){
      return(
        <Link onClick={()=>this.changeAnonymous()}>Change to {(this.state.anonymous)?this.state.username:'Anonymous'}</Link>
      )
    }
  }

  // ----------- Render Profile ------------------



  renderProfileFunction = () => {
      this.props.closeDrawer();
      this.setState({redirectProfile:true});
  }

  renderProfile = () => {
    if (this.state.isSigned){
      return (<Link onClick={()=>this.renderProfileFunction()}>Profile</Link>)
    }
  }

  renderUser = () => {
    if (this.state.isSigned) {
        if (this.state.anonymous)
          return (<div>
              <div class="row">

                  <div className="col-4 text-center">
                      <img src={img1} alt="MP image" style={imgconf} />
                  </div>

                  <div className="col-8" style={{ marginLeft: '0px' }}>
                      <h5 className="font-weight-bold" style={{marginTop:"10px"}}>Logged in As</h5>
                      <p className="font-weight-bold ml-1">Anonymous</p>
                  </div>

              </div>
          </div>);
        else{
          return (<div>
            <div class="row">

              <div className="col-4 text-center">
                  <img src={this.state.profilePic} alt="Me" style={imgconf} />
              </div>

              <div className="col-8" style={{ marginLeft: '0px' }}>
                  <h5 className="font-weight-bold" style={{marginTop:"10px"}}>Logged in As</h5>
                  <p className="font-weight-bold ml-1">{this.state.username}</p>
              </div>

              </div>
        </div>);
        }  
    } else {
      return(<div>
        <div class="row">
            <div className="col-4 text-center">
                <img src={img1} alt="Me" style={imgconf} />
            </div>

            <div className="col-8" style={{ marginLeft: '0px' }}>
                <h5 className="font-weight-bold" style={{marginTop:"25px"}}>Guest</h5>
            </div>

        </div>
    </div>);
    }

  }

    render(){
    return(
    <div style={{ width: "100%",}}>
      {this.renderRedirect()}
      <div className="sideNavTop">
        
        {this.renderUser()}
        
      </div>

      <hr></hr>

      <div className="sidenav mt-1">
        <Link to="/home/wall" onClick={this.props.closeDrawer}>Home</Link>
        <Link to="/home/allmps" onClick={this.props.closeDrawer}>All MPS</Link>
        {/* <Link to="/home/blog" onClick={this.props.closeDrawer}>Blog</Link> */}
        <Link href="#clients" onClick={this.props.closeDrawer}>About Us</Link>
        
        {this.renderAnonymousChanger()}
        {this.renderProfile()}
        {(this.state.isSigned)?<Link onClick={()=>this.setRedirect()}>Logout</Link>:
                  <a href="/login">Login</a>}
      </div>

      {/* <div className="row mt-4">
            <div className="col-4 text-cnter">
              <FaUserAlt className="align-middle" style={{fontSize:"20px"}}/>

              <h6 className="align-middle">1000</h6>
              <h6>Users</h6>
            </div>
            <div className="col-4 text-center">
              <FaUserCheck className="align-middle" style={{fontSize:"25px"}}/>

              <h6 className="align-middle">225</h6>
              <h6>MPS</h6>
            </div>
            <div className="col-4 text center">
              <FaBook className="align-middle" style={{fontSize:"20px"}}/>

              <h6 className="align-middle">1520</h6>
              <h6>Ideas</h6>
            </div>
        </div> */}

    </div>
  );
}
}
  export default SideNavBar
//   ReactDOM.render(SideNav);
