//A single comment card component in the commentSection
import React, { useState } from "react";
import LikeButtonHook from "./LikeButtonHook";

//----------Styling----------\\
const likeButtonArea = {
  display: "flex",
  justifyContent: "flex-start",
};

const likeButtonArea_a = {
  margin: "5px",
};

const likeButtonArea_b = {
  margin: "5px",
};
//----------------------------\\

function CommentCard({
  mpName,
  userName,
  userLink,
  comment,
  nLikes,
  idea,
  isSigned,
  createdAt,
}) {
  return (
    <div className="Comment-card">
      <div>
        <a href={userLink}>{userName}</a> @
        <span style={{ fontWeight: "bold", marginLeft:4 }}>{mpName}</span>
      </div>
      
      <p>{comment}</p>
      <div style={likeButtonArea}>
        <div style={likeButtonArea_a}>
          <LikeButtonHook idea={idea} isSigned={isSigned} />
        </div>
        <div style={{ marginTop: "8px", marginLeft: "5px" }}>{nLikes}</div>
        <div className="ml-auto">
          <h6 style={{ fontSize: "12px", padding: "0px", marginTop: "15px" }}>
            {createdAt.slice(0, 10)} at {createdAt.slice(-12, -5)}
          </h6>
          {/* <h6  style={{fontSize:"10px",padding:"0px"}}>{idea.createdAt.slice(-12,-5)}</h6> */}
        </div>
      </div>
    </div>
  );
}

export default CommentCard;
