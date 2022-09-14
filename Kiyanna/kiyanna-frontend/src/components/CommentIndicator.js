//Indicates no. of comments ...
//... for the selected MP
import React from "react";
import { FaComment } from "react-icons/fa";

//----------Styling----------\\
const commentIndicator = {
  display: "flex",
};

const commentIndicator_a = {
  // flex: '1',
  fontSize: "15px",
  //float: 'left',
  width: "50%",
  padding: "5px",
  textAlign: "center",
};

const commentIndicator_b = {
  float: "left",
  padding: "5px",
  textAlign: "center",
};
//----------------------------\\

function CommentIndicator({ nComments }) {
  return (
    <div className="container-fluid" style={{ margin: "5px" }}>
      <div className="row mx-auto">
        <div className="col-md-6 mx-auto d-flex justify-content-center">
          <FaComment />
        </div>
        <div className="col-md-6 d-flex justify-content-center text-center">
          {nComments || 0} Comments
        </div>
      </div>
    </div>
  );
}

export default CommentIndicator;

// function CommentIndicator({ nComments }) {
//     return (
//         <div style={commentIndicator}>
//             <div style={commentIndicator_a}>
//                 <FaComment />
//                 {nComments}
//             </div>
//             <div style={commentIndicator_b}>
//                 Comments
//             </div>
//         </div>
//     )
// }

// export default CommentIndicator
