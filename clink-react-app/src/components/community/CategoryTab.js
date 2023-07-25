import '../../styles/CommunityCategoryTab.scss';
import { NavLink } from 'react-router-dom';
import React from 'react';

export default function CommunityCategory({ setFilter, categoryNo }) {
  //카테고리별 카테고리탭
  // const navigate = useNavigate();
  const onclick = () => {
    console.log(typeof categoryNo);
    setFilter(1);
  };
  return (
    <div className="CommunityCategoryContainer">
      <NavLink to="/community/posts?categoryNo=3&&filter=1" onClick={onclick}>
        {categoryNo === 3 ? <p className="selec">베스트</p> : <p>베스트</p>}
      </NavLink>
      <NavLink to="/community/posts?categoryNo=1&&filter=1" onClick={onclick}>
        {categoryNo === 1 ? <p className="selec">자유</p> : <p>자유</p>}
      </NavLink>
      <NavLink to="/community/posts?categoryNo=2&&filter=1" onClick={onclick}>
        {categoryNo === 2 ? <p className="selec">정보</p> : <p>정보</p>}
      </NavLink>
      <NavLink to="/community/posts?categoryNo=0&&filter=1" onClick={onclick}>
        {categoryNo === 0 ? <p className="selec">공지사항</p> : <p>공지사항</p>}
      </NavLink>
    </div>
  );
}
