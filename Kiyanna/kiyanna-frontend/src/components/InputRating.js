//Component to get user's rating ...
//... about the selected MP
import React from "react";
import RateBarHook from "./RateBarHook";

//----------Styling----------\\
const inputRating = {
  display: "flex",
  margin: "5px",
};

const inputRating_a = {
  fontSize: "15px",
  width: "50%",
  padding: "5px",
  textAlign: "center",
};

const inputRating_b = {
  fontSize: "15px",
  width: "50%",
  padding: "5px",
  textAlign: "center",
};
//----------------------------\\

function InputRating({ mpfName, mplName }) {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <div className="row mx-auto">
            <div className="col d-flex justify-content-center">
              <RateBarHook />
            </div>
          </div>
          <div className="row mx-auto">
            <div className="col d-flex justify-content-center text-center">
              Rate {`${mpfName} ${mplName}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputRating;

// function InputRating({ mpfName, mplName }) {
//     return (
//         <div className={inputRating}>
//             <div className={inputRating_a}>
//                 <RateBarHook />
//             </div>
//             <div className={inputRating_b}>
//                 Rate {`${mpfName} ${mplName}`}
//             </div>
//         </div>
//     )
// }

// export default InputRating
