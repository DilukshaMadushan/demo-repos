import React, { Component } from "react";
import UserCommentSection from "../components/userCommentSection";
import axios from "axios";
import "../App.css";
import { connect } from "react-redux";
import { addIdeaList } from "../store/ideaListRedux";
import ReactLoading from "react-loading";
import {Link,Redirect} from 'react-router-dom';

import Cookies from "universal-cookie";
import CardUser from "../components/CardUser";
const cookies = new Cookies();
const apiUrl = 'https://kiyanna.world/api/v1/';

// const skyData = {
//   //Consists of Bazil rajapakshe's details
//   //We tke this data from somewhere else
//   userToken:
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjA1YzgyZDhlNjk1MTNlOGZlNTBhZSIsImlhdCI6MTU5NTk1NjM1OCwiZXhwIjoxNTk4NTQ4MzU4fQ.1rv1_h7lS8z3vf5Yl6nGGCdPSGhfjk5TexwXN93Ad3g",
//   mpID: "5eda53df2258615c7079ad2c",
// };

class UserProfiletwo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      userData: {
        city: "",
        anonymous: true,
        status: "",
        profilePic_URL: "",
        _id: "", //"5",
        name: "",
        user: "",
        createAt: "",
        slug: "",
        __v: 0,
        id: "",
        // email: "", //--------------------------created this variable manually ------- need to update this--------------------------\\
      },
      // ideas: [],
      isSigned: false,
      userID: "",
      token: "",
      ideas:[],
      redirect:false
    };
  }

  async getCookie() {
    const isSign = cookies.get("isSigned");
    const userId = cookies.get("id");
    this.setState({ userID: userId });
    if (isSign === "true") {
      this.setState({ isSigned: true });
      const token = cookies.get("token");
      this.setState({ token: token });
    } else {
      this.setState({ isSigned: false });
    }
  }

  componentWillMount() {
    this.getCookie();
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData=()=> {
    this.setState({ isLoading: true });
    if (this.state.isSigned) {
      //----------------------------------fix this place-----------------------------------------\\
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization:
            "Bearer " +this.state.token,
        },
        // headers: { Authorization: "Bearer " + this.state.token },
        // body: JSON.stringify({ title: "React POST Request Example" }),
      };

      fetch(
        apiUrl+"user-profiles/"+this.state.userID,
        // "http://37.187.189.64:80/api/v1/user-profiles/" + this.state.userID,
        requestOptions
      )
        .then((res) => res.json())
        .then((json) => {
          if (json.sucess) {
            //console.log(json.data);
            this.setState({
              userData: json.data,
              ideas: json.ideas,
            });
            
            this.props.addIdeaList(json.ideas);
            //console.log("jsonnnn",json);

            // this.props.addIdeaList(json.ideas); //------------------------------------------???????????????//-------------
            this.setState({ isLoading: false });
          } else {
            alert("Error loading data!");
            this.setState({ isLoading: false });
          }
        });
    } else {
      this.setState({redirect:true});
      this.setState({ isLoading: false });
      //alert("Please login to continue!");
      
    }
  }

  // -------------- redirect -------------------------

  renderRedirect = () => {
    if (this.state.redirect) {
      this.setState({redirect:false});
      return <Redirect to='/home/wall'/>
    }
  }

  render() {
    return (
      <div style={{ marginTop: "10vh" }}>
        {this.renderRedirect()}
        {this.state.isLoading ? (
          <div
            className="row"
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: "250px",
              marginBottom: "300px",
            }}
          >
            <ReactLoading
              type={"spin"}
              color={"black"}
              height={100}
              width={100}
            />
            
          </div>
        ) : (
          <div
            className="no-gutters container-fluid text-center"
            style={{ padding: "0px" }}
          >
            <div className="row content">
              <div className="col-md-2" style={{ padding: "0px" }}>
                {/* left bar */}
              </div>

              <div className="col-md-8 text-left" style={{ padding: "0px" }}>
                <div className="row mx-0">
                  <div className="col-md-4" style={{ padding: "0px" }}>
                    <div className="row mx-0">
                      <div className="col" style={{ padding: "0px" }}>
                        <CardUser
                          name={this.state.userData.name}
                          //eMail={this.state.userData.email} //------------------------unavailable-----------------------------------------------\\
                          city={this.state.userData.city}
                          profilePic={this.state.userData.profilePic_URL}
                          isSigned={this.state.isSign}
                          userId={this.state.userID}
                          token={this.state.token}
                        />
                      </div>
                    </div>

                    {/* <h3>Related Mps PC View</h3> */}
                  </div>
                  <div className="col-md-8" style={{ padding: "0px" }}>
                    
                    <div
                      className="row overflow-auto m-0"
                      style={{ padding: "0px" }}
                    >
                      <div className="col" style={{ padding: "0px" }}>
                        {this.state.ideas && (
                          <UserCommentSection
                            Name={this.state.userData.anonymous ? "Anonymous" : this.state.userData.name}
                            mpID={this.state.userData.id}
                            userToken={this.state.token}
                            isSigned={this.state.isSigned}
                          />
                        )}
                      </div>
                    </div>

                    <div className="row m-0">
                      <div className="col">{/* UserCommentInput */}</div>
                    </div>

                    {/* <h3>Related Mps Mobile View</h3> */}

                    <div className="row mt-2 d-md-none">
                      <div className="col" style={{ padding: "0px" }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-2" style={{ padding: "0px" }}>
                {/* right bar */}
              </div>
            </div>
          </div>
        )}
      </div>
      // <div>{JSON.stringify(this.state.mpData)}</div>
      // <div>
      //   saraas absrs
      //   <RatingIndicator rating={1} />
      // </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    curentMpId: state.mpRedux.item,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addIdeaList: (item) => dispatch(addIdeaList(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfiletwo);
