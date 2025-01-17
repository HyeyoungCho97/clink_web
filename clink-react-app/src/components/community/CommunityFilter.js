import "../../styles/community/CommunityFilter.scss";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { useEffect, useState } from "react";
import axios from "axios";
import { getAuthHeader, callRefresh } from "../common/JwtAuth";

export default function CommunityFilter({
  filter,
  setFilter,
  categoryNo,
  setHashtag,
}) {
  const [hashList, setHashList] = useState([]);
  useEffect(() => {
    const listSet = async () => {
      try {
        const response = await axios.get(
          "http://ec2-43-202-97-102.ap-northeast-2.compute.amazonaws.com:8000/community/hot-hashtag?category_no=" +
            categoryNo
        );
        setHashList(response.data);
      } catch (err) {
        if (err.response.data.msg === "Expired Token") {
          console.log("Refresh Your Token");
          // 토큰 유효기간이 만료되면 refreshToken 호출
          try {
            await callRefresh(); // refresh 토큰 발급
            console.log("new tokens....saved..");
            return listSet();
          } catch (refreshErr) {
            throw refreshErr.response.data.msg;
          }
        } //end if
      }
    };
    listSet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const hashClick = (e) => {
    setHashtag(e.target.textContent);
  };
  const hashtagList = () => {
    const list = [];
    for (let i = 0; i < hashList.length; i++) {
      list.push(
        <Button
          variant="primary"
          size="sm"
          key={i}
          style={{ marginRight: "5px" }}
          onClick={(e) => setHashtag(e.target.textContent.replace("#", ""))}
        >
          {"#" + hashList[i]}
        </Button>
      );
    }
    return list;
  };
  return (
    <div className="CommunityFilterContainer">
      <DropdownButton
        variant="outline-primary"
        size="sm"
        title={filter === 1 ? "최신순" : "인기순"}
        id="bg-nested-dropdown"
        className="community-filter-dropdown"
      >
        <Dropdown.Item eventKey="1" onClick={() => setFilter(1)}>
          최신순
        </Dropdown.Item>
        <Dropdown.Item eventKey="2" onClick={() => setFilter(2)}>
          인기순
        </Dropdown.Item>
      </DropdownButton>
      <div className="CommunityTagList">{hashtagList()}</div>
    </div>
  );
}
