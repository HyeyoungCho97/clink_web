import React from 'react'
import Logo from "../../assets/maru.jpg";
import "../../styles/PostComment.scss";

export default function PostComment({comment}) {
  const { commentId, boardNo, boardCategoryNo, commentWriter, commentDate, commentContent } = comment || {};
  return (
    <>
        <br />
        <div className="CommunityPost">
          <div className="CommunityPostProfile">
            <div className="CommunityPostProfileImg">
              <img src={Logo} alt="Profile" />
            </div>
            <div className="CommunityPostProfileText">
              <p className="CommunityPostProfileNickname">{commentWriter}</p>
              <p className="CommunityPostProfileTime">{commentDate}</p>
            </div>
          </div>
          <br />
          <div className="CommunityPostContent">{commentContent}</div>
          <br />
        </div>
    </>
  )
}
