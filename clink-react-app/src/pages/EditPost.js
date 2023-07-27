import React, { useEffect, useState } from "react";
import CommunityHeader from "../components/community/CommunityHeader";
import { useLocation } from "react-router-dom";
import axios from "axios";
import PostTagInput from "../components/community/PostTagInput";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import queryString from "query-string";

export default function EditPost() {
  const [inputPost, setInputPost] = useState({
    board_content: "",
    board_like_count: null,
    board_no: null,
    board_title: "",
    board_views: null,
    category_no: null,
    hashtag_content: "",
    register_datetime: "",
    register_id: null,
    update_datetime: null,
    update_id: null,
    user_no: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const updatePostAPILink = "http://localhost/community/post/update";
  const query = queryString.parse(location.search);
  const post_board_no = Number(query.board_no);

  const onChange = (e) => {
    e.preventDefault();
    setInputPost({
      ...inputPost,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setError(null);
        setInputPost(null);
        setLoading(true);

        const responsePost = await axios.get(
          "http://localhost/community/post" + location.search
        );

        setInputPost(responsePost.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchPost();
  }, [location]);

  const updatePost = async (e) => {
    await axios
      .post(updatePostAPILink, {
        board_no: post_board_no,
        board_title: inputPost.board_title,
        board_content: inputPost.board_content,
      })
      .then((response) => {
        window.location.replace('http://localhost:3000/community/post'+location.search);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!inputPost) return null;
  return (
    <div className="WritingPost">
      <CommunityHeader></CommunityHeader>
      <Form action= {updatePostAPILink} method="post" onSubmit={updatePost}>
        <Form.Group className="" controlId="formPost">
          <Form.Control
            type="text"
            name="board_title"
            placeholder="제목을 입력하세요"
            className="title"
            defaultValue={inputPost.board_title}
            onChange={onChange}
          />
          <br />
          <Form.Control
            className="content"
            name="board_content"
            as="textarea"
            rows={13}
            placeholder="내용을 입력하세요"
            defaultValue={inputPost.board_content}
            onChange={onChange}
          />
          <Form.Control type='hidden' name="board_no" value={post_board_no}/>
        </Form.Group>
        <PostTagInput
          inputPost={inputPost}
          setInputPost={setInputPost}
        ></PostTagInput>
        <Button
          type="submit"
          style={{ width: "80%" }}
        >
          수정 완료
        </Button>
      </Form>
      <br />
      <br />
      <br />
    </div>
  );
}
