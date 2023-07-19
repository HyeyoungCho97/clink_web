import React from 'react';
import '../../styles/CommunityCategoryTab.scss';
import { NavLink, useNavigate } from 'react-router-dom';

export default function CommunityCategory({ filter, setFilter }) {
  // const navigate = useNavigate();
  const onclick = () => {
    setFilter(1);
  };
  return (
    <div className="CommunityCategoryContainer">
      <NavLink
        to="/community/category?categoryNo=3&&filter=1"
        onClick={onclick}
      >
        <p className="0">베스트</p>
      </NavLink>
      <NavLink
        to="/community/category?categoryNo=1&&filter=1"
        onClick={onclick}
      >
        <p className="1">자유</p>
      </NavLink>
      <NavLink
        to="/community/category?categoryNo=2&&filter=1"
        onClick={onclick}
      >
        <p className="2">정보</p>
      </NavLink>
      <NavLink
        to="/community/category?categoryNo=0&&filter=1"
        onClick={onclick}
      >
        <p className="3">공지사항</p>
      </NavLink>
    </div>
  );
}
