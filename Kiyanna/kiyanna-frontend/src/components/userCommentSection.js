//Comment feed ??
import React, { Component } from "react";
import CommentCard from "./CommentCard";

import { connect } from "react-redux";
import { addLike } from "../store/ideaListRedux";

class UserCommentSection extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  //props userToken, Name(MP), mpID
  //5eda53df2258615c7079ad2c  - mpID
  // componentDidMount() {
  //   fetch(`http://localhost:4000/api/v1/mp-profiles/${this.props.mpID}`, {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${this.props.userToken}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((json) => {
  //       this.setState({
  //         ideas: json.data.ideas,
  //         isSuccess: json.sucess,
  //       });
  //     });
  // }
  renderNoIdeas = () => {
    if (this.props.ideaList.length === 0) {
      return (
        <h4 style={{ marginTop: "200px", marginLeft: "30%", color: "gray" }}>
          No Ideas Yet
        </h4>
      );
    }
  };

  render() {
    return (
      <div className="Comment-section">
        {this.renderNoIdeas()}
        {this.props.ideaList.map((idea, index) => {
          return (
            <CommentCard
              key={idea.id}
              mpName={idea.mp_profile.name}
              userName={this.props.Name}
              idea={idea}
              userLink="#"
              comment={idea.idea}
              nLikes={idea.likes}
              isSigned={this.props.isSigned}
              createdAt={""}
            />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ideaList: state.ideaListRedux.ideaList,
  };
};

export default connect(mapStateToProps, null)(UserCommentSection);


