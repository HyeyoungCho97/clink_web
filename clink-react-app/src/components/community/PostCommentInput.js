import React, { useState } from 'react'
import '../../styles/community/PostCommentInput.scss'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import queryString from "query-string";


export default function PostCommentInput({comment}) {
  const location = useLocation();
  const apiLink = 'http://localhost/community/post/comment/insert'
  const [comment_commentContent, comment_setCommentContent] = useState("");
  const handleChange_commentContent = (e)=>{
    e.preventDefault();
    comment_setCommentContent(e.target.value);
  }
  
  const comment_commentWriter = sessionStorage.getItem('user_id');
  const query = queryString.parse(location.search);
  const comment_boardNo = Number(query.board_no);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(apiLink, {
        board_no : comment_boardNo,
        register_id : comment_commentWriter,
        comment_content : comment_commentContent
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
