import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import pig from "../assets/pig.png";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import AddAccount from "../components/account/AddAccount";
import ShowAccount from "../components/account/ShowAccount";
import bankCategory from "../dataCode/bankCategory.json";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/MyPage.scss";

const MyPage = () => {
  // const [confirmPwd, setConfirmPwd] = useState("");
  const [userInfo, setUserInfo] = useState({
    name: "",
    nickname: "",
    password: "",
  });
  const [new_name, setNew_name] = useState("");
  const [new_nickname, setNew_nickname] = useState("");
  const [new_password, setNew_Password] = useState("");
  const [file, setFile] = useState(null);
  const [newfile, setNewfile] = useState("");

  const [addAccountNo, setAddAccountNo] = useState("");
  const [addAccountBankCode, setAddAccountBankCode] = useState("");
  const [showAccountNo, setShowAccountNo] = useState("");
  const [showAccountBankCode, setShowAccountBankCode] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // 계좌 정보불러오기
    let param = {
      user_no: sessionStorage.getItem("user_no"),
    };
    axios
      .post("http://localhost:80/clink/user/checkAccount.do", param)
      .then((response) => {
        console.log(response.data);
        // 은행 json 파일에서 가져오기
        for (let i = 0; i < response.data.length; i++) {
          // 저축계좌 등록
          if (response.data[i].account_code === "1") {
            setAddAccountNo(response.data[i].account_no);
            setAddAccountBankCode(
              bankCategory.bank[response.data[i].bank_code]
            );
            // 소비계좌 등록
          } else if (response.data[i].account_code === "2") {
            setShowAccountNo(response.data[i].account_no);
            setShowAccountBankCode(
              bankCategory.bank[response.data[i].bank_code]
            );
            // 등록된 계좌 없음
          } else {
            console.log("등록된 계좌 없음");
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // 로그인 확인용
    // setUserInfo(sessionStorage.getItem("user_id"));
  }, []);

  // 개인정보 수정
  function updateInfoHandler() {
    let param = {
      user_name: new_name,
      nick_name: new_nickname,
      password: new_password,
      user_no: sessionStorage.getItem("user_no"),
    };
    axios
      .post("http://localhost:80/clink/user/update.do", param)
      .then((response) => {
        console.log(response.data);
        if (response.data === "success") {
          alert("개인정보가 수정되었습니다.");
          setUserInfo({
            ...userInfo,
            name: new_name,
            nickname: new_nickname,
            password: new_password,
          });
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
      .post("http://localhost:80/clink/user/photo-url.do", formData)
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          alert("프로필 사진이 수정되었습니다.");
          setNewfile(response.data);
          // 이미지 src 바꾸기
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
      <div className="MyPageTitle">
        {sessionStorage.getItem("user_id")} 마이페이지
      </div>
      {/* {userInfo ? ( */}
      <>
        <div className="MyPageProfileBox">
          <img src={require("../assets/pig.png")} alt="logo" /> &nbsp; &nbsp;
          &nbsp;
          <div className="MyPageProfileLeftBox">
            {/* <form
              action="photo-url.do"
              method="post"
              enctype="multipart/form-data"
            > */}
            <label for="file">프로필 사진 선택</label>&nbsp;&nbsp;
            <input
              id="file"
              // className="MyPageProfileBtn"
              className="MyPageChoiceBtn"
              type="file"
              name="file"
              onChange={(e) => setFile(e.target.files[0])}
            ></input>
            &nbsp;
            {/* </form> */}
          </div>
          <Button type="submit" onClick={() => profileHandler()}>
            확인
          </Button>
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
              {/* const [userInfo, setUserInfo] = useState({name:'', nickname:''});*/}

              <div>닉네임</div>
              <Form.Control
                type="text"
                // name="new_nickname"
                placeholder={`${sessionStorage.getItem("nick_name")}`}
                className="joinInput"
                onChange={(e) => {
                  setNew_nickname(e.target.value);
                }}
                value={new_nickname}
              />
            </div>
            <div className="MyPageLineBox">
              <div>이름</div>
              <Form.Control
                type="text"
                name="name"
                placeholder={`${sessionStorage.getItem("user_name")}`}
                className="joinInput"
                onChange={(e) => {
                  setNew_name(e.target.value);
                }}
                value={new_name}
              />
            </div>
            <div className="MyPageLineBox">
              <div>비밀번호</div>
              <Form.Control
                type="password"
                name="password"
                className="joinInput"
                onChange={(e) => {
                  setNew_Password(e.target.value);
                }}
                value={new_password}
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
