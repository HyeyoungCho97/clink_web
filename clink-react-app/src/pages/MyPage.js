import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import pig from "../assets/pig.png";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "../styles/MyPage.scss";
import AddAccount from "../components/account/AddAccount";
import ShowAccount from "../components/account/ShowAccount";

const MyPage = () => {
  const [user_name, setUser_ame] = useState("");
  const [nick_name, setNick_name] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [userInfo, setUserInfo] = useState(0);
  const navigate = useNavigate();
  const accountNumber1 = sessionStorage.getItem("accountNumber1");
  const accountNumber2 = sessionStorage.getItem("accountNumber2");

  useEffect(() => {
    setUserInfo(sessionStorage.getItem("user_id"));
  }, []);

  useEffect(() => {
    // 개인정보 수정용
    // const storedNickname = sessionStorage.getItem('nick_name');
    // setNick_name(storedNickname);
    // const storedName = sessionStorage.getItem('user_name');
    // setUser_ame(storedName);
  }, []);

  // 로그아웃(세션제거)
  function logoutHandler() {
    sessionStorage.clear();
    navigate("/");
  }

  // 개인정보 수정
  function updateHandler() {
    let param = {
      user_name: user_name,
      nick_name: nick_name,
      password: password,
      confirmPwd: confirmPwd,
      user_no: sessionStorage.getItem("user_no"),
    };
    axios
      .post("http://localhost:80/clink/user/update.do", param)
      .then((response) => {
        console.log(response.data);
        if (response.data === "success") {
          alert("수정되었습니다.");
          // setUser_ame('');
          // setNick_name('');
          // setPassword('');
          // setConfirmPwd('');
        } else if (response.data === "fail") {
          alert("정상적으로 처리되지 않았습니다.");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("다시 시도하세요");
      });
  }

  return (
    <div className="MyPageContainer" style={{ paddingBottom: "20%" }}>
      <div className="MyPageTitle">
        {sessionStorage.getItem("user_id")} 마이페이지
      </div>
      {userInfo ? (
        <>
          <div className="MyPageProfileBox">
            <img src={pig} alt="logo" /> &nbsp; &nbsp; &nbsp;
            <Button className="MyPageProfileBtn">프로필 사진 변경</Button>
            &nbsp;
            <Button className="MyPageChoiceBtn">선택</Button>
          </div>
          <div className="MyPageAccounttitle">계좌등록</div>
          <AddAccount
            className="MyPageAddAccount"
            accountNumber1={accountNumber1}
          />
          <ShowAccount
            className="MyPageAddAccount"
            accountNumber2={accountNumber2}
          />
          <div className="MyPageInfotitle">개인정보 수정</div>
          <form action="update.do" method="post">
            <div className="MyPageInfoBox">
              <Form.Control
                type="text"
                name="nick_name"
                placeholder={`닉네임 ${nick_name}`}
                className="joinInput"
                onChange={(e) => {
                  setNick_name(e.target.value);
                }}
                value={nick_name}
              />
              <Form.Control
                type="text"
                name="name"
                placeholder={`이름 ${user_name}`}
                className="joinInput"
                onChange={(e) => {
                  setUser_ame(e.target.value);
                }}
                value={user_name}
              />
              <Form.Control
                type="password"
                name="password"
                placeholder="비밀번호"
                className="joinInput"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
              />
              <Form.Control
                type="password"
                name="passwordConfirm"
                placeholder="비밀번호 확인"
                className="joinInput"
                onChange={(e) => {
                  setConfirmPwd(e.target.value);
                }}
                value={confirmPwd}
              />
              <br />
            </div>
          </form>
          <div className="MyPageBtnBox">
            <Button type="submit" onClick={() => updateHandler()}>
              수정
            </Button>
            <br />
            <br />
            <div onClick={() => logoutHandler()} style={{ cursor: "pointer" }}>
              <b>Logout</b>
            </div>
            <br />
          </div>
        </>
      ) : (
        <p>세션 정보가 없습니다</p>
      )}
    </div>
  );
};

export default MyPage;
