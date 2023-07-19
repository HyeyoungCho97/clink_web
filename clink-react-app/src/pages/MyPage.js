import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddAccount from "../components/AddAccount";
import ShowAccount from "../components/ShowAccount";
import pig from "../assets/pig.png";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "../styles/MyPage.scss";
import Footer from "../components/common/Footer";

const MyPage = () => {
  const [userName, setUserName] = useState("");
  const [nickname, setNickname] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [userInfo, setUserInfo] = useState(0);
  const navigate = useNavigate();
  const accountNumber1 = sessionStorage.getItem("accountNumber1");
  const accountNumber2 = sessionStorage.getItem("accountNumber2");

  useEffect(() => {
    setUserInfo(sessionStorage.getItem("userId"));
  }, []);

  useEffect(() => {
    // 개인정보 수정용
    // const storedNickname = sessionStorage.getItem('nickname');
    // setNickname(storedNickname);
    // const storedName = sessionStorage.getItem('userName');
    // setUserName(storedName);
  }, []);

  // 로그아웃(세션제거)
  function logoutHandler() {
    sessionStorage.clear();
    navigate("/");
  }

  // 개인정보 수정
  function updateHandler() {
    let param = {
      userName: userName,
      nickname: nickname,
      pwd: pwd,
      confirmPwd: confirmPwd,
      userNo: sessionStorage.getItem("userNo"),
    };
    axios
      .post("http://localhost:80/clink/user/update.do", param)
      .then((response) => {
        console.log(response.data);
        if (response.data === "success") {
          alert("수정되었습니다.");
          // setUserName('');
          // setNickname('');
          // setPwd('');
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
        {sessionStorage.getItem("userId")} 마이페이지
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
                name="nickname"
                placeholder={`닉네임 ${nickname}`}
                className="joinInput"
                onChange={(e) => {
                  setNickname(e.target.value);
                }}
                value={nickname}
              />
              <Form.Control
                type="text"
                name="name"
                placeholder={`이름 ${userName}`}
                className="joinInput"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                value={userName}
              />
              <Form.Control
                type="password"
                name="password"
                placeholder="비밀번호"
                className="joinInput"
                onChange={(e) => {
                  setPwd(e.target.value);
                }}
                value={pwd}
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
