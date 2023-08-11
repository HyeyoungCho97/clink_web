import React, { useEffect, useState } from "react";
import Logo from "../../assets/maru.jpg";
import "../../styles/community/PostComment.scss";
import { ThreeDotsVertical } from "react-bootstrap-icons";
import AdditionalButtonforComment from "./AdditionalButtonforComment";

export default function PostComment({ comment, parentCommentId, setParentCommentId }) {
  const {
    comment_id,
    board_no,
    comment_content,
    register_id,
    register_datetime,
    parent_id,
  } = comment || {};
  const [view, setView] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [isMine, setIsMine] = useState(false);
  

  useEffect (() => {
    if(comment_id !== parent_id) {
      setIsReply(true);
    }
    if (register_id === sessionStorage.user_id) {
        setIsMine(true);
      }
  }, [])
  

  return (
    <>
      <div className="CommunityPost" style={{ backgroundColor: parentCommentId === comment_id ? "#cfe2ff" : isReply ? "#f8f9fa" : "#FFFFFF"}}>
      <br />
        <div className="CommunityPostProfile">
          <div className="CommunityPostProfileImg">
            <img src={Logo} alt="Profile" />
          </div>
          <div className="CommunityPostProfileText">
            <p className="CommunityPostProfileNickname">{register_id}</p>
            <p className="CommunityPostProfileTime">{register_datetime}</p>
          </div>
          <div className="menu">
            {!(!isMine && isReply) &&
            <ThreeDotsVertical
              onClick={(event) => {
                event.stopPropagation();
                setView(!view);
                console.log("click");
              }}
            />
            }

            {view && (
              <AdditionalButtonforComment
                target_comment_id={comment_id}
                register_id={register_id}
                parentCommentId={parentCommentId}
                setParentCommentId={setParentCommentId}
                isReply = {isReply}
                isMine={isMine}
              ></AdditionalButtonforComment>
            )}
          </div>
        </div>
        <br />
        <div className="CommunityPostContent">{comment_content}</div>
        <br />
      </div>
    </>
  );
}