import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import pig from "../assets/pig.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Login.scss";

const Login = () => {
  const navigate = useNavigate();
  const [user_id, setUser_id] = useState("");
  const [password, setPassword] = useState("");

  // 엔터키 이벤트
  const handleEnterKey = (e) => {
    if (e.key == "Enter") {
      handleLoginSubmit();
    }
  };
  // 로그인
  const handleLoginSubmit = () => {
    if (user_id.trim() === "" || password.trim() === "") {
      setUser_id("");
      setPassword("");
      console.log(user_id);
      alert("아이디 또는 패스워드를 입력해주세요");
    } else {
      var param = {
        user_id: user_id,
        password: password,
      };
      console.log(user_id, password);
      axios
        .post(
          "http://ec2-43-202-97-102.ap-northeast-2.compute.amazonaws.com:8000/clink/user/login.do",
          param
        )
        .then((response) => {
          console.log(response.data);
          if (response.data) {
            console.log(response.data.user_no);
            sessionStorage.setItem("user_no", response.data.user_no);
            sessionStorage.setItem("user_id", response.data.user_id);
            sessionStorage.setItem("user_name", response.data.user_name);
            sessionStorage.setItem("nick_name", response.data.nick_name);
            sessionStorage.setItem("password", response.data.password);
            sessionStorage.setItem("photo_url", response.data.photo_url);
            alert(sessionStorage.getItem("user_id") + " 로그인되었습니다.");
            navigate("/mypage");
          } else {
            alert("다시 시도하세요");
            setUser_id("");
            setPassword("");
          }
        })
        .catch((error) => {
          console.log(error);
          alert("다시 시도하세요");
        });
    }
  };

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
            }}
          />
          <Form.Control
            type="password"
            id="inputPassword5"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
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
          variant="primary"
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
