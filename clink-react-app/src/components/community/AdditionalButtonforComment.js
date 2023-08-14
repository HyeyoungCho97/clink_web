import React, { useEffect, useState } from 'react';
import '../../styles/community/AdditionalButton.scss';
import axios from 'axios';
import { getAuthHeader, callRefresh } from '../common/JwtAuth';

export default function AdditionalButton({
  target_comment_id,
  isMine,
  setParentCommentId,
  isReply,
  parentCommentId,
  parent_id,
}) {
  const [canDelete, setCanDelete] = useState(false);

  const handleDelete = async (e) => {
    e.preventDefault();
    deleteReply();
  };
  const deleteReply = async (e) => {
    // eslint-disable-next-line no-restricted-globals
    var deleteOk = confirm('정말로 댓글을 삭제하겠습니까?');
    if (deleteOk) {
      await axios
        .post(
          'http://localhost:80/community/post/comment/delete',
          null,
          {
            params: {
              comment_id: target_comment_id,
              parent_id: parent_id,
            },
          },
          {
            headers: getAuthHeader(),
          }
        )
        .then((response) => {
          if (response.data === 1) {
            alert('대댓글이 달린 댓글입니다. 삭제는 관리자에게 문의하세요.');
            setCanDelete(false);
          } else {
            alert('삭제되었습니다.');
            window.location.reload(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const replySet = (e) => {
    setParentCommentId(target_comment_id);
  };

  return (
    <>
      <ul
        className="sub"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {isMine && (
          <li href="#" onClick={handleDelete}>
            댓글 삭제
          </li>
        )}
        {!isReply && (
          <li href="#" onClick={replySet}>
            대댓글 입력
          </li>
        )}
      </ul>
    </>
  );
}
