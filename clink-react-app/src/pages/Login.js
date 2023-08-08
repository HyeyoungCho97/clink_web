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
  const [user_no, setUser_no] = useState("");

<<<<<<< HEAD
  const handleLoginSubmit = () => {
    // sessionStorage.setItem('user_id', 'test');
    // sessionStorage.setItem('user_name', '테스트용');
    // sessionStorage.setItem('nick_name', '닉네임테스트');
    // navigate('/mypage');
    if (userId.trim() === '' || pwd.trim() === '') {
      setuserId('');
      setPwd('');
      console.log(userId);
      alert('아이디 또는 패스워드를 입력해주세요');
    } else {
      var param = {
        user_id: userId,
        password: pwd,
      };
      console.log(userId, pwd);
      axios
        .post('http://localhost:80/clink/user/login.do', param)
        .then((response) => {
          console.log(
            response.data.user_id,
            response.data.user_no,
            response.data.nick_name
          );
          if (response.data) {
            sessionStorage.setItem('user_id', response.data.user_id);
            sessionStorage.setItem('user_no', response.data.user_no);
            sessionStorage.setItem('nick_name', response.data.nick_name);
            sessionStorage.setItem('user_name', response.data.use_name);
            alert(sessionStorage.getItem('user_id') + ' 로그인되었습니다.');
            navigate('/mypage');
          } else {
            alert('다시 시도하세요');
            setuserId('');
            setPwd('');
          }
        })
        .catch((error) => {
          console.log(error);
          alert('다시 시도하세요');
        });
=======
  // 엔터키 이벤트
  const handleEnterKey = (e) => {
    if (e.key == "Enter") {
      handleLoginSubmit();
    }
  };

  const handleLoginSubmit = async () => {
    if (user_id.trim() === "" || password.trim() === "") {
      setUser_id("");
      setPassword("");
      console.log(user_id);
      alert("아이디 또는 패스워드를 입력해주세요");
    } else {
      var param = {
        mid: "t3",
        mpw: "t3",
      };
      console.log(user_id, password);

      // 토큰 검증
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      if (!accessToken) {
        console.log("Cannot Find Access Token");

        // 토큰 발급용
        axios
          .post("http://localhost:80/generateToken", param)
          .then((response) => {
            if (response.data) {
              console.log(response.data);
              localStorage.setItem("accessToken", response.data.accessToken);
              localStorage.setItem("refreshToken", response.data.refreshToken);
              console.log("accessToken:" + localStorage.getItem("accessToken"));
              console.log(
                "refreshToken:" + localStorage.getItem("refreshToken")
              );
            } else {
              console.log("토큰 생성 실패");
            }
          })
          .catch((error) => {
            console.log(error);
            alert("generateToken 에러 다시 시도하세요");
          });
      }
      console.log("액세스토큰:" + localStorage.getItem("accessToken"));
      console.log("리프레시토큰:" + localStorage.getItem("refreshToken"));

      // 헤더에 담아서 API호출
      console.log("accessToken:" + accessToken);
      const authHeader = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };
      try {
        const res = await axios.post(
          "http://localhost:80/clink/user/login.do",
          { user_id: user_id, password: password },
          {
            headers: authHeader,
          }
        );
        console.log(res.data);
        if (res.data) {
          console.log(res.data.user_no);
          sessionStorage.setItem("user_no", res.data.user_no);
          setUser_no(res.data.user_no);
          alert(sessionStorage.getItem("user_id") + " 로그인되었습니다.");
          navigate("/mypage");
        } else {
          alert("login.do else 에러 다시 시도하세요");
          setUser_id("");
          setPassword("");
        }
        return console.log(res.data);
      } catch (err) {
        console.log(err);
        if (err.response.data.msg === "Expired Token") {
          console.log("Refresh Your Token");
          // 토큰 유효기간이 만료되면 refreshToken 호출
          try {
            await callRefresh();
            console.log("new tokens....saved..");
            return handleLoginSubmit(); // 재호출
          } catch (refreshErr) {
            throw refreshErr.response.data.msg;
          }
        } //end if
      }
      // RefreshToken 발급용
      const callRefresh = async () => {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        const tokens = { accessToken, refreshToken };
        const res = await axios.post(
          "http://localhost:80/refreshToken",
          tokens
        );
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
      };
>>>>>>> 7f479957d8e2ba6a40e0bc79aa9dc5ba261d2ef0
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
