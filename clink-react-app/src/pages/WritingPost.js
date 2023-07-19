import React, { useState } from 'react';
import '../styles/WritingPost.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CommunityHeader from '../components/community/CommunityHeader';
import WritingCategory from '../components/community/WritingCategory';
import PostTagInput from '../components/community/PostTagInput';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-bootstrap-icons';

export default function WritingPost() {
  const [inputPost, setInputPost] = useState({
    categoryNo: 1,
    title: '',
    content: '',
    tagList: [],
  });
  const insertPost = () => {
    let params = {
      boardTitle: inputPost.title,
      boardContent: inputPost.content,
      boardCategoryNo: inputPost.categoryNo,
      hashTagVo: inputPost.tagList,
    };
    if (params.boardTitle.trim() === '' || params.boardContent.trim() === '') {
      alert('제목 또는 내용을 입력해주세요!');
    } else {
      axios.post('http://localhost:80/insertPost', params);
      window.location.href =
        'http://localhost:3000/community/category/?categoryNo=' +
        inputPost.categoryNo +
        '&&filter=1';
    }
    //console.log(inputPost.tagList);
  };
  const onChange = (e) => {
    setInputPost({ ...inputPost, [e.target.classList[0]]: e.target.value });
  };
  return (
    <div className="WritingPost">
      <CommunityHeader></CommunityHeader>
      <WritingCategory
        inputPost={inputPost}
        setInputPost={setInputPost}
      ></WritingCategory>
      <Form>
        <Form.Group className="" controlId="formPost">
          <Form.Control
            type="text"
            placeholder="제목을 입력하세요"
            className="title"
            value={inputPost.title}
            onChange={onChange}
          />
          <br />
          <Form.Control
            className="content"
            as="textarea"
            rows={13}
            placeholder="내용을 입력하세요"
            value={inputPost.content}
            onChange={onChange}
          />
        </Form.Group>
        <PostTagInput
          inputPost={inputPost}
          setInputPost={setInputPost}
        ></PostTagInput>
        <Button
          // type="submit"
          onClick={() => {
            insertPost();
          }}
          style={{ width: '80%' }}
        >
          글 작성
        </Button>
      </Form>
      <br />
      <br />
      <br />
    </div>
  );
}
