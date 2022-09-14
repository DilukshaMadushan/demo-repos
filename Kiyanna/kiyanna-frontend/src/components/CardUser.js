//Need to code API requests to change follow/unfollow status

import React, { Component } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";

/////////////
import img1 from "../assets/person.jpg";
/////////////
import { connect } from 'react-redux';
import { addUserName } from '../store/userDetailsRedux';

// import { FaUserEdit } from "react-icons/fa";

// import Rating from '@material-ui/lab/Rating';
import Cookies from "universal-cookie";
const cookies = new Cookies();
const apiUrl = 'https://kiyanna.world/api/v1/';


export class CardUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isFollowing: this.props.isFollow,
      // isRate: this.props.isRated || false,
      // myRate: this.props.myRate,
      // rateCount: this.props.rateCount,
      // dataCame: false,
      name: this.props.name, //new state vars
      //eMail: this.props.eMail, //new state vars
      city: this.props.city, //new state vars
      profilePic: this.props.profilePic, //new state vars ----------------------------
      token: "", //new state vars
      userID: "",

      nameOld: this.props.name, //old states
      //eMailOld: this.props.eMail, //old states
      cityOld: this.props.city, //old states
      profilePicOld: this.props.profilePic, //old states

      isNewPic: false,
      profilePicUpload: null,
      isUploading: false, //to check whether a new pic is uploaded
    };
  }
  
  componentWillMount() {
    if (this.props.isSigned) {
      const token = cookies.get("token");
      const userId = cookies.get("id");
      this.setState({ token: token, userID: userId });
      //console.log("fuckkkkkkkkkk",this.state.userID)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isFollowing: nextProps.isFollow,
      isRate: nextProps.isRated,
      myRate: nextProps.myRate,
      rateCount: nextProps.rateCount,
      dataCame: true,
    });
  }

  //---------------------------My methods------------------------------\\
  submitData = (event) => {
    //API to change user's data
    // if(this.props.isSigned)  --------------complete this----------------------------------------------------------------------------------
    event.preventDefault();
    //console.log("geh");
    //console.log(this.state);
    this.setState({
      isUploading: true,
    });

    const dataBody = new FormData();
    //Check whether the data is actually updated
    if (this.state.name != this.state.nameOld) {
      dataBody.append("name", this.state.name);
    }
    // if (this.state.eMail != this.state.eMailOld) {
    //   dataBody.append("email", this.state.eMail);
    // }
    if (this.state.city != this.state.cityOld) {
      dataBody.append("city", this.state.city);
    }
    // if (this.state.profilePic != this.state.profilePicOld) {
    if (this.state.profilePicUpload != null) {
      dataBody.append(
        "image",
        this.state.profilePicUpload,
        this.state.profilePicUpload.name
      );
      // dataBody.append("profilePic_URL", this.state.profilePicUpload);
    }
    //console.log("databody");
    for (var key of dataBody.entries()) {
      //console.log(key[0] + ", " + key[1]);
    }

    const putOptions = {
      //custom header
      headers: {
        //this.state.token denna ona hode..
        Authorization: 'Bearer '+this.props.token, /////////////////////////////////
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .put(
        //this.state.userID denna ona hode..
        apiUrl+'user-profiles/'+this.props.userId,
        dataBody, // form-data we are sending
        putOptions
      )
      .then(
        (response) => {
          this.setState({
            isUploading: false,
          });
          if (response.data.success) {
            //console.log("response");
            //console.log(response.data);
            this.setState({
              nameOld: this.state.name,
              // eMailOld: this.state.eMail,
              cityOld: this.state.city,
              profilePicOld: this.state.profilePic,
              isNewPic: false,
              profilePicUpload: null,
            });
            
            cookies.set('profilePic_URL', response.data.data.profilePic_URL, { path: '/' ,domain : 'kiyanna.world', secure:true});
            cookies.set('username', response.data.data.name, { path: '/',domain : 'kiyanna.world', secure:true });
            this.props.addUserName(response.data.data.name);
            //console.log("redda",response.data.data);
            alert("User data successfully updated!");
            window.location.reload(true);
          } else {
            alert("Error updating data!");
          }
        },
        (error) => {
          this.setState({
            isUploading: false,
          });
          alert("Connection Error!");
        }
      );
  };

  changeContent = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  profilePicSelected = (event) => {
    //user uploads new profilePic
    if (event.target.files[0]) {
      this.setState(
        {
          profilePic: URL.createObjectURL(event.target.files[0]),
          // profilePicUpload: URL.createObjectURL(event.target.files[0]),
          profilePicUpload: event.target.files[0],
          isNewPic: true,
        }
        // console.log(event.target.files[0])
      );
    }
  };

  undoData = () => {
    this.setState({
      name: this.state.nameOld,
      // eMail: this.state.eMailOld,
      city: this.state.cityOld,
      profilePic: this.state.profilePicOld,
      isNewPic: false,
    });
  };

  //--------------------------------------------------------------------\\

  render() {
    // const { userPic, userName, userEmail, userCity } = this.props;

    return (
      <div className="card m-1" style={{ fontSize: "0.75rem" }}>
        <img
          className="img-fluid rounded-circle w-75 mx-auto mt-3 mb-3"
          src={(this.state.profilePic==='no-photo.jpg')?img1:this.state.profilePic}
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
          {/* get user's upload to the state */}
          <div className="col d-flex justify-content-center">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => this.fileInput.click()}
            >
              {/* <i class="far fa-user pr-2" aria-hidden="true"></i> */}
              <FaEdit style={{ marginRight: "10px" }} />
              {/* <FaUserEdit style={{ marginRight: "10px" }} /> */}
              Change Photo
            </button>
          </div>
        </div>
        <div className="card-body">
          <h5 className="card-title">Your Profile</h5>
        </div>

        <div
          className="row mx-auto"
          style={{ marginTop: "5px", marginBottom: "5px" }}
        >
          <div className="col d-flex justify-content-center">
            <form onSubmit={this.submitData}>
              <div
                className="form-group blue-border"
                style={{ marginBottom: "0px" }}
              >
                <label>
                  Name:
                  <input
                    className="form-control shadow"
                    placeholder={"Your name..."}
                    value={this.state.name}
                    name="name"
                    onChange={this.changeContent}
                  ></input>
                </label>
              </div>
              {/* <div
                className="form-group blue-border"
                style={{ marginBottom: "0px" }}
              >
                <label>
                  E-mail:
                  <input
                    className="form-control shadow"
                    placeholder={"Your E-mail..."}
                    value={this.state.eMail}
                    name="eMail"
                    onChange={this.changeContent}
                  ></input>
                </label>
              </div> */}
              <div className="form-group blue-border">
                <label>
                  City:
                  <input
                    className="form-control shadow"
                    placeholder={"Your City..."}
                    value={this.state.city}
                    name="city"
                    onChange={this.changeContent}
                  ></input>
                </label>
              </div>
              <div className="d-flex justify-content-end flex-wrap">
                <button
                  type="submit"
                  disabled={
                    //disable "save changes" if any input is blank, or no input is changed
                    this.state.name == "" ||
                    // this.state.eMail == "" ||
                    this.state.city == "" ||
                    (this.state.name == this.state.nameOld &&
                      // this.state.eMail == this.state.eMailOld &&
                      this.state.city == this.state.cityOld &&
                      this.state.profilePic == this.state.profilePicOld)
                  }
                  className="btn btn-primary btn-sm"
                  style={{ marginBottom: "5px" }}
                >
                  {this.state.isUploading ? "Uploading..." : "Save changes"}
                </button>
                <button
                  type="button"
                  disabled={
                    //disable "cancel" if no data is changed
                    this.state.name == this.state.nameOld &&
                    // this.state.eMail == this.state.eMailOld &&
                    this.state.city == this.state.cityOld &&
                    this.state.profilePic == this.state.profilePicOld
                  }
                  className="btn btn-primary btn-sm"
                  style={{ marginLeft: "10px", marginBottom: "5px" }}
                  onClick={this.undoData}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addUserName : (username) => dispatch(addUserName(username))
  };
};

export default connect(null, mapDispatchToProps)(CardUser);


// ------------------------ PUT request using fetch ------------------------\\
// const putOptions = {
//   method: "PUT",
//   headers: {
//     Authorization:
//       "Bearer " +
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjhlNjhmZWM3MDFlMWYzNGMzOTVlYiIsImlhdCI6MTU5NjUxNTk4NCwiZXhwIjoxNTk5MTA3OTg0fQ.hclYKGfjKZQ3K0bYfxG6pwNzsm6ugoZFSuShQ0Nokcc", //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjhlNjhmZWM3MDFlMWYzNGMzOTVlYiIsImlhdCI6MTU5NjUxNTk4NCwiZXhwIjoxNTk5MTA3OTg0fQ.hclYKGfjKZQ3K0bYfxG6pwNzsm6ugoZFSuShQ0Nokcc this.state.token
//     "Content-Type": "multipart/form-data",
//   },
//   body: dataBody,
// };

// fetch(
//   "http://37.187.189.64:80/api/v1/user-profiles/" +
//     "5f29cc3882829e258c4f8adc", //5f29cc3882829e258c4f8adc this.state.userID
//   putOptions
// )
//   .then((response) => response.json())
//   .then((json) => {
//     // console.log(json);
//     if (json.success) {
//       console.log(json.data);
// this.setState({
//   nameOld: this.state.name,
//   eMailOld: this.state.eMail,
//   cityOld: this.state.city,
//   profilePicOld: this.state.profilePic,
// });
//       alert("User data successfully updated!");
//     } else {
//       alert("Error updating data!");
//     }
// this.setState({
//   isUploading: false,
// });
//   });
