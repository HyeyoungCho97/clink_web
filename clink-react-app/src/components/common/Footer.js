import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Footer.css';
import { NavLink, Outlet } from 'react-router-dom';
const Footer = ({ resources }) => {
  const [image, setImage] = useState(resources);
  const accountNumber1 = sessionStorage.getItem('accountNumber1');
  const accountNumber2 = sessionStorage.getItem('accountNumber2');

  const imageHandler = (src) => {
    setImage(
      image.map((item) =>
        item.src === src
          ? { ...item, select: true }
          : { ...item, select: false },
      ),
    );
  };

  useEffect(() => {
    // accountNumber2 값이 변경될 때마다 실행되는 로직
  }, [accountNumber1, accountNumber2]); 

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
              response.data[i].accountType,
            );
            sessionStorage.setItem(
              'accountNumber1',
              response.data[i].accountNumber,
            );
            console.log(
              'accountNumber1:' + sessionStorage.getItem('accountNumber1'),
            );
          } else if (response.data[i].accountType === 2) {
            sessionStorage.setItem(
              'accountType2',
              response.data[i].accountType,
            );
            sessionStorage.setItem(
              'accountNumber2',
              response.data[i].accountNumber,
            );
            console.log(
              'accountNumber2:' + sessionStorage.getItem('accountNumber2'),
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
            <NavLink to="/Main">
              <img
                src={image[0].select === false ? image[0].src : image[0].resrc}
                alt="logo"
                onClick={() => {
                  imageHandler(image[0].src);
                }}
              ></img>
            </NavLink>
          </div>
          <div className="FooterIcon">
            <NavLink to="/challenge">
              <img
                src={image[1].select === false ? image[1].src : image[1].resrc}
                alt="logo"
                onClick={() => {
                  imageHandler(image[1].src);
                }}
              ></img>
            </NavLink>
          </div>
          <div className="FooterIcon">
            <NavLink to="/community">
              <img
                src={image[2].select === false ? image[2].src : image[2].resrc}
                // src={image[2].src}
                alt="logo"
                onClick={() => {
                  imageHandler(image[2].src);
                }}
              ></img>
            </NavLink>
          </div>
          <div className="FooterIcon">
            <NavLink to="/mypage">
              <img
                src={image[3].select === false ? image[3].src : image[3].resrc}
                alt="logo"
                onClick={() => {
                  imageHandler(image[3].src);
                  checkAccountHandler();
                }}
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
