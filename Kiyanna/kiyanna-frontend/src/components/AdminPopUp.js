import React, { Component } from "react";
import { Modal } from "react-bootstrap";

export class AdminPopUp extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <Modal
          show={this.state.popModal}
          size="sm"
          className="My-modal"
          style={{ alignItems: "center", justifyContent: "center" }}
        ></Modal>
        <div></div>
      </div>
    );
  }
}

export default AdminPopUp;
