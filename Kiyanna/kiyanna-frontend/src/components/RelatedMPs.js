//Related MPs component
import React from "react";
import MPthumb from "./MPthumb";

// function RelatedMPs() {
//   return (
//     <div className="card m-1">
//       <div className="card-body">
//         <h5 className="card-title">Related MPs</h5>
//         <div className="d-flex flex-wrap justify-content-around">
//           {/* <div className="col-4" style={{ padding: "0px" }}> */}
//           <MPthumb
//             mpFname="Mahinda"
//             mpLname="Rajapakshe"
//             mpLink="#"
//             rating={4.5}
//           />
//           {/* </div> */}
//           {/* <div className="col-4" style={{ padding: "0px" }}> */}
//           <MPthumb
//             mpFname="Chandana"
//             mpLname="Rajapakshe"
//             mpLink="#"
//             rating={4.2}
//           />
//           {/* </div> */}
//           {/* <div className="col-4" style={{ padding: "0px" }}> */}
//           <MPthumb mpFname="Namal" mpLname="Rajapakshe" mpLink="#" rating={4} />
//           {/* </div> */}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RelatedMPs;

// { MpData1, MpData2, MpData3 }

function RelatedMPs({ MpData1, MpData2, MpData3 }) {
  return (
    <div className="card m-1">
      <div className="card-body">
        <h5 className="card-title">Related MPs</h5>
        <div className="row justify-content-around">
          
          <div className="col-4">
            <div className="card" style={{height:"130px"}}>
              <MPthumb
                mpFname={MpData1.name}
                mpLname={""} ///////
                mpLink={"#"}
                rating={MpData1.averageRating.toFixed(1)}
                mpImg={MpData1.profilePic}
                id={MpData1.id}
              />
            </div>
          </div>
          
          <div className="col-4">
            <div className="card" style={{height:"130px"}}>
              <MPthumb
                mpFname={MpData2.name}
                mpLname={""} ///////
                mpLink={"#"}
                rating={MpData2.averageRating.toFixed(1)}
                mpImg={MpData2.profilePic}
                id={MpData2.id}
              />
            </div>
          </div>
          
          <div className="col-4">
            <div className="card" style={{height:"130px"}}>
              <MPthumb
                mpFname={MpData3.name}
                mpLname={""} ///////
                mpLink={"#"}
                rating={MpData3.averageRating.toFixed(1)}
                mpImg={MpData3.profilePic}
                id={MpData3.id}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default RelatedMPs;
