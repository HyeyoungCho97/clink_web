import React, { useState } from 'react'
import Logo from "../../assets/maru.jpg";
import "../../styles/community/PostComment.scss";
import { ThreeDotsVertical } from 'react-bootstrap-icons';
import AdditionalButtonforComment from './AdditionalButtonforComment';

export default function PostComment({comment}) {
  const { comment_id, board_no, comment_content, register_id, register_datetime, parent_id } = comment || {};
  const [isMine, setIsMine] = useState(true);
  const [view, setView] = useState(false);
  

  return (
    <>
        <br />
        <div className="CommunityPost">
          <div className="CommunityPostProfile">
            <div className="CommunityPostProfileImg">
              <img src={Logo} alt="Profile" />
            </div>
            <div className="CommunityPostProfileText">
              <p className="CommunityPostProfileNickname">{register_id}</p>
              <p className="CommunityPostProfileTime">{register_datetime}</p>
            </div>
          </div>
          <div className="menu">
            {isMine &&
              <ThreeDotsVertical
                onClick={(event) => {
                  event.stopPropagation();
                  setView(!view);
                  console.log("click");
                }}
              />
            }
              {view && (
                <AdditionalButtonforComment target_comment_id={comment_id}></AdditionalButtonforComment>
              )}
            </div>
          <br />
          <div className="CommunityPostContent">{comment_content}</div>
          <br />
        </div>
    </>
  )
}
