import React, { Component } from "react";
import RelatedMPs from "../components/RelatedMPs";
import CommentSection from "../components/CommentSection";
import CardsampleTwo from "../components/CardsampleTwo";
import UserCommentInput from "../components/UserCommentInput";
import axios from "axios";
import "../App.css";
import { connect } from "react-redux";
import { addIdeaList } from "../store/ideaListRedux";
import ReactLoading from "react-loading";

import Cookies from "universal-cookie";

const cookies = new Cookies();

const mpDummy = {
  mpfName: "Basil",
  mplName: "Rajapakshe",
  ratings: 4.5,
  nComments: 7698,
};
const apiUrl = 'http://localhost:4000/api/v1/';//"https://kiyanna.world/api/v1/";

const skyData = {
  //Consists of Bazil rajapakshe's details
  //We tke this data from somewhere else
  userToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjA1YzgyZDhlNjk1MTNlOGZlNTBhZSIsImlhdCI6MTU5NTk1NjM1OCwiZXhwIjoxNTk4NTQ4MzU4fQ.1rv1_h7lS8z3vf5Yl6nGGCdPSGhfjk5TexwXN93Ad3g",
  mpID: "5eda53df2258615c7079ad2c",
};

class MpProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      mpData: {
        description: "",
        isFollow: false,
        isRate: false,
        myRate: 0,
        rateCount: 1,
        followCount: 0,
        profilePic: "",
        averageRating: 0,
        _id: "",
        isRated: false,
        name: "",
        user: "",
        createAt: "",
        slug: "",
        __v: 0,
        ideas: [
          {
            likes: 0,
            _id: "",
            idea: "",
            mp_profile: "",
            user: {
              _id: "",
              name: "",
              id: "",
            },
            id: "",
          },
        ],
        id: "",
      },
      related_Profiles: [
        {
          profilePic: "",
          averageRating: 0,
          _id: "",
          name: "",
          id: "",
        },
        {
          profilePic: "no-photo.jpg",
          averageRating: 0,
          _id: "",
          name: "",
          id: "",
        },
        {
          profilePic: "no-photo.jpg",
          averageRating: 0,
          _id: "",
          name: "",
          id: "",
        },
      ],
      relatedMpData: [
        {
          profilePic: "",
          averageRating: 0,
          _id: "",
          name: "",
          id: "",
        },
        {
          profilePic: "no-photo.jpg",
          averageRating: 0,
          _id: "",
          name: "",
          id: "",
        },
        {
          profilePic: "no-photo.jpg",
          averageRating: 0,
          _id: "",
          name: "",
          id: "",
        },
      ],
      isSigned: false,
      token: "",
      mpId: "",
      myRate: 0,
    };
  }

  async getCookie() {
    const isSign = cookies.get("isSigned");
    const mpId = cookies.get("mp-id");
    this.setState({ mpID: mpId });
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
    this.getMpData();
  }

  getMpData() {
    this.setState({ isLoading: true });
    //console.log(this.state.mpID);
    if (this.state.isSigned) {
      const requestOptions = {
        method: "GET",
        headers: { Authorization: "Bearer " + this.state.token },
        // body: JSON.stringify({ title: "React POST Request Example" }),
      };

      fetch(
        apiUrl + "mp-profiles/" + this.state.mpID + "/user/profile",
        requestOptions
      )
        .then((res) => res.json())
        .then((json) => {
          // console.log(json.data.rateCount);
          if (json.sucess) {
            //console.log("name aulaa", json);
            this.setState({
              mpData: json.data,
              relatedMpData: json.related_Profiles,
              myRate: json.my_rate.rating,
            });

            this.props.addIdeaList(json.data.ideas);
            this.setState({ isLoading: false });
          } else {
            alert("Error loading data!");
            this.setState({ isLoading: false });
          }
        });
    } else {
      //console.log("else eke");
      fetch(apiUrl + "mp-profiles/" + this.state.mpID)
        .then((res) => res.json())
        .then((json) => {
          // console.log(json.data.rateCount);
          if (json.sucess) {
            //console.log(json);
            this.setState({
              mpData: json.data,
              relatedMpData: json.related_Profiles,
            });
            this.props.addIdeaList(json.data.ideas);
            this.setState({ isLoading: false });
          } else {
            alert("Error loading data!");
            this.setState({ isLoading: false });
          }
        });
    }
  }

  render() {
    return (
      <div style={{ marginTop: "10vh" }}>
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
                        <CardsampleTwo
                          mpfName={this.state.mpData.name || ""}
                          mplName={"" || ""} /////////
                          ratings={this.state.mpData.averageRating || 0}
                          isSigned={this.state.isSigned}
                          id={this.state.mpData.id}
                          isRated={this.state.mpData.isRate}
                          myRate={this.state.myRate}
                          nComments={
                            //////////Passing a default val, need a cleaner solution
                            this.state.mpData.ideas
                              ? this.state.mpData.ideas.length
                              : 0
                          }
                          rateCount={this.state.mpData.rateCount}
                          description={this.state.mpData.description || ""}
                          mpPic={this.state.mpData.profilePic}
                          isFollow={this.state.mpData.isFollow || false}
                        />
                      </div>
                    </div>

                    {/* <h3>Related Mps PC View</h3> */}

                    <div className="row mx-0 d-none d-md-block">
                      <div className="col" style={{ padding: "0px" }}>
                        {this.state.relatedMpData[0] && //when data is not ready, don't render this part
                          this.state.relatedMpData[1] &&
                          this.state.relatedMpData[2] && (
                            <RelatedMPs
                              MpData1={this.state.relatedMpData[0]}
                              MpData2={this.state.relatedMpData[1]}
                              MpData3={this.state.relatedMpData[2]}
                            />
                          )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8" style={{ padding: "0px" }}>
                    <div
                      className="row overflow-auto m-0"
                      style={{ padding: "0px" }}
                    >
                      <div className="col" style={{ padding: "0px" }}>
                        {this.state.mpData.ideas && (
                          <CommentSection
                            Name={this.state.mpData.name}
                            mpID={this.state.mpData.id}
                            userToken={this.state.token}
                            isSigned={this.state.isSigned}
                          />
                        )}
                      </div>
                    </div>

                    <div className="row m-0">
                      <div className="col">
                        <UserCommentInput
                          mpID={this.state.mpData.id}
                          userToken={this.state.token}
                          isSigned={this.state.isSigned}
                        />
                      </div>
                    </div>

                    {/* <h3>Related Mps Mobile View</h3> */}

                    <div className="row mt-2 d-md-none">
                      <div className="col" style={{ padding: "0px" }}>
                        {this.state.relatedMpData[0] && //when data is not ready, don't render this part
                          this.state.relatedMpData[1] &&
                          this.state.relatedMpData[2] && (
                            <RelatedMPs
                              MpData1={this.state.relatedMpData[0]}
                              MpData2={this.state.relatedMpData[1]}
                              MpData3={this.state.relatedMpData[2]}
                            />
                          )}
                      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MpProfile);
