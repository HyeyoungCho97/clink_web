import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import account from '../assets/account.png';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/AddAccountForm.scss';

const ConsumptionAccountForm = () => {
  const navigate = useNavigate();
  const [accountNumber, setAccountNumber] = useState('');
  const [bankType, setBankType] = useState('');

  function AddAccountHandler() {
    let param = {
      accountNumber: accountNumber,
      userNo: sessionStorage.getItem('userNo'),
      bankType: bankType,
      accountType: 2,
    };
    axios
      .post('http://localhost:80/clink/account/registAccount.do', param)
      .then((response) => {
        console.log(response.data);
        if (response.data == 1) {
          alert('계좌가 등록되었습니다.');
          sessionStorage.setItem('accountType2', 2);
          sessionStorage.setItem('accountNumber2', accountNumber);
        } else {
          alert('계좌가 정상적으로 등록되지 않았습니다. ');
          setAccountNumber('');
        }
        navigate('/mypage');
      })
      .catch((error) => {
        console.log(error);
        alert('계좌가 정상적으로 등록되지 않았습니다.');
      });
  }

  return (
    <div className="AddAccountForm">
      <div className="AddAccountFormImage">
        <img src={account} alt="logo" />
      </div>
      <div className="AddAccountFormBox">
        <div className="AddAccountFormTitle">계좌추가</div>
        <div className="AddAccountFormForm">
          <form action="registAccount.do" method="post">
            <Form.Select
              aria-label="Default select example"
              value={bankType}
              onChange={(e) => setBankType(e.target.value)}
            >
              <option>은행을 선택하세요</option>
              <option value="088">신한</option>
              <option value="111">우리</option>
              <option value="222">국민</option>
              <option value="333">기업</option>
              <option value="444">농협</option>
              {/* erd보고 바꾸기(코드는 3자리) */}
            </Form.Select>
            <br />
            <Form.Control
              type="text"
              id="inputPassword5"
              name="accountNum"
              placeholder="계좌번호 ( '-' 제외)"
              onChange={(e) => {
                setAccountNumber(e.target.value);
              }}
              value={accountNumber}
            />
          </form>
        </div>
        <div className="AddAccountFormBtnBox">
          <Button
            onClick={() => AddAccountHandler()}
            variant="primary"
            className="AddAccountFormSubmitBtn"
            type="submit"
          >
            확인
          </Button>
          <div className="AddAccountFormCancleBtn" onClick={() => navigate(-1)}>
            취소
          </div>
          {/* 계좌번호 중복확인 검사 */}
        </div>
      </div>
    </div>
  );
};

export default ConsumptionAccountForm;
