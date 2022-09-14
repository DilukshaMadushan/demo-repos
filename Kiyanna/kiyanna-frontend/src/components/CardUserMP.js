import React, { Component } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import img1 from "../assets/person.jpg";
import ReactLoading from "react-loading";
import InfiniteScroll from "react-infinite-scroll-component";

const apiUrl = "https://kiyanna.world/api/v1/";

// const skyData = {
//   userToken:
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNDRkZDhmNmI1YWNlNDkwMGUyZmQ3ZCIsImlhdCI6MTU5ODM0OTA4MywiZXhwIjoxNjAwOTQxMDgzfQ.eY-P6P9JBLIEpOABaGA0Ta6iA20cytX_d2e7oSldfO8",
// };

export class CardUserMP extends Component {
  state = {
    //01.getList
    mpList: [],
    //02.getList[0]
    MpId: null,
    profile_Pic: img1,
    mpName: null,
    description: null,
    //03.updatePicFile
    isNewPic: false,
    profilePicUpload: null,
    //04.ResetData_Option
    profile_Pic_OLD: img1,
    mpName_OLD: null,
    description_OLD: null,
    //05.Loading
    isLoading: false,
    moreDataStatus: true,
    page: 1,
  };

  componentWillMount() {
    this.getAllMpList();
  }

  getAllMpList() {
    if (this.state.mpList.length == 0) {
      this.setState({ isLoading: true });
    }

    const requestOptions = {
      method: "GET",
    };

    fetch(
      apiUrl + "mp-profiles?page=" + this.state.page.toString(),
      requestOptions
    )
      .then((res) => res.json())
      .then((json) => {
        if (this.state.mpList.length == 0) {
          this.setState({ isLoading: false });
        }

        if (json.success === true) {
          let newMpList = this.state.mpList.concat(json.data);

          this.setState({
            mpList: newMpList,
          });

          if (json.data.length < 25) {
            this.setState({ moreDataStatus: false });
          }

          this.setState({
            MpId: json.data[0]._id,
            mpName: json.data[0].name,
            description: json.data[0].description,
            profile_Pic: json.data[0].profilePic,
            //Reset Option
            mpName_OLD: json.data[0].name,
            description_OLD: json.data[0].description,
            profile_Pic_OLD: json.data[0].profilePic,
          });
          this.setState({ isLoading: false });
        } else {
          alert("Error searching MP!");
        }
      });
  }

  SelectMP(id, name, description, profilePic) {
    this.setState({
      MpId: id,
      mpName: name,
      description: description,
      profile_Pic: profilePic,
      mpName_OLD: name,
      description_OLD: description,
      profile_Pic_OLD: profilePic,
    });
    window.scrollTo(0, 0);
  }

  profilePicSelected = (event) => {
    if (event.target.files[0]) {
      this.setState({
        profile_Pic: URL.createObjectURL(event.target.files[0]),
        profilePicUpload: event.target.files[0],
        isNewPic: true,
      });
    }
  };
  changeContent = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitData = (event) => {
    event.preventDefault();
    //console.log("Uploading Start");
    this.setState({
      isUploading: true,
    });
    const dataBody = new FormData();
    if (this.state.mpName != this.state.mpName_OLD) {
      dataBody.append("name", this.state.mpName);
    }
    if (this.state.description != this.state.description_OLD) {
      dataBody.append("description", this.state.description);
    }
    if (this.state.profilePicUpload != null) {
      dataBody.append("image", this.state.profilePicUpload);
    }

    const putOptions = {
      headers: {
        Authorization: "Bearer " + this.props.userToken,
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .put(apiUrl + "mp-profiles/" + this.state.MpId, dataBody, putOptions)
      .then(
        (response) => {
          this.setState({
            isUpLoading: false,
          });
          //console.log(response);
          //console.log("Uploading End && Sucess");
          this.getAllMpList();
        },
        (error) => {
          this.setState({
            isUploading: false,
          });
          alert("Connection Error!");
        }
      );
  };

  undoData = () => {
    this.setState({
      mpName: this.state.mpName_OLD,
      description: this.state.description_OLD,
      profile_Pic: this.state.profile_Pic_OLD,
    });
  };

  deleteMP = () => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${this.props.userToken}`,
      },
    };
    fetch(apiUrl + "mp-profiles/" + this.state.MpId, requestOptions)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          this.getAllMpList();
          alert("MP Profile Deleted!");
          //console.log(json);
        } else {
          //console.log(json);
          console.log(json);
          alert("Error in Delete data!");
        }
      });
  };

  fetchMoreData = () => {
    this.setState({ page: this.state.page + 1 });
    this.getAllMpList();
  };

  render() {
    return (
      <div>
        {this.state.isLoading ? (
          <div
            className="container justify-content-center"
            style={{ paddingTop: "50px" }}
          >
            <ReactLoading
              type={"spin"}
              color={"black"}
              height={50}
              width={50}
            />
          </div>
        ) : (
          <div className="row">
            <div className="card col-md-6" style={{ padding: "20px" }}>
              <h3 style={{ marginBottom: "15px" }}>All MPs</h3>

              <InfiniteScroll
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
                <div className="">
                  {this.state.mpList.map((MP) => (
                    <div>
                      <label
                        className="fluid"
                        style={{ paddingTop: "10px" }}
                        onClick={() =>
                          this.SelectMP(
                            MP._id,
                            MP.name,
                            MP.description,
                            MP.profilePic
                          )
                        }
                      >
                        {MP.name}
                      </label>
                    </div>
                  ))}
                </div>
              </InfiniteScroll>
            </div>
            <div className="col-md-6 justify-content-center">
              <div className="card" style={{ padding: "20px" }}>
                <img
                  className="img-fluid rounded-circle w-50 mx-auto mt-3 mb-3"
                  src={this.state.profile_Pic}
                  alt="Card image cap"
                />
                <div
                  className="row mx-auto"
                  style={{ marginTop: "5px", marginBottom: "5px" }}
                >
                  <input
                    type="file"
                    style={{ display: "none" }}
                    onChange={this.profilePicSelected}
                    ref={(fileInput) => (this.fileInput = fileInput)}
                  ></input>
                  <div className="col d-flex justify-content-center">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => this.fileInput.click()}
                    >
                      <FaEdit style={{ marginRight: "10px" }} />
                      Change Photo
                    </button>
                  </div>
                </div>
                <form onSubmit={this.submitData}>
                  <div
                    className="form-group blue-border text-center"
                    style={{ marginBottom: "0px" }}
                  >
                    <label>
                      Name:
                      <input
                        className="form-control shadow"
                        placeholder={"MP name..."}
                        value={this.state.mpName}
                        name="mpName"
                        onChange={this.changeContent}
                      ></input>
                    </label>
                  </div>
                  <div
                    className="form-group blue-border text-center"
                    style={{ marginBottom: "10px" }}
                  >
                    <label style={{ width: "100%" }}>
                      Description:
                      <textarea
                        className="form-control shadow"
                        placeholder={"MP Description..."}
                        value={this.state.description}
                        name="description"
                        rows="5"
                        onChange={this.changeContent}
                      ></textarea>
                    </label>
                  </div>
                  <div className="d-flex justify-content-center flex-wrap">
                    <button
                      type="submit"
                      disabled={
                        this.state.mpName == this.state.mpName_OLD &&
                        this.state.description == this.state.description_OLD &&
                        this.state.profile_Pic == this.state.profile_Pic_OLD
                      }
                      className="btn btn-primary btn-sm"
                      style={{ marginBottom: "5px" }}
                    >
                      Save changes
                    </button>
                    <button
                      type="button"
                      disabled={
                        this.state.description == this.state.description_OLD &&
                        this.state.mpName == this.state.mpName_OLD &&
                        this.state.profile_Pic == this.state.profile_Pic_OLD
                      }
                      className="btn btn-primary btn-sm"
                      style={{ marginLeft: "10px", marginBottom: "5px" }}
                      onClick={this.undoData}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  style={{ marginBottom: "10px", marginTop: "20px" }}
                  onClick={() => this.deleteMP()}
                >
                  Delete MP Profile
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default CardUserMP;
