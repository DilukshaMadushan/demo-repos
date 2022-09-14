//Used to display MP ratings as stars without text...
// ... in Related MPs section
import React from "react";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";

//----------Styling----------\\
const ratingIndicator = {
  fontSize: "9px", //actually the star symbol size
  padding: "5px",
  // textAlign: "center",
};
//----------------------------\\

function RatingIndicatorNoText({ rating }) {
  let ratingVal = parseFloat(rating) || 0;
  let nFull = Math.floor(ratingVal);
  let nHalf;
  ratingVal - nFull >= 0.4 ? (nHalf = 1) : (nHalf = 0);

  return (
    <div className="container" style={{ margin: "5px" }}>
      <div className="d-flex flex-grow-0">
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
    </div>
  );
}

export default RatingIndicatorNoText;

// function RatingIndicatorNoText({ rating }) {

//     let nFull = Math.floor(rating)
//     let nHalf
//     rating - nFull >= 0.5 ? nHalf = 1 : nHalf = 0

//     return (
//         <div style={ratingIndicator}>
//             {[...Array(nFull)].map((item, index) => {
//                 return (<FaStar key={index} />)
//             }).concat(
//                 [...Array(nHalf)].map((item, index) => {
//                     return (<FaStarHalf key={5} />)
//                 })
//             )}
//         </div>
//     )
// }

// export default RatingIndicatorNoText
