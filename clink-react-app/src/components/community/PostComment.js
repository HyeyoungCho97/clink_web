import React, { useEffect, useState } from "react";
import "../../styles/community/PostComment.scss";
import { ThreeDotsVertical } from "react-bootstrap-icons";
import AdditionalButtonforComment from "./AdditionalButtonforComment";
import { IoArrowUndoSharp } from "react-icons/io5";
import timestampParse from "../common/timestampParse";
import Logo from "../../assets/pig.png";

export default function PostComment({
  comment,
  parentCommentId,
  setParentCommentId,
}) {
  const {
    comment_id,
    board_no,
    comment_content,
    register_id,
    register_datetime,
    parent_id,
    photo_url,
    user_no,
  } = comment || {};
  const [view, setView] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [isMine, setIsMine] = useState(false);
  const [imgURL, setImgURL] = useState(
    "http://ec2-43-202-97-102.ap-northeast-2.compute.amazonaws.com:8000/images/" +
      photo_url
  );

  useEffect(() => {
    if (comment_id !== parent_id) {
      setIsReply(true);
    }
    if (register_id === sessionStorage.user_id) {
      setIsMine(true);
    }
  }, []);

  return (
    <>
      <div
        className="CommunityPost"
        style={{
          backgroundColor:
            parentCommentId === comment_id
              ? "#cfe2ff"
              : isReply
              ? "#f8f9fa"
              : "#FFFFFF",
        }}
      >
        <br />
        <div className="CommunityPostProfile">
          {isReply ? (
            <IoArrowUndoSharp style={{ transform: "rotate(180deg)" }} />
          ) : (
            <></>
          )}
          <div className="CommunityPostProfileImg">
            {imgURL !== null ? (
              <img src={imgURL} alt="Profile" />
            ) : (
              <img src={Logo} alt="Profile" />
            )}
          </div>
          <div className="CommunityPostProfileText">
            <p className="CommunityPostProfileNickname">{register_id}</p>
            <p className="CommunityPostProfileTime">
              {timestampParse(register_datetime)}
            </p>
          </div>
          <div className="menu">
            {!(!isMine && isReply) && (
              <ThreeDotsVertical
                onClick={(event) => {
                  event.stopPropagation();
                  setView(!view);
                  if (parentCommentId !== 0) {
                    setParentCommentId(0);
                  }
                }}
              />
            )}

            {view && (
              <AdditionalButtonforComment
                target_comment_id={comment_id}
                register_id={register_id}
                parentCommentId={parentCommentId}
                setParentCommentId={setParentCommentId}
                isReply={isReply}
                isMine={isMine}
                parent_id={parent_id}
              ></AdditionalButtonforComment>
            )}
          </div>
        </div>
        <br />
        <div
          className="CommunityPostContent"
          style={isReply ? { marginLeft: "70px" } : {}}
        >
          {comment_content}
        </div>
        <br />
      </div>
    </>
  );
}
