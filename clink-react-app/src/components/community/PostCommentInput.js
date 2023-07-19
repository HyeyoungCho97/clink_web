import React, { useState } from 'react'
import '../../styles/PostCommentInput.scss'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import queryString from "query-string";


export default function PostCommentInput() {
  const location = useLocation();
  const apiLink = 'http://localhost/community/post/comment/insert'
  const [comment_commentContent, comment_setCommentContent] = useState("");
  const handleChange_commentContent = (e)=>{
    e.preventDefault();
    comment_setCommentContent(e.target.value);
  }

  const comment_commentWriter = sessionStorage.getItem('userName');
  const query = queryString.parse(location.search);
  const comment_boardNo = Number(query.boardNo);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(apiLink, {
        boardNo : comment_boardNo,
        commentWriter : comment_commentWriter,
        commentContent : comment_commentContent,
      })
      .then((response) => {
        window.location.replace('http://localhost:3000/community/post'+location.search);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <div className='CommentContainer'>
        <Form action={apiLink} method="post" onSubmit={handleSubmit}>
            <Form.Group controlId="formComment">
                <Form.Control type='text' name="commentContent" placeholder='댓글을 입력하세요...' onChange={handleChange_commentContent}/>
                <Form.Control type='hidden' name="commentWriter" value={comment_commentWriter}/>
                <Form.Control type='hidden' name="boardNo" value={comment_boardNo}/>
            </Form.Group>
          <Button type="submit">입력</Button>
        </Form>
    </div>
  )
}
