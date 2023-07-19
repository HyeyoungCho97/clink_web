import React from 'react'
import '../../styles/PostCommentInput.scss'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function PostCommentInput() {
  return (
    <div className='CommentContainer'>
        <Form>
            <Form.Group className="" controlId="formComment">
                <Form.Control type='text' placeholder='댓글을 입력하세요...'/>
            </Form.Group>
        </Form>
        <Button>입력</Button>
    </div>
  )
}
