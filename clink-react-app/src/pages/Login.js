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
  const [userId, setuserId] = useState("");
  const [pwd, setPwd] = useState("");

  const handleLoginSubmit = () => {
    if (userId.trim() === "" || pwd.trim() === "") {
      setuserId("");
      setPwd("");
      console.log(userId);
      alert("아이디 또는 패스워드를 입력해주세요");
    } else {
      var param = {
        userId: userId,
        pwd: pwd,
      };
      console.log(userId, pwd);
      axios
        .post("http://localhost:80/clink/user/login.do", param)
        .then((response) => {
          console.log(
            response.data.userId,
            response.data.userNo,
            response.data.nickname
          );
          if (response.data) {
            sessionStorage.setItem("userId", response.data.userId);
            sessionStorage.setItem("userNo", response.data.userNo);
            sessionStorage.setItem("nickname", response.data.nickname);
            sessionStorage.setItem("userName", response.data.userName);
            alert(sessionStorage.getItem("userId") + " 로그인되었습니다.");
            navigate("/mypage");
          } else {
            alert("다시 시도하세요");
            setuserId("");
            setPwd("");
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
            value={userId}
            placeholder="아이디"
            onChange={(e) => {
              setuserId(e.target.value);
            }}
          />
          <Form.Control
            type="password"
            id="inputPassword5"
            placeholder="비밀번호"
            value={pwd}
            onChange={(e) => {
              setPwd(e.target.value);
            }}
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
