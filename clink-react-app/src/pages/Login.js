import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import pig from '../assets/pig.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Login.scss';

const Login = () => {
  const navigate = useNavigate();
  const [user_id, setUser_id] = useState('');
  const [password, setPassword] = useState('');

  // 엔터키 이벤트
  const handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      handleLoginSubmit();
    }
  };

  // 로그인
  const handleLoginSubmit = async () => {
    if (user_id.trim() === '' || password.trim() === '') {
      setUser_id('');
      setPassword('');
      console.log(user_id);
      alert('아이디 또는 패스워드를 입력해주세요');
    } else {
      //토큰을 생성할 파라미터
      var param = {
        mid: 't3',
        mpw: 't3',
      };
      console.log(user_id, password);

      const res = await axios.post('http://localhost:80/clink/user/login.do', {
        user_id: user_id,
        password: password,
      });
      console.log(res.data);
      if (res.data) {
        sessionStorage.setItem('user_no', res.data.user_no);
        sessionStorage.setItem('user_id', res.data.user_id);
        sessionStorage.setItem('nick_name', res.data.nick_name);
        // jwt 발급용
        const response = await axios.post(
          'http://localhost:80/generateToken',
          param
        );
        if (!response.data) {
          console.log('데이터 없음');
        } else {
          console.log(response.data);
          localStorage.setItem('accessToken', response.data.accessToken);
          localStorage.setItem('refreshToken', response.data.refreshToken);
          navigate('/mypage');
        }
      } else {
        alert('login.do else 에러 다시 시도하세요');
        // 회원가입페이지로 넘어가게~~ navigate("/mypage");
        setUser_id('');
        setPassword('');
      }
    }
  };
  // const callRefresh = async () => {
  //   const accessToken = localStorage.getItem("accessToken");
  //   const refreshToken = localStorage.getItem("refreshToken");

  //   const tokens = { accessToken, refreshToken };
  //   const res = await axios.post("http://localhost:8080/refreshToken", tokens);
  //   localStorage.setItem("accessToken", res.data.accessToken);
  //   localStorage.setItem("refreshToken", res.data.refreshToken);
  // };

  return (
    <div className="LoginContainer">
      <div className="LoginImage">
        <img src={pig} alt="logo" />
      </div>
      <div className="LoginTitle">
        <h2>로그인</h2>
      </div>
      <form action="login.do" method="post">
        <div className="LoginForm">
          <Form.Control
            type="text"
            id="inputPassword5"
            value={user_id}
            placeholder="아이디"
            onChange={(e) => {
              setUser_id(e.target.value);
              console.log(user_id);
            }}
          />
          <Form.Control
            type="password"
            id="inputPassword5"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              console.log(e.target.value);
            }}
            onKeyDown={(e) => handleEnterKey(e)}
          />
        </div>
      </form>
      <div className="joinNfindBox">
        <button className="LoginJoinBtn">
          <Link to="/join">회원가입</Link>
        </button>
        <button className="LoginFindBtn">
          <Link to="/find-id">아이디/비밀번호 찾기</Link>
        </button>
      </div>
      <div className="LoginButtonBox">
        <Button
          className="LoginSubmitBtn"
          type="submit"
          onClick={() => handleLoginSubmit()}
        >
          로그인하기
        </Button>
      </div>
    </div>
  );
};

export default Login;
