import React, { useEffect, useState } from 'react';
import '../../styles/community/AdditionalButton.scss';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';

export default function AdditionalButton({ target_comment_id }) {
  const navigate = useNavigate();
  const location = useLocation();
  const handleDelete = async (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-restricted-globals
    var deleteOk = confirm('정말로 댓글을 삭제하겠습니까?');
    if (deleteOk) {
      await axios
        .post('http://localhost/community/post/comment/delete', null, {
          params: {
            comment_id: target_comment_id,
          },
        })
        .then((response) => {
          window.location.reload(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
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
            console.log(location.search);
            navigate('/community/post/update' + location.search);
          }}
        >
          &nbsp;댓글 수정
        </li>
        <li href="#" onClick={handleDelete}>
          &nbsp;댓글 삭제
        </li>
      </ul>
    </>
  );
}
