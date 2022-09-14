
import React, {Component} from 'react';

import Cookies from 'universal-cookie';
import {Button, Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import {addMpList} from "../store/mpListRedux";
import {addFollow} from "../store/mpListRedux";
import ReactLoading from 'react-loading';
import { FaSearch } from 'react-icons/fa';
import InfiniteScroll from "react-infinite-scroll-component";
import Autosuggest from 'react-autosuggest';
import tutorial1 from '../assets/tutorial1.jpeg';
import tutorial2 from '../assets/tutorial2.jpeg';
import tutorial3 from '../assets/tutorial3.jpeg';
import tutorial4 from '../assets/tutorial4.jpeg';

import theme from './suggestMps.css';

const apiUrl = 'https://kiyanna.world/api/v1/';
const cookies = new Cookies();


class SuggestMps extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchStatus:false,
            suggestions:[],
            tutorialStatus:0,
            moreDataStatus:true,
            page:1,
            searchWord: "",
            followedCount:0,
            popupShow:false,
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
    if (this.state.isSigned){
        this.getAllMps(true);
    }
    
  }

  componentWillReceiveProps(nextProps) {
    this.setState({followedCount:nextProps.followedCount});
    //console.log("Kela wela thyenne",this.state.followedCount);
    if (nextProps.followedCount<6){
        this.setState({popupShow:true});
        
    }
  }

  getAllMps(reloadStatus){
    //console.log("length is ",this.state.mpList.length);
    if (reloadStatus){
      this.setState({isLoading:true});
    }
    
    //console.log("fuck Signed in aneee");
    
    const headers = { 'Authorization': 'Bearer '+this.state.token};

    fetch(apiUrl+'mp-profiles/user/all?page='+this.state.page.toString(), { headers })
            .then(response => response.json())
            .then(json => {
            //console.log(json)
                //console.log("Sign innnnn");
                if (json.success===true){

                    if (reloadStatus){
                      this.setState({isLoading:false});
                      this.setState({moreDataStatus:true});
                    }

                    if (json.data.length==0 || json.data.length<25){
                      this.setState({moreDataStatus:false});
                    }

                    this.setState({ user: json.user});

                    if (this.state.mpList.length==0){
                      this.setState({ mpList: json.data });
                      this.passingMpList(json.data);
                    }else{
                      let newMpList = this.state.mpList.concat(json.data);
                      this.setState({mpList:newMpList});
                      this.passingMpList(newMpList);
                    }
                    

                    this.setState({ users: json.users });
                    this.setState({ count: json.count });
                    this.setState({ mps: json.mp_profiles });
                    
                }else{
                    alert("Error");
                    //console.log(json)
                    if (reloadStatus){
                      this.setState({isLoading:false});
                    }
                }
                
            });
    
  }

  passingMpList = (item) => {
    this.props.addMpList(item);
  }

  //--------------------------- Send Follow --------------------------------

  sendFollowReq = (item,action) =>{
    const requestOptions = {
      method: 'PUT',
      headers: { 'Authorization': 'Bearer '+this.state.token }
    };

  fetch(apiUrl+'mp-profiles/'+item.id+'/'+action, requestOptions)
        .then(response => response.json())
        .then(json => {
          
          //console.log(json);
            if (json.success){
              //alert("Success");
            }else{
              this.passingAddFollow(item);
              if (!item.isFollow){
                this.props.increaseFollowCount();
              }else{
                this.props.decreaseFollowCount();
              }
              alert("Error");
            }
        });
  }
  
  followMp = (item) => {
    
    this.passingAddFollow(item);

    if (item.isFollow){
        this.props.increaseFollowCount();
        this.sendFollowReq(item,'follow');
    
    }else{
        this.props.decreaseFollowCount();
        this.sendFollowReq(item,'unfollow');
    }
    
  }

  passingAddFollow = (item) => {
    this.props.addFollow(item);
    //console.log(item)
  }

  // -------------------- Search MPs ------------------------

  changeSearchWord = (event) => {
    this.setState({ searchWord: event.target.value });
    this.setState({page:1});
    //console.log(event.target.value);
    if (event.target.value==""){
        this.getAllMps();
    }
    // else{
    //     this.getSearchMps();
    // }

  };

  searchMp = (event) => {
    
    if (this.state.searchWord && !event.shiftKey && event.key === "Enter") {
      if (event.target.value==""){
        this.getAllMps();
      }else{
        this.setState({searchStatus:true});
        this.getSearchMps();
      }
    }
  }

  searchMpClick = (name) =>{
    if (name!="") {
      this.setState({searchStatus:true});
      this.getSearchMps(name);
    }
  }

  getSearchMps(name){
    this.setState({isLoading:true});
    this.setState({page:1});
    if (this.state.isSigned){
      //console.log("fuck Signed in aneee");
      
      const headers = { 'Authorization': 'Bearer '+this.state.token };

      fetch(apiUrl+'mp-profiles/user/search?search='+name, { headers })
              .then(response => response.json())
              .then(json => {
                  //console.log("Sign innnnn");
                  if (json.success===true){
                      
                      this.setState({ mpList: json.data });
                      this.passingMpList(json.data);

                      this.setState({isLoading:false});
                      //this.setState({moreDataStatus:false});
                  }else{
                      alert("Error");
                      this.setState({isLoading:false});
                  }
                  
              });
    }
  }

  // --------------- Fetch More Mps --------------------

  fetchMoreData =()=>{
    this.setState({page:this.state.page+1});
    this.getAllMps(false);
  }

  // ------------------- Suggestion in Search ---------------------

  onChange = (event, { newValue }) => {
    this.setState({ searchWord: newValue });
    //console.log(event.target.value);
    if (newValue==""){
        
        this.setState({ mpList: [] });
        //console.log("ane manda length ",this.state.mpList.length)
        this.passingMpList([]);
        this.setState({searchStatus:false});
        this.getAllMps(true);
    }
    
  };

  searchSelected=(event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method })=>{
    this.searchMpClick(suggestionValue);
  }
 
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

  // ------------------- Render Elements -------------------

  renderElements =() =>{
    if (this.state.tutorialStatus==4){
      return(
        <div>
            <div style={{width:"100%",alignItems: 'center',justifyContent: 'center'}}>
                      {/* <input
                        type="text"
                        className="form-control"
                        placeholder="Search MPS..."
                        value={this.state.searchWord}
                        onChange={this.changeSearchWord}
                        onKeyPress={(e)=>this.searchMp(e)}
                      /> */}

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
                                <button className="btn btn-secondary" type="button" style={{height:"40px"}} onClick={()=>this.searchMpClick(this.state.searchWord)}>
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

                    
  
                {(this.state.isLoading)?<div className="row" style={{alignItems: 'center',justifyContent: 'center', marginTop:"150px",marginBottom:"100px"}}>
                  
                  <ReactLoading type={"spin"} color={"black"} height={100} width={100}/>
                
                  </div>:
                  <div className="overflow-auto m-0 mt-2" style={{ boxSizing:' border-box',
                                                              display: 'flex',
                                                              flexDirection: 'column',
                                                              justifyItems: 'flex-start',
                                                              height: '400px'
                                                              }}>
                      <InfiniteScroll
                        dataLength={this.state.mpList.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.moreDataStatus}
                        height={400}
                        loader={<div className="row" style={{alignItems: 'center',justifyContent: 'center', marginTop:"25px",marginBottom:"20px"}}>
                  
                        <ReactLoading type={"spin"} color={"black"} height={25} width={25}/>
                      
                        </div>}
                      >
                      {this.props.mpList.map((item) => (
                          <div class="row no-gutters mt-2">
                              <div className="col-10">
                                  <div class="row no-gutters">
                                      <img
                                          src={item.profilePic}
                                          class="rounded"
                                          style={{ marginLeft: '15px', width: '30px', backgroundColor:"#A9A9A9",padding:"3px" }}
                                          alt="Me"
                                      />
  
                                      <h6 style={{marginLeft:"3px"}}>{item.name}</h6>
  
                                  </div>
                              </div>
                              <div className="col-2">
                                  <button
                                      
                                      className="btn btn-primary btn-sm"
                                      style={{ marginRight: '10px' }}
                                      onClick={()=>this.followMp(item)}
                                  >
                                      {item.isFollow ? `Followed` : `Follow`}
                                  </button>
                              </div>
  
                          </div>
                          )
                      )}
                      </InfiniteScroll>
                  </div>
                }
        </div>
      );
    }else if (this.state.tutorialStatus==0){
        return(
          <div>
            <img
                src={tutorial1}
                class="rounded"
                style={{  width: '100%' }}
                alt="Tutorial"
            />
          </div>
        );
    }else if (this.state.tutorialStatus==1){
      return(
        <div>
            <img
                src={tutorial2}
                class="rounded"
                style={{  width: '100%' }}
                alt="Tutorial"
            />
        </div>
      );
    }else if (this.state.tutorialStatus==2){
      return(
        <div>
            <img
                src={tutorial3}
                class="rounded"
                style={{  width: '100%' }}
                alt="Tutorial"
            />
        </div>
      );
    }else if (this.state.tutorialStatus==3){
      return(
        <div>
          <img
              src={tutorial4}
              class="rounded"
              style={{  width: '100%' }}
              alt="Tutorial"
          />
        </div>
      );
    }
    
  }

  renderFooter=()=>{
    if (this.state.tutorialStatus==4){
      return(<div>
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                  disabled={this.props.followedCount<6}
                  onClick={()=>{
                    this.setState({popupShow:false});
                    window.location.reload(true);
                  }
                    }
                >
                  Finish
                </button>
      </div>);
    }else if(this.state.tutorialStatus!==4){
      return(<div className="row">
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                  
                  onClick={()=>{
                    this.setState({tutorialStatus:4});
                    
                  }
                    }
                >
                  Skip
                </button>

                <button
                  type="submit"
                  className="btn btn-primary btn-sm ml-1"
                  
                  onClick={()=>{
                    this.setState({tutorialStatus:this.state.tutorialStatus+1});
                    
                  }
                    }
                >
                  Next
                </button>
      </div>)
    }
  }

  render() {
  return (
    <div className="Pop-up">
        <Modal show={this.state.popupShow}>
              <Modal.Header>{(this.state.tutorialStatus==4)?'Please enable more than 5 MPs to Continue':'Tutorial'}</Modal.Header>
              <Modal.Body>
                {this.renderElements()}

              </Modal.Body>
              <Modal.Footer>
                {this.renderFooter()}
              </Modal.Footer>
        </Modal>

    </div>
  );
  }
}

const mapStateToProps = (state) => {
    return {
      mpList: state.mpListRedux.mpList,
    }
}

const mapDispatchToProps = (dispatch) => {
  return{
    addMpList:(item) => dispatch(addMpList(item)),
    addFollow:(item) => dispatch(addFollow(item)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SuggestMps);




