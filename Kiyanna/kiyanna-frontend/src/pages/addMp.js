import React, { Component } from "react";
import "./home.css";
import Users from "../components/Users";
import axios from "axios";
import CardUserMP from "../components/CardUserMP";
import Cookies from "universal-cookie";
//import AddMp from '../components/AddMp';
const apiUrl = "https://kiyanna.world/api/v1/";

// const skyData = {
//   //Consists of Bazil rajapakshe's details
//   //We tke this data from somewhere else
//   userToken:
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNDRkZDhmNmI1YWNlNDkwMGUyZmQ3ZCIsImlhdCI6MTU5ODM0OTA4MywiZXhwIjoxNjAwOTQxMDgzfQ.eY-P6P9JBLIEpOABaGA0Ta6iA20cytX_d2e7oSldfO8",
// };

const cookies = new Cookies();

class addMp extends Component {
  state = {
    mpName: "",
    description: "",
    selectedFile: null,
    isSending: false,
    isSigned: false,
    token: "",
  };

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
    //console.log(process.env.config);
  }

  componentDidMount() {
    // skyData.userToken = this.state.userToken;
  }

  fileSelectedHandler = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  submitMP = () => {
    if (this.state.mpName && this.state.description) {
      this.createMpProfile();
    } else {
      alert("Please Fill All the Fields");
    }
  };

  createMpProfile() {
    this.setState({ isSending: true });
    let body = new FormData();
    body.append("name", this.state.mpName);
    body.append("description", this.state.description);
    body.append("image", this.state.selectedFile, this.state.selectedFile.name);
    const options = {
      headers: {
        Authorization: `Bearer ${this.state.token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post(
        apiUrl + `mp-profiles`, //url for POSTing Mp ideas
        body,
        options
      )
      .then(
        (response) => {
          this.setState({ isSending: false });
          if (response.data.success) {
            alert("Successfully submitted your MP!");
          } else {
            alert("Error while submitting your MP!");
          }
        },
        (error) => {
          this.setState({ isSending: false }); //an error encountered
          this.setState({ isFail: true });
          alert("Error while submitting your idea!");
        }
      );
  }

  changeMpName = (event) => {
    this.setState({ mpName: event.target.value });
  };

  changeDescription = (event) => {
    this.setState({ description: event.target.value });
  };

  render() {
    return (
      <div className="row align-items-top align-middle margin-top: my-5 ">
        <div className="col-lg-3">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <h5 className="card-title font-weight-bold">Create MP</h5>

                  <input type="file" onChange={this.fileSelectedHandler} />

                  <input
                    type="text"
                    className="form-control mt-2"
                    placeholder="MP Name"
                    required
                    value={this.state.mpName}
                    onChange={this.changeMpName}
                  />

                  <input
                    type="text"
                    className="form-control mt-2"
                    placeholder="Description"
                    required
                    autofocus
                    value={this.state.description}
                    onChange={this.changeDescription}
                  />

                  <button
                    type="submit"
                    disabled={this.state.isSending}
                    className="btn btn-primary btn-sm mt-3"
                    onClick={this.submitMP}
                  >
                    {this.state.isSending ? `Submitting...` : `Create`}
                  </button>
                </div>
                <div className="col-md-6"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-9">
          <CardUserMP userToken={this.state.token} />
        </div>
      </div>
    );
  }
}

export default addMp;
