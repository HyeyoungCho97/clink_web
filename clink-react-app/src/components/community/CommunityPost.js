import React, { useState, useEffect } from 'react';
import '../../styles/community/CommunityPost.scss';
import {
  Heart,
  ChatDots,
  Eye,
  HeartFill,
  ThreeDotsVertical,
} from 'react-bootstrap-icons';
import Logo from '../../assets/maru.jpg';
import Button from 'react-bootstrap/Button';
import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function CommunityPost({ post, key }) {
  const [likes, setLikes] = useState(0);
  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    if (post && post.likes) {
      setLikes(post.likes);
    }
  }, [post]);

  const clickLike = () => {
    if (isLike === false) {
      setLikes(likes + 1);
    } else {
      setLikes(likes - 1);
    }
    setIsLike(!isLike);
  };

  const {
    board_title,
    board_no,
    board_content,
    register_datetime, 
		register_id, 
		board_like_count,
		hashtag_content,
    board_views
  } = post || {}; // 구조 분해할 때 기본값으로 빈 객체를 사용
  const navigate = useNavigate();
  const [view, setView] = useState(false);
  return (
    <>
      <div
        className="CommunityPostContainer"
        onClick={(event) => {
          event.stopPropagation();
          navigate('/community/post?boardNo=' + board_no);
        }}
      >
        <div className="CommunityPostTags">
          <Button variant="primary" size="sm">
            #안녕
          </Button>{' '}
          <Button variant="primary" size="sm">
            #안녕
          </Button>{' '}
          <Button variant="primary" size="sm">
            #안녕
          </Button>{' '}
        </div>
        <div className="CommunityPost">
          <div className="PostProfileDiv">
            <div className="CommunityPostProfile">
              <div className="CommunityPostProfileImg">
                <img src={Logo} alt="Profile" />
              </div>
              <div className="CommunityPostProfileText">
                <p className="CommunityPostProfileNickname">{board_title}</p>
                <p className="CommunityPostProfileTime">{register_datetime}</p>
              </div>
            </div>

            <div className="menu">
              <ThreeDotsVertical
                onClick={(event) => {
                  setView(!view);
                  event.stopPropagation();
                }}
              />
              {view && (
                <ul
                  className="sub"
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                >
                  <li
                    href="#"
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                  >
                    &nbsp;글 수정
                  </li>
                  <li
                    href="#"
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                  >
                    &nbsp;글 삭제
                  </li>
                </ul>
              )}
            </div>
          </div>
          <br />
          <div className="CommunityPostContent">{board_content}</div>
          <br />
        </div>

        <div className="CommunityPostInfo">
          <button onClick={clickLike}>
            {isLike ? <HeartFill /> : <Heart />}
            &nbsp;좋아요 {board_like_count}
          </button>
          <button>
            <ChatDots />
            &nbsp;댓글쓰기
          </button>
          <button>
            <Eye />
            &nbsp;조회 {board_views}
          </button>
        </div>
      </div>
    </>
  );
}
