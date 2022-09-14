// Used to display rating of the ...
//... selected MP

import React from "react";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";

//----------Styling----------\\
const ratingIndicator = {
  display: "flex",
};

const ratingIndicator_a = {
  // flex: '1',
  //   fontSize: "15px", //actually the star symbol size
  //float: 'left',
  width: "50%",
  padding: "5px",
  textAlign: "center",
};

const ratingIndicator_b = {
  // flex: '1'
  //float: 'left',
  width: "50%",
  padding: "5px",
  textAlign: "center",
};
//---------------------------\\

function RatingIndicator({ rating }) {
  let ratingVal = parseFloat(rating) || 0; //if rating is undefined (unavailable), we give default value 0
  let nFull = Math.floor(ratingVal);
  let nHalf;
  ratingVal - nFull >= 0.4 ? (nHalf = 1) : (nHalf = 0);

  return (
    <div className="container-fluid" style={{ margin: "5px" }}>
      <div className="row mx-auto">
        <div className="col-md-6 d-flex justify-content-center">
          {[...Array(nFull)]
            .map((item, index) => {
              return <FaStar key={index} style={{ color: "gold" }} />;
            })
            .concat(
              [...Array(nHalf)].map((item, index) => {
                return <FaStarHalf key={5} style={{ color: "gold" }} />;
              })
            )}
        </div>
        <div className="col-md-6 d-flex justify-content-center text-center">
          {Math.round(ratingVal * 10) / 10} Ratings
        </div>
      </div>
    </div>
  );
}

export default RatingIndicator;

// function RatingIndicator({ rating }) {
//     let nFull = Math.floor(rating);
//     let nHalf;
//     rating - nFull >= 0.4 ? (nHalf = 1) : (nHalf = 0);

//     return (
//       <div style={ratingIndicator}>
//         <div style={ratingIndicator_a}>
//           {[...Array(nFull)]
//             .map((item, index) => {
//               return <FaStar key={index} />;
//             })
//             .concat(
//               [...Array(nHalf)].map((item, index) => {
//                 return <FaStarHalf key={5} />;
//               })
//             )}
//         </div>
//         <div style={ratingIndicator_b}>
//           {Math.round(rating * 10) / 10} Ratings
//         </div>
//       </div>
//     );
//   }

//   export default RatingIndicator;
