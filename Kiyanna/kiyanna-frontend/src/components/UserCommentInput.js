//comment input area
import React, { Component } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import "./SignInPopUp.css";
import {connect} from 'react-redux';
import {addIdeaList} from '../store/ideaListRedux';

const apiUrl = "https://kiyanna.world/api/v1/";

export class UserCommentInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName:'',
      message: "",
      isSending: false, //to rerender submit button during submission
      popModal: false, //used to pop-up the modal when the user tries to post a comment without signing in
    };
  }

  changeContent = (event) => {
    this.setState({ message: event.target.value });
  };

  submitComment = (event) => {
    if (this.props.isSigned) {
      event.preventDefault();
      this.setState({
        isSending: true,
        isFail: false,
      });
      const options = {
        //custom header
        headers: {
          Authorization: `Bearer ${this.props.userToken}`, /////////////////////////////////
          "Content-Type": "application/json",
        },
      };

      axios
        .post(
          apiUrl + `mp-profiles/${this.props.mpID}/ideas`, //url for POSTing Mp ideas
          {
            idea: this.state.message,
          },
          options
        )
        .then(
          (response) => {
            this.setState({ isSending: false });
            //console.log("Fuck",response.data);
            if (response.data.success) {
              this.setState({
                //idea was successfully uploaded
                message: "",
                isFail: false,
              });

              
              const incomeIdea = response.data.data[0];
              let ideaList = this.props.ideaList;
              const newIdea = {
                _id: incomeIdea.id,
                createdAt: incomeIdea.createdAt,
                id: incomeIdea.id,
                idea: incomeIdea.idea,
                isApproved: false,
                isLiked: false,
                isMpFollowed: false,
                likes: 0,
                mp_profile: {
                    _id: incomeIdea.mp_profile,
                    id: incomeIdea.mp_profile,
                    name: incomeIdea.mpProfile
                },
                user: {
                   
                    anonymous: this.props.isAnonymous,
                    name: response.data.userName
                }
              }

              ideaList.push(newIdea);
              this.props.addIdeaList([]);
              this.props.addIdeaList(ideaList);
              //console.log("ida list ekaa",this.props.ideaList);
              alert("Successfully submitted your idea!");
            } else {
              //Backend returned success:false
              this.setState({
                isFail: true,
              });
              alert("Error while submitting your idea!");
            }
          },
          (error) => {
            this.setState({ isSending: false }); //an error encountered
            this.setState({
              isFail: true,
            });
            alert("Error while submitting your idea!");
          }
        );
    } else {
      // alert("Please Signin before Kiyanna...");
      event.preventDefault();
      this.setState({
        popModal: true,
      });
    }
  };

  handleUserKeyPress = (event) => {
    //When user presses Enter, form gets submitted
    if (this.state.message && event.key === "Enter" && !event.shiftKey) {
      this.submitComment(event);
    }
  };

  //------------------------ To close the Popup ----------------------------\\
  ClosePopUp = () => {
    this.setState({
      popModal: false,
    });
  };

  render() {
    return (
      <div>
        {/* Display thtis Modal if the user tries to post an Idea before signing in */}
        <Modal show={this.state.popModal} size="sm" className="My-modal">
          <div className="container-fluid" style={{ padding: "7px" }}>
            <div className="row m-1">
              <div className="col text-center">
                Please sign in to post an idea!
              </div>
            </div>
            <div className="row m-1">
              <div className="col-6 d-flex justify-content-end">
                <div>
                  <a href="https://kiyanna.world/login">
                    <button className="btn btn-primary btn-sm">Sign In</button>
                  </a>
                </div>
              </div>
              <div className="col-6 d-flex justify-content-start">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={this.ClosePopUp}
                >
                  Later
                </button>
              </div>
            </div>
          </div>
        </Modal>
        {/* End of the Modal */}

        <form onSubmit={this.submitComment}>
          <div className="form-group blue-border">
            <label className="d-flex">
              <textarea
                className="form-control shadow"
                placeholder={
                  !this.props.isSigned
                    ? `Kiyanna...`
                    : `Kiyanna as ${(this.props.isAnonymous)? 'Anonymous':this.props.userName}`
                }
                value={this.state.message}
                onChange={this.changeContent}
                rows="5"
                onKeyPress={this.handleUserKeyPress} /////
              ></textarea>
            </label>
          </div>
          <div className="d-flex justify-content-end">
            <button
              type="submit"
              disabled={!this.state.message || this.state.isSending}
              className="btn btn-primary btn-sm"
            >
              {this.state.isSending ? `Submitting...` : `Kiyanna`}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ideaList: state.ideaListRedux.ideaList,
    isAnonymous: state.userDetailsRedux.isAnonymous,
    userName: state.userDetailsRedux.userName
  };
};

const mapDispatchToProps = (dispatch) => {
  return{
    addIdeaList:(item) =>dispatch(addIdeaList(item)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserCommentInput);


// fetch(, requestOptions).then(
//   (response) => {
//     console.log(response);
//     this.setState({ isSending: false });
//   }
// );
// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjA3NTY0YmZhOTkzMmM5ODNlZDI5YyIsImlhdCI6MTU5NTk2MjcyNSwiZXhwIjoxNTk4NTU0NzI1fQ.8sPCSn7o6Vt2Pv865cc4ieKOA2MCaJvBVnKK5L0VbYk
// "https://jsonplaceholder.typicode.com/posts"

// const requestOptions = {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({ title: "React POST Request Example" }),
// };

// render() {
//     return (
//         <div className="Comment-box">
//             <form className="Comment-input">
//                 <textarea type="text" value={this.state.message} placeholder="Kiyanna balanna..."
//                     className="Comment-input-textarea"
//                     onChange={this.changeContent} />
//             </form>
//             <div className="Comment-input-buttonarea">
//                 <button className="My-button"> Kiyanna </button>
//             </div>
//         </div>
//     )
// }
