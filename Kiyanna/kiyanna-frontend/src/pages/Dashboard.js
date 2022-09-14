import React, { Component } from "react";
import "./home.css";
import AdminIdea from "../components/AdminIdea";
import Users from "../components/Users";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";

const apiUrl = "https://kiyanna.world/api/v1/";
// const skyData = {
//   //Consists of Bazil rajapakshe's details
//   //We tke this data from somewhere else
//   userToken:
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNDRkZDhmNmI1YWNlNDkwMGUyZmQ3ZCIsImlhdCI6MTU5ODM0OTA4MywiZXhwIjoxNjAwOTQxMDgzfQ.eY-P6P9JBLIEpOABaGA0Ta6iA20cytX_d2e7oSldfO8",
// };

const cookies = new Cookies();

class Dashboard extends Component {
  state = {
    ideas: [],
    redirect: false,
    adminIdea: "",
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
    this.getAllIdeas();
  }

  getAllIdeas() {
    const requestOptions = {
      method: "GET",
      headers: { Authorization: `Bearer ${this.state.token}` },
    };

    fetch(apiUrl + "ideas/admin", requestOptions)
      .then((res) => res.json())
      .then((json) => {
        if (json.success === true) {
          this.setState({ ideas: json.data });
          console.log(json);
        } else {
          alert(json.error);
        }
      });
  }

  // ----------- add MP -------------------

  renderRedirect = () => {
    if (this.state.redirect) {
      this.setState({ redirect: false });
      return <Redirect to="/home/addMp" />;
    }
  };

  // ---------- Kiyanna to EveryBody -----------------

  onChangeKiyanna = (event) => {
    this.setState({ adminIdea: event.target.value });
  };

  submitAdminIdea = () => {
    if (this.state.adminIdea) {
      this.setState({ isSending: true });
      const options = {
        //custom header
        headers: {
          Authorization: `Bearer ${this.state.token}`, /////////////////////////////////
          "Content-Type": "application/json",
        },
      };

      axios
        .post(
          apiUrl + `mp-profiles/5f44b3fefaf4444051eaa8cc/ideas`, //url for POSTing Mp ideas
          {
            idea: this.state.adminIdea,
          },
          options
        )
        .then(
          (response) => {
            this.setState({ isSending: false });
            if (response.data.success) {
              this.setState({
                //idea was successfully uploaded
                adminIdea: "",
              });
              alert("Successfully submitted!");
            } else {
              //Backend returned success:false
              this.setState({
                //idea was successfully uploaded
                adminIdea: "",
              });
              alert("Error while submitting!!!");
            }
          },
          (error) => {
            this.setState({ isSending: false }); //an error encountered

            alert("Error while submitting!!!");
          }
        );
    }
  };

  kiyannaSubmit = (event) => {
    if (this.state.adminIdea && event.key === "Enter") {
      this.submitAdminIdea();
    }
  };

  render() {
    return (
      <div className="">
        <div className="container-fluid">
          {this.renderRedirect()}
          <div className="row align-items-top align-middle margin-top: my-5 ">
            {/* Profile User */}
            {/* <Users></Users> */}
            <div className="col-lg-3"></div>

            <div className="col-lg-9">
              <div className="row card">
                <div className="card-body">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Kiyanna @ Everybody"
                      value={this.state.adminIdea}
                      onChange={this.onChangeKiyanna}
                      onKeyPress={(e) => this.kiyannaSubmit(e)}
                    />
                    <span className="input-group-append">
                      <button
                        className="btn btn-secondary"
                        type="button"
                        disabled={!this.state.adminIdea || this.state.isSending}
                        onClick={() => this.submitAdminIdea()}
                      >
                        Kiyanna
                      </button>
                    </span>
                  </div>
                </div>
              </div>
              <div
                className="row"
                style={{ marginTop: "10px", display: "flex" }}
              >
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => this.setState({ redirect: true })}
                  style={{ marginLeft: "auto" }}
                >
                  MP profiles!
                </button>
              </div>
              {/* Idea Card component */}

              <AdminIdea
                ideasList={this.state.ideas}
                reload={() => this.getAllIdeas()}
              ></AdminIdea>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
