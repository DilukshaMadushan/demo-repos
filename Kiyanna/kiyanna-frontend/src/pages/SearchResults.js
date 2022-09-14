import React, {Component} from 'react';
import './home.css';
import MpItem from '../components/mpItem'; 
import Users from '../components/Users';
import Cookies from 'universal-cookie';

import {connect} from 'react-redux';
import {addMpList} from "../store/mpListRedux";
import ReactLoading from 'react-loading';
const apiUrl = 'https://kiyanna.world/api/v1/';

const cookies = new Cookies();


class SearchResults extends Component {

    constructor(props) {
        super(props);
        this.state = {
            word:"go",
            isLoading:true,
            users:0,
            count:0,
            mps:0,
            mpList:[],
            isSigned:false,
            token:"",
            user:{
              "anonymous": true,
              "avatar_name": "ex-avatar",
              "id": "",
              "name": "",
              "profilePic_URL": "no-photo.jpg"
              },
        };
    }

  async getCookie(){
    const isSign = cookies.get('isSigned');
    const searchWord = cookies.get('searchWord');
    this.setState({word:searchWord});
    if (isSign==='true'){
      this.setState({isSigned:true});
      const token = cookies.get('token');
      this.setState({token:token});
    }else{
      
      this.setState({isSigned:false});
    }
  }

  componentWillMount(){
    this.getCookie();
  }

  componentDidMount() {

    this.getSearchMps();
  }

  getSearchMps(){
    this.setState({isLoading:true});
    
    if (this.state.isSigned){
      //console.log("fuck Signed in aneee");
      
      const headers = { 'Authorization': 'Bearer '+this.state.token };

      fetch(apiUrl+'mp-profiles/user/search?search='+this.state.word, { headers })
              .then(response => response.json())
              .then(json => {
                  //console.log("Sign innnnn");
                  if (json.success===true){
                      this.setState({ user: json.user});
                      this.setState({ mpList: json.data });
                      this.passingMpList(json.data);

                      this.setState({ users: json.users });
                      this.setState({ count: json.count });
                      this.setState({ mps: json.mp_profiles });
                      this.setState({isLoading:false});
                  }else{
                      alert("Error");
                      this.setState({isLoading:false});
                  }
                  
              });
    }else{
        //console.log("signed naaaa aneee");
        fetch(apiUrl+'mp-profiles/search?search='+this.state.word)
              .then(response => response.json())
              .then(json => {
                  //console.log("Sign in naaa");
                  if (json.success===true){
                      this.setState({ mpList: json.data });
                      this.passingMpList(json.data);

                      this.setState({ users: json.users });
                      this.setState({ count: json.count });
                      this.setState({ mps: json.mp_profiles });
                      this.setState({isLoading:false});
                  }else{
                      alert("Error");
                      this.setState({isLoading:false});
                  }
                  
              });
    }
  }

  passingMpList = (item) => {
    this.props.addMpList(item);
  }

  // ------------ Render No resultrs -------------

  renderNoItems() {
    if (this.state.mpList.length === 0) {
      return (
        <div
          style={{
            marginLeft: "42%",
            marginTop: "300px",
            marginBottom: "300px",
          }}
        >
          <h3 style={{ color: "gray" }}>No Search Results</h3>
        </div>
      );
    }
  }

  render() {
  return (
    <div className="Search">
     
      {(this.state.isLoading)?<div className="container-fluid">
                
              <div className="row  d-md-none" style={{alignItems: 'center',justifyContent: 'center',marginTop:"150px",marginBottom:"300px"}}>
                  <ReactLoading type={"spin"} color={"black"} height={100} width={100}/>
              </div>

              <div className="row d-none d-md-block" style={{marginLeft:"45%",marginTop:"250px",marginBottom:"300px"}}>
                  <ReactLoading type={"spin"} color={"black"} height={100} width={100}/>
              </div> 
                
            
        </div>:
      <div className="container-fluiud">
         {this.renderNoItems()}
        <div className="row align-items-top align-middle margin-top: my-5 ">
          {/* Profile User */}
         <div className="col-lg-2">

         </div>

          <div className="col-lg-7">
            
            {/* Idea Card component */}
            
            <div>
              <MpItem isSigned={this.state.isSigned}/>
            </div>
            
            
          </div>
          <div className="col-lg-3">

         </div>
        </div>
      </div>}

    </div>
  );
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    addMpList:(item) => dispatch(addMpList(item)),
  }
}

export default connect(null,mapDispatchToProps)(SearchResults);
