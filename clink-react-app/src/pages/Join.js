import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Join.scss";
import { Link } from "react-router-dom";

const Join = () => {
  const navigate = useNavigate();
  const [user_name, setUser_name] = useState("");
  const [user_id, setUser_id] = useState("");
  const [nick_name, setNick_name] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [email, setEmail] = useState("");

  const [warningPwd, setWarningPwd] = useState("");
  const [warningId, setWarningId] = useState("");
  const [warningEmail, setWarningEmail] = useState("");

  useEffect(() => {
    if (password !== confirmPwd) {
      setWarningPwd("비밀번호가 일치하지 않습니다.");
    } else {
      setWarningPwd("");
    }
  }, [password, confirmPwd]);

  // 아이디 중복체크
  function checkDuplicateId() {
    let id = { user_id: user_id };
    axios
      .post("http://localhost/clink/user/check-duplicate-id.do", id)
      .then((response) => {
        console.log(response.data);
        if (response.data === "success") {
          setWarningId("사용할 수 있는 아이디입니다.");
        } else if (response.data === "fail") {
          setWarningId("사용 중인 아이디입니다.");
        }
      })
      .catch((error) => {
        console.log(error);
        setWarningId("다시 시도하세요");
      });
  }

  // 이메일 인증
  function emailAuthHandler() {
    console.log("이메일 주소:" + email);
    alert("인증번호가 전송되었습니다.");
    let email = { email: email };
    axios
      .post("http://localhost/clink/user/emailAuth.do", email)
      .then((response) => {
        console.log(response.data);
        if (response.data === "success") {
          setWarningEmail("사용할 수 있는 아이디입니다.");
        } else if (response.data === "fail") {
          setWarningEmail("사용 중인 아이디입니다.");
        }
      })
      .catch((error) => {
        console.log(error);
        setWarningId("다시 시도하세요");
      });
  }

  // 회원가입
  function handleSubmit(e) {
    // e.preventDefault();
    if (user_id.trim() === "") {
      alert("아이디를 입력해주세요.");
    } else if (password.trim() === "") {
      alert("비밀번호를 입력해주세요.");
    } else if (user_name.trim() === "") {
      alert("이름을 입력해주세요.");
    } else if (confirmPwd.trim() === "") {
      alert("비밀번호 확인을 입력해주세요.");
    } else {
      let id = { user_id: user_id };
      axios
        .post("http://localhost:80/clink/user/check-duplicate-id.do", id)
        .then((response) => {
          console.log(response.data);
          if (response.data === "success") {
            var param = {
              user_name: user_name,
              user_id: user_id,
              nick_name: nick_name,
              password: password,
              confirmPwd: confirmPwd,
              email: email,
            };
            axios
              .post("http://localhost:80/clink/user/join.do", param)
              .then((response) => {
                // console.log(response.data);
                if (response.data) {
                  alert("회원가입 되었습니다. 로그인해주세요.");
                  navigate("/");
                } else {
                  alert("다시 시도하세요");
                }
              })
              .catch((error) => {
                console.log(error);
                alert("회원가입에 실패했습니다.");
              });
          } else if (response.data === "fail") {
            alert("사용 중인 아이디입니다.");
            setUser_id("");
          }
        })
        .catch((error) => {
          console.log(error);
          alert("다시 시도하세요");
        });
    }
  }
  return (
    <div className="JoinContainer">
      <div id="backgroundCircle"></div>
      <form action="join.do" method="post">
        <div className="JoinTitle">
          <h1>회원가입</h1>
        </div>
        <div className="JoinInputBox">
          <Form.Control
            name="name"
            placeholder="이름*"
            className="joinInput"
            onChange={(e) => {
              setUser_name(e.target.value);
            }}
          />
          <div></div>
          <InputGroup className="joinInput">
            <Form.Control
              name="user_id"
              placeholder="아이디*"
              variant="outline-secondary"
              onChange={(e) => {
                setUser_id(e.target.value);
                checkDuplicateId();
              }}
              value={user_id}
            />
          </InputGroup>
          <div>{warningId}</div>
          <Form.Control
            name="nick_name"
            placeholder="닉네임"
            className="joinInput"
            onChange={(e) => {
              setNick_name(e.target.value);
            }}
          />
          <div></div>
          <Form.Control
            type="password"
            name="password"
            placeholder="비밀번호*"
            className="joinInput"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div></div>
          <Form.Control
            type="password"
            name="confirmPassword"
            placeholder="비밀번호 확인*"
            className="joinInput"
            onChange={(e) => {
              setConfirmPwd(e.target.value);
            }}
          />
          <div>{warningPwd}</div>
          <InputGroup className="joinInput">
            <Form.Control
              placeholder="이메일"
              type="email"
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Button
              variant="outline-secondary"
              id="JoinIdentifyBtn"
              onClick={() => emailAuthHandler()}
            >
              본인인증하기
            </Button>
          </InputGroup>
          <div></div>
          <Form.Control
            type="text"
            name="emailAuthNumber"
            placeholder="인증번호"
            className="joinInput"
            maxLength="6"
            // onChange={(e) => {
            //   setPassword(e.target.value);
            // }}
          />
        </div>
        <div>{warningEmail}</div>
      </form>
      <div className="JoinBtnBox">
        <Button
          variant="primary"
          className="LoginSubmitBtn"
          type="submit"
          onClick={() => handleSubmit()}
        >
          회원가입하기
        </Button>
      </div>
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className="JoinLoginBtn">로그인</div>
      </Link>
    </div>
  );
};

export default Join;
