import React, { useEffect, useState } from "react";
import CommunityHeader from "../components/community/CommunityHeader";
import CommunityCategory from "../components/community/CategoryTab";
import CommunityFilter from "../components/community/CommunityFilter";
import CommunityPost from "../components/community/CommunityPost";
import CommunityPostButton from "../components/community/CommunityPostButton";
import "../styles/CommunityContainer.scss";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Community() {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const [filter, setFilter] = useState(1);
  useEffect(() => {
    console.log(new URLSearchParams(location.search).get("categoryNo"));
    const lo = new URLSearchParams(location.search).get("categoryNo");
    const fetchPosts = async () => {
      console.log(filter);
      try {
        // 요청이 시작 할 때에는 error 와 posts 를 초기화하고
        setError(null);
        setPosts(null);
        // loading 상태를 true 로 바꿉니다.
        setLoading(true);
        const response = await axios.get(
          "http://localhost:80/community/category?categoryNo=" +
            lo +
            "&&filter=" +
            filter
        );
        console.log(response);
        setPosts(response.data); // 데이터는 response.data 안에 들어있습니다.
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchPosts();
  }, [location, filter]);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!posts) return null;
  return (
    <div className="CommunityContainer">
      <CommunityHeader></CommunityHeader>
      <CommunityCategory
        filter={filter}
        setFilter={setFilter}
      ></CommunityCategory>
      <CommunityFilter setFilter={setFilter} filter={filter}></CommunityFilter>
      {posts.map((post, id) => (
        <CommunityPost post={post} key={id}></CommunityPost>
      ))}
      <CommunityPostButton></CommunityPostButton>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
