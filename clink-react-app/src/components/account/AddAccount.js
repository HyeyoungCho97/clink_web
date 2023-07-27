import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/AddAccount.scss";
import { Link } from "react-router-dom";

const AddAccount = ({ addAccountNo, addAccountBankCode }) => {
  // accountNumber1 값이 변경될 때마다 실행되는 로직
  // useEffect(() => {}, [addAccountNo, addAccountBankCode]);

  // 은행코드 변환
  // useEffect(()=>{
  // if(addAccountBankCode==088){

  // }
  // },[addAccountBankCode])

  return (
    <div className="addAccount">
      <div className="addAccountConsumptionBox">
        <div className="addAccountLeftBox">
          <div className="addAccountTitle">저축 계좌</div>
          {/* <button className="addAccountEditBtn">수정</button> */}
           {/* {addAccountNo ? ("") : ( */}
            <button className="addAccountEditBtn">수정</button>
          {/* )} */} 
        </div>
        <div className="addAccountRightBox">
          <button className="addAccountAddBtn">
            {addAccountNo ? (
              addAccountBankCode + " " + addAccountNo
            ) : (
              <Link to="/add-account-form" style={{ textDecoration: "none" }}>
                + 새 계좌 등록
              </Link>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAccount;
