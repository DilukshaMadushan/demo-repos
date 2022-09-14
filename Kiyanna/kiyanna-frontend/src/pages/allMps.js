import React, { Component } from "react";
import "./home.css";
import MpItem from "../components/mpItem";
import Users from "../components/Users";
import Cookies from "universal-cookie";
import InfiniteScroll from "react-infinite-scroll-component";
import { connect } from "react-redux";
import Select from "react-select";
import { addMpList } from "../store/mpListRedux";
import ReactLoading from "react-loading";
const apiUrl = 'http://localhost:4000/api/v1/';//"https://kiyanna.world/api/v1/";

const cookies = new Cookies();
const sortingOptions = [
  { value: "rating", label: "Rating" },
  { value: "numOfIdeas", label: "No of Ideas" },
  { value: "alphabetical", label: "A-Z" },
];

class allMps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortingMethod: "-averageRating",
      selectedOption: null,
      moreDataStatus: true,
      page: 1,
      isLoading: true,
      users: 0,
      count: 0,
      mps: 0,
      mpList: [],
      isSigned: false,
      token: "",
      user: {
        anonymous: true,
        avatar_name: "ex-avatar",
        id: "",
        name: "",
        profilePic_URL: "no-photo.jpg",
      },
    };
  }

  async getCookie() {
    const isSign = cookies.get("isSigned");
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
    this.getAllMps("-averageRating");
  }

  getAllMps(sortingMethod) {
    this.setState({ isLoading: true });

    if (this.state.isSigned) {
      //console.log("fuck Signed in aneee");

      const headers = { Authorization: "Bearer " + this.state.token };

      fetch(apiUrl + "mp-profiles/user/all?page=1" + "&sort=" + sortingMethod, {
        headers,
      })
        .then((response) => response.json())
        .then((json) => {
          //console.log(json)
          //console.log("Sign innnnn");
          if (json.success === true) {
            this.setState({ user: json.user });

            this.setState({ mpList: json.data });
            this.passingMpList(json.data);

            this.setState({ users: json.users });
            this.setState({ count: json.ideaCount });
            this.setState({ mps: json.mp_profiles });
            this.setState({ isLoading: false });
          } else {
            alert("Error");
            //console.log(json)
            this.setState({ isLoading: false });
          }
        });
    } else {
      //console.log("signed naaaa aneee");
      fetch(apiUrl + "mp-profiles?page=1" + "&sort=" + sortingMethod)
        .then((response) => response.json())
        .then((json) => {
          //console.log("Sign in naaa");
          if (json.success === true) {
            this.setState({ mpList: json.data });
            this.passingMpList(json.data);

            this.setState({ users: json.users });
            this.setState({ count: json.ideaCount });
            this.setState({ mps: json.mp_profiles });
            this.setState({ isLoading: false });
          } else {
            alert("Error");
            this.setState({ isLoading: false });
          }
        });
    }
  }

  passingMpList = (item) => {
    this.props.addMpList(item);
  };

  // -------------- More Data -----------------\

  fetchMoreData = () => {
    this.setState({ page: this.state.page + 1 });
    this.getMoreMps(this.state.sortingMethod);
  };

  getMoreMps = (sortingMethod) => {
    if (this.state.isSigned) {
      //console.log("fuck Signed in aneee");

      const headers = { Authorization: "Bearer " + this.state.token };

      fetch(
        apiUrl +
          "mp-profiles/user/all?page=" +
          this.state.page +
          "&sort=" +
          sortingMethod,
        { headers }
      )
        .then((response) => response.json())
        .then((json) => {
          //console.log(json)
          //console.log("Sign innnnn");
          if (json.success === true) {
            this.setState({ user: json.user });
            if (json.data.length == 0 || json.data.length < 25) {
              this.setState({ moreDataStatus: false });
            }
            let newMpList = this.state.mpList.concat(json.data);

            this.setState({ mpList: newMpList });
            this.passingMpList(newMpList);

            this.setState({ users: json.users });
            this.setState({ count: json.count });
            this.setState({ mps: json.mp_profiles });
          } else {
            alert("Error");
            console.log(json);
          }
        });
    } else {
      //console.log("signed naaaa aneee");
      fetch(
        apiUrl +
          "mp-profiles?page=" +
          this.state.page +
          "&sort=" +
          sortingMethod
      )
        .then((response) => response.json())
        .then((json) => {
          //console.log("Sign in naaa");
          if (json.success === true) {
            if (json.data.length == 0 || json.data.length < 25) {
              this.setState({ moreDataStatus: false });
            }
            let newMpList = this.state.mpList.concat(json.data);

            this.setState({ mpList: newMpList });
            this.passingMpList(newMpList);

            this.setState({ users: json.users });
            this.setState({ count: json.count });
            this.setState({ mps: json.mp_profiles });
          } else {
            alert("Error");
          }
        });
    }
  };

  // -------------- Sorting Options --------------------

  handleChange = (selectedOption) => {
    this.setState({ selectedOption: selectedOption });
    //console.log(`Option selected:`, selectedOption);

    if (selectedOption.value == "rating") {
      this.setState({ page: 1 });
      this.setState({ sortingMethod: "-averageRating" });
      this.getAllMps("-averageRating");
    } else if (selectedOption.value == "numOfIdeas") {
      this.setState({ page: 1 });
      this.setState({ sortingMethod: "-mpIdeas" });
      this.getAllMps("-mpIdeas");
    } else if (selectedOption.value == "alphabetical") {
      this.setState({ page: 1 });
      this.setState({ sortingMethod: "name" });
      this.getAllMps("name");
    }
  };

  render() {
    return (
      <div className="Home">
        <div className="container-fluid">
          <div className="row align-items-top align-middle margin-top: my-5 ">
            {/* Profile User */}
            <div className="col-lg-9 p-0">
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
                  {this.state.isLoading ? (
                    <div
                      className="row"
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "150px",
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
                    <div>
                      <div className="" style={{ width: "200px" }}>
                        <Select
                          value={this.state.selectedOption}
                          onChange={this.handleChange}
                          options={sortingOptions}
                          placeholder="Sort By"
                          defaultValue="rating"
                        />
                      </div>

                      <InfiniteScroll
                        style={{ overflowX: "hidden" }}
                        dataLength={this.state.mpList.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.moreDataStatus}
                        loader={
                          <div
                            className="row"
                            style={{
                              alignItems: "center",
                              justifyContent: "center",
                              marginTop: "25px",
                              marginBottom: "20px",
                            }}
                          >
                            <ReactLoading
                              type={"spin"}
                              color={"black"}
                              height={50}
                              width={50}
                            />
                          </div>
                        }
                      >
                        <MpItem isSigned={this.state.isSigned} />
                      </InfiniteScroll>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-3"></div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addMpList: (item) => dispatch(addMpList(item)),
  };
};

export default connect(null, mapDispatchToProps)(allMps);
