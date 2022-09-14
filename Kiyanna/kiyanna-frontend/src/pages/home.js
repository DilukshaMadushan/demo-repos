import React, { Component } from 'react';
import './home.css';
import { URL_PATH } from '../constants/URL_path';
import Idea from '../components/Idea';
import Users from '../components/Users';
import Cookies from 'universal-cookie';
import SuggestMps from '../components/suggestMps';
import {connect} from 'react-redux';
import {addIdeaList} from '../store/ideaListRedux';
import InfiniteScroll from "react-infinite-scroll-component";
import ReactLoading from 'react-loading';
const apiUrl = 'http://localhost:4000/api/v1/';//'https://kiyanna.world/api/v1/';

const cookies = new Cookies();


class Home extends Component {
  state = {
    moreDataStatus:true,
    page:1,
    followedCount:6,
    popupShow:true,
    modalActive: false,
    isLoading:true,
    ideas : [],
    isSigned:false,
    token:"",
    user:{
          "anonymous": true,
          "avatar_name": "ex-avatar",
          "id": "",
          "name": "",
          "profilePic_URL": "no-photo.jpg"
          },
      users:0,
      count:0,
      mps:0
  }
  

  async getCookie(){
    const isSign = cookies.get('isSigned');
    
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
    //console.log(process.env.config);
  }

  passingIdeaList = (items) => {
    this.props.addIdeaList(items);
  }

  componentDidMount(){
    this.getAllIdeas();
  }

  getAllIdeas(){
    if (this.state.ideas.length==0){
      this.setState({isLoading:true});
    }
    
    if (this.state.isSigned){
      // console.log("home Signed in");
      // console.log(this.state.token);
      const headers = { 'Authorization': 'Bearer '+this.state.token };

      fetch(apiUrl+'ideas/user/all?page='+this.state.page.toString(), { headers })
            .then(response => response.json())
            .then(json => {
                //console.log("ideas",json.data[0]);
                if (json.success===true){
                  if (this.state.ideas.length==0){
                    this.setState({isLoading:false});
                  }
                  //console.log(json);
                  if (json.data.length==0 || json.data.length<25){
                    this.setState({moreDataStatus:false});
                  }

                  this.setState({ user: json.user});
                  
                  if (this.state.ideas.length==0){
                    this.setState({ ideas: json.data });
                    this.passingIdeaList(json.data);
                  }else{
                    let newIdeas = this.state.ideas.concat(json.data);
                    this.setState({ ideas: newIdeas });
                    this.passingIdeaList(newIdeas);
                  }
                  

                  this.setState({ users: json.users });
                  this.setState({ count: json.count });
                  this.setState({ mps: json.mp_profiles });
                  this.setState({followedCount:json.followed_mp});

                    
                    
                }else{
                    alert("Error");
                    if (this.state.ideas.length==0){
                      this.setState({isLoading:false});
                    }
                }
                
            });

    }else{
      //console.log("home signed naaaa");
      fetch(apiUrl+'ideas?page='+this.state.page.toString())
      .then((res) => res.json())
      .then((json) => {
        //console.log(json);
        if (json.success === true) {
          if (this.state.ideas.length==0){
            this.setState({isLoading:false});
          }
          
          if (json.data.length==0 || json.data.length<25){
            this.setState({moreDataStatus:false});
          }

          if (this.state.ideas.length==0){
            this.setState({ ideas: json.data });
            this.passingIdeaList(json.data);
          }else{
            let newIdeas = this.state.ideas.concat(json.data);
            this.setState({ ideas: newIdeas });
            this.passingIdeaList(newIdeas);
          }

          this.setState({ users: json.users });
          this.setState({ count: json.count });
          this.setState({followedCount:6});
          this.setState({ mps: json.mp_profiles });
          
          
        } else {
          alert('Error');
          if (this.state.ideas.length==0){
            this.setState({isLoading:false});
          }
        }
      });
    }

    
  }

  openModal = () => {
    this.setState({ modalActive: true })
  }

  closeModal = () => {
    this.setState({ modalActive: false })
  }

  // ---------------- Suggest MPS ------------------

  increaseFollows = () => {
    this.setState({followedCount:this.state.followedCount+1});
  }

  decreaseFollows = () => {
    this.setState({followedCount:this.state.followedCount-1});
  }

  // --------------- Fetch More ideas --------------

  fetchMoreData = () => {
    this.setState({page:this.state.page+1});
    this.getAllIdeas();
  }



  render() {
    return (
      <div className="Home">

        <div className="container-fluid">
          <div className="">
            
              {(this.state.isSigned)?<SuggestMps followedCount={this.state.followedCount}
                                  increaseFollowCount={this.increaseFollows}
                                  decreaseFollowCount={this.decreaseFollows}
                      />:<div></div>}
            
          </div>
        
          <div className="row" style={{marginTop:"65px"}}>
            {/* Profile User */}
            <div className="col-lg-9 p-0" style={{width:"100%"}}>
              <div className="row p-0">
                <Users
                  userList={this.state.users}
                  count={this.state.count}
                  mps={this.state.mps}
                  isSigned={this.state.isSigned}
                  user={this.state.user}
                ></Users>


                <div className="col-lg-9 p-0">
                  
                  {/* Idea Card component */}

                  {(this.state.isLoading)?<div className="row" style={{alignItems: 'center',justifyContent: 'center', marginTop:"150px",marginBottom:"100px"}}>
                    
                      <ReactLoading type={"spin"} color={"black"} height={100} width={100}/>
                    
                  </div>
                  :<div>
                    <InfiniteScroll
                      dataLength={this.state.ideas.length}
                      next={this.fetchMoreData}
                      hasMore={this.state.moreDataStatus}
                      loader={<div className="row" style={{alignItems: 'center',justifyContent: 'center', marginTop:"25px",marginBottom:"20px"}}>
                    
                      <ReactLoading type={"spin"} color={"black"} height={50} width={50}/>
                    
                      </div>}
                    >
                      <Idea isSigned={this.state.isSigned}></Idea>
                    </InfiniteScroll>
                  </div>}
                
                  

                </div>
              </div>
            </div>
            <div className="col-lg-3">
              
            </div>
          </div>
        </div>

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    addIdeaList:(item) =>dispatch(addIdeaList(item)),
  }
}

export default connect(null,mapDispatchToProps)(Home);

