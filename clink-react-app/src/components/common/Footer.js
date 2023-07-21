import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/common/Footer.css';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
const Footer = ({ resources }) => {
  const [image, setImage] = useState(resources);
  const [lo, setLoc] = useState();
  const accountNumber1 = sessionStorage.getItem('accountNumber1');
  const accountNumber2 = sessionStorage.getItem('accountNumber2');
  const location = useLocation();
  useEffect(() => {
    //
    // console.log(location.pathname.split('/')[1]);
    setLoc(location.pathname.split('/')[1]);
  }, [location]);
  // useEffect(() => {
  //   // accountNumber2 값이 변경될 때마다 실행되는 로직
  // }, [accountNumber1, accountNumber2]);

  // 계좌 있는지 확인하고 세션에 저장
  function checkAccountHandler() {
    let param = {
      userNo: sessionStorage.getItem('userNo'),
    };
    axios
      .post('http://localhost:80/clink/account/checkAccount.do', param)
      .then((response) => {
        console.log(response.data);

        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].accountType === 1) {
            sessionStorage.setItem(
              'accountType1',
              response.data[i].accountType
            );
            sessionStorage.setItem(
              'accountNumber1',
              response.data[i].accountNumber
            );
            console.log(
              'accountNumber1:' + sessionStorage.getItem('accountNumber1')
            );
          } else if (response.data[i].accountType === 2) {
            sessionStorage.setItem(
              'accountType2',
              response.data[i].accountType
            );
            sessionStorage.setItem(
              'accountNumber2',
              response.data[i].accountNumber
            );
            console.log(
              'accountNumber2:' + sessionStorage.getItem('accountNumber2')
            );
          } else {
            console.log('등록된 계좌 없음');
          }
        }
      })

      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <Outlet />
      <div className="FooterContainer">
        <div className="FooterBox">
          <div className="FooterIcon">
            <NavLink to="/Main" className="a" id="img1">
              <img
                src={lo === 'Main' ? image[0].resrc : image[0].src}
                alt="logo"
                // onClick={() => imageHandler()}
              ></img>
            </NavLink>
          </div>
          <div className="FooterIcon">
            <NavLink to="/challenge" className="a" id="img2">
              <img
                src={lo === 'challenge' ? image[1].resrc : image[1].src}
                alt="logo"
                // onClick={() => imageHandler()}
              ></img>
            </NavLink>
          </div>
          <div className="FooterIcon">
            <NavLink to="/community" className="a" id="img3">
              <img
                src={lo === 'community' ? image[2].resrc : image[2].src}
                alt="logo"
                // onClick={() => imageHandler()}
              ></img>
            </NavLink>
          </div>
          <div className="FooterIcon">
            <NavLink to="/mypage" className="a" id="img4">
              <img
                src={lo === 'mypage' ? image[3].resrc : image[3].src}
                alt="logo"
                // onClick={() => imageHandler()}
              ></img>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};
// 이동 링크달기

export default Footer;
