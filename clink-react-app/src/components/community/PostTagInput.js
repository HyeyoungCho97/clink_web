import React, { useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { X } from 'react-bootstrap-icons';

export default function PostTagInput({ inputPost, setInputPost }) {
  const [tags, setTags] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [inputs, setInputs] = useState({
    tagname: '',
  });
  const { tagname } = inputs;
  const onChange = (event) => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const nextId = useRef(1);
  const onCreate = () => {
    if (tags.length === 5) {
      alert('태그는 5개까지 입력가능합니다');
      setInputs({
        tagname: '',
      });
    } else {
      const tag = {
        id: nextId.current,
        tagname,
      };
      setTags([...tags, tag]);
      setInputs({
        tagname: '',
      });
      setInputPost({ ...inputPost, tagList: [...tags, tag] });
      console.log(inputPost);
      nextId.current += 1;
    }
  };
  const onRemove = (event, id) => {
    // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
    // = user.id 가 id 인 것을 제거함
    event.stopPropagation();
    setTags(tags.filter((tag) => tag.id !== id));
    console.log(tags);
  };

  // useEffect(() => {
  //   const fetchTags = async () => {
  //     try {
  //       // 요청이 시작 할 때에는 error 와 users 를 초기화하고
  //       setError(null);
  //       setTags(null);
  //       // loading 상태를 true 로 바꿉니다.
  //       setLoading(true);
  //       const response = await axios.get(
  //         'https://jsonplaceholder.typicode.com/users'
  //       );
  //       setTags(response.data); // 데이터는 response.data 안에 들어있습니다.
  //     } catch (e) {
  //       setError(e);
  //     }
  //     setLoading(false);
  //   };

  //   fetchTags();
  // }, []);
  // if (loading) return <div>로딩중..</div>;
  // if (error) return <div>에러가 발생했습니다</div>;
  // if (!tags) return null;

  return (
    <>
      <Form.Control
        type="text"
        placeholder="태그..."
        name="tagname"
        value={tagname}
        onChange={onChange}
      ></Form.Control>
      <Button onClick={onCreate}>태그입력</Button>
      <div className="SetTag">
        {tags.map((tag) => (
          <Button tag={tag} key={tag.id} variant="outline-primary">
            {tag.tagname}
            <X onClick={(event) => onRemove(event, tag.id)} />
          </Button>
        ))}
      </div>
    </>
  );
}
