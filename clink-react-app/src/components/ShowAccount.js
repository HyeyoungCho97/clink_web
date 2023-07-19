import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const ShowAccount = ({ accountNumber2 }) => {
  useEffect(() => {
    // accountNumber2 값이 변경될 때마다 실행되는 로직
  }, [accountNumber2]); 

  return (
    <div className="addAccount">
      <div className="addAccountConsumptionBox">
        <div className="addAccountLeftBox">
          <div className="addAccountTitle">소비 계좌</div>
          <button className="addAccountEditBtn">수정</button>
        </div>
        <div className="addAccountRightBox">
          <button className="addAccountAddBtn">
            {accountNumber2 ? (
              accountNumber2
            ) : (
              <Link
                to="/consumption-account-form"
                style={{ textDecoration: 'none' }}
              >
                + 새 계좌 등록
              </Link>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowAccount;
