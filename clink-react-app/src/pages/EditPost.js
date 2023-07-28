import React, { useEffect, useState } from 'react';
import CommunityHeader from '../components/community/CommunityHeader';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import PostTagInput from '../components/community/PostTagInput';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import queryString from 'query-string';

export default function EditPost() {
  const [inputPost, setInputPost] = useState({
    board_content: '',
    board_like_count: null,
    board_no: null,
    board_title: '',
    board_views: null,
    category_no: null,
    hashtag_content: '',
    register_datetime: '',
    register_id: null,
    update_datetime: null,
    update_id: null,
    user_no: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const updatePostAPILink = 'http://localhost/community/post/update';
  const query = queryString.parse(location.search);
  const post_board_no = Number(query.board_no);

  const onChange = (e) => {
    setInputPost({ ...inputPost, [e.target.classList[0]]: e.target.value });
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setError(null);
        setInputPost(null);
        setLoading(true);

        const responsePost = await axios.get(
          'http://localhost/community/post' + location.search
        );
        setInputPost(responsePost.data);

        console.log(inputPost);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchPost();
  }, [location]);

  const updatePost = () => {
    const arr = [];
    for (let i = 0; i < inputPost.tagList.length; i++) {
      arr.push(inputPost.tagList[i].tagname);
    }
    let params = {
      board_title: inputPost.board_title,
      board_content: inputPost.board_content,
      category_no: inputPost.category_no,
      hashtag_content: arr.join(),
      register_id: inputPost.register_id,
      board_no: inputPost.board_no,
    };
    axios.post('http://localhost/community/post/update', params);
    window.location.href =
      'http://localhost:3000/community/posts?category_no=1&&filter=1';
  };

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!inputPost) return null;
  return (
    <div className="WritingPost">
      <CommunityHeader></CommunityHeader>
      <Form action={updatePostAPILink} method="post">
        <Form.Group className="" controlId="formPost">
          <Form.Control
            type="text"
            placeholder="제목을 입력하세요"
            className="board_title"
            defaultValue={inputPost.board_title}
            onChange={onChange}
          />
          <br />
          <Form.Control
            className="board_content"
            as="textarea"
            rows={13}
            placeholder="내용을 입력하세요"
            defaultValue={inputPost.board_content}
            onChange={onChange}
          />
          <Form.Control type="hidden" name="board_no" value={post_board_no} />
        </Form.Group>
        <PostTagInput
          inputPost={inputPost}
          setInputPost={setInputPost}
        ></PostTagInput>
        <Button type="button" style={{ width: '80%' }} onClick={updatePost}>
          수정 완료
        </Button>
      </Form>
      <br />
      <br />
      <br />
    </div>
  );
}
