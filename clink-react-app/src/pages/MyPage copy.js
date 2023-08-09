import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import pig from "../assets/pig.png";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import AddAccount from "../components/account/AddAccount";
import ShowAccount from "../components/account/ShowAccount";
import bankCategory from "../dataCode/bankCategory.json";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/MyPage.scss";
import getAuthHeader from "../components/common/AuthHeader";

const MyPage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    id: "",
    name: "",
    nickname: "",
    password: "",
  });
  const [file, setFile] = useState(null);
  const [newfile, setNewfile] = useState("");

  const [addAccountNo, setAddAccountNo] = useState("");
  const [addAccountBankCode, setAddAccountBankCode] = useState("");
  const [showAccountNo, setShowAccountNo] = useState("");
  const [showAccountBankCode, setShowAccountBankCode] = useState("");

  useEffect(() => {
    // 계좌 정보불러오기
    let param = {
      user_no: sessionStorage.getItem("user_no"),
    };
    // const accessToken = localStorage.getItem("accessToken");
    // const authHeader = { Authorization: `Bearer ${accessToken}` };
    axios
      .post(
        "http://localhost:80/user/checkAccount.do",
        { param },
        {
          headers: getAuthHeader(),
        }
      )
      .then((response) => {
        // console.log(response.data);
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].account_code === "1") {
            // 저축계좌 등록
            setAddAccountNo(response.data[i].account_no);
            setAddAccountBankCode(
              bankCategory.bank[response.data[i].bank_code]
            );
          } else if (response.data[i].account_code === "2") {
            // 소비계좌 등록
            setShowAccountNo(response.data[i].account_no);
            setShowAccountBankCode(
              bankCategory.bank[response.data[i].bank_code]
            );
          } else {
            console.log("등록된 계좌 없음");
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // 유저 정보 가져오기
    axios
      .post("http://localhost:80/user/get-userInfo.do", param, {
        headers: getAuthHeader(),
      })
      .then((response) => {
        // console.log("response: " + JSON.stringify(response));
        console.log(response);
        setUserInfo({
          ...userInfo,
          id: response.data.user_id,
          nickname: response.data.nick_name,
          password: response.data.password,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    // 로그인 확인용
    // setUserInfo(sessionStorage.getItem("user_id"));
  }, []);

  // 로그아웃(세션제거)
  function logoutHandler() {
    sessionStorage.clear();
    navigate("/");
  }

  // 개인정보 수정
  function updateInfoHandler() {
    let param = {
      nick_name: userInfo.nickname,
      password: userInfo.password,
      user_no: sessionStorage.getItem("user_no"),
    };
    axios
      .post("http://localhost:80/user/update.do", param, {
        headers: getAuthHeader(),
      })
      .then((response) => {
        console.log(response.data);
        if (response.data === "success") {
          alert("개인정보가 수정되었습니다.");
          setUserInfo({
            ...userInfo,
            nickname: userInfo.nickname,
            password: userInfo.password,
          });
          sessionStorage.setItem("nick_name", userInfo.nickname);
          sessionStorage.setItem("password", userInfo.password);
        } else if (response.data === "fail") {
          alert("정상적으로 처리되지 않았습니다.");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("다시 시도하세요");
      });
  }

  // 프로필 사진
  function profileHandler() {
    let formData = new FormData(); // new FromData()로 새로운 객체 생성
    formData.append("user_no", sessionStorage.getItem("user_no"));
    formData.append("file", file);
    axios
      .post("http://localhost:80/user/photo-url.do", formData)
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          alert("프로필 사진이 수정되었습니다.");
          setNewfile(response.data);
        } else {
          alert("정상적으로 처리되지 않았습니다.");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("다시 시도하세요");
      });
  }

  // 로그아웃(세션제거)
  function logoutHandler() {
    sessionStorage.clear();
    navigate("/");
  }

  return (
    <div className="MyPageContainer" style={{ paddingBottom: "20%" }}>
      <div className="MyPageTitle">{userInfo.id} 마이페이지</div>
      {/* {userInfo ? ( */}
      <div className="MyPageProfileTitle">프로필 사진 등록</div>
      <>
        <div className="MyPageProfileBox">
          {newfile ? (
            <img src={`http://localhost/img/${newfile}`} alt="logo" />
          ) : (
            <img src={require("../assets/pig.png")} alt="logo" />
          )}
          <div className="MyPageProfileBtnBox">
            <label htmlFor="file">
              <div className="MyPageProfileSelectBtn">파일 선택</div>
            </label>
            &nbsp; &nbsp;&nbsp;
            <input
              id="file"
              className="MyPageChoiceBtn"
              type="file"
              name="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <Button
              // style={{ backgroundColor: "white",
              //   color: "#0364f7",
              //   border: "1px solid black" }}
              type="submit"
              onClick={() => profileHandler()}
            >
              확인
            </Button>
          </div>
        </div>
        <div className="MyPageAccounttitle">계좌등록</div>
        <AddAccount
          className="MyPageAddAccount"
          addAccountNo={addAccountNo}
          addAccountBankCode={addAccountBankCode}
        />
        <ShowAccount
          className="MyPageAddAccount"
          showAccountNo={showAccountNo}
          showAccountBankCode={showAccountBankCode}
        />
        <hr className="MypageHr" />
        <div className="MyPageInfotitle">개인정보 수정</div>
        <form action="update.do" method="post">
          <div className="MyPageInfoBox">
            <div className="MyPageLineBox">
              <div>닉네임</div>
              <Form.Control
                type="text"
                placeholder={`${userInfo.nickname}`}
                className="joinInput"
                onChange={(e) => {
                  setUserInfo({ ...userInfo, nickname: e.target.value });
                }}
                value={userInfo.nickname}
              />
            </div>
            <div className="MyPageLineBox">
              <div>비밀번호</div>
              <Form.Control
                type="password"
                name="password"
                className="joinInput"
                onChange={(e) => {
                  setUserInfo({ ...userInfo, password: e.target.value });
                }}
                value={userInfo.password}
              />
            </div>
            <div className="MyPageLineBox">
              <div>비밀번호 확인</div>
              <Form.Control
                type="password"
                name="passwordConfirm"
                className="joinInput"
              />
            </div>
            <br />
          </div>
        </form>
        <div className="MyPageBtnBox">
          <Button type="submit" onClick={() => updateInfoHandler()}>
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
      {/* ) : ( */}
      {/* <p>세션 정보가 없습니다</p> */}
      {/* )} */}
    </div>
  );
};

export default MyPage;
