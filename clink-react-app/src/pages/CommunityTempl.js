import { Route, Routes } from "react-router-dom";
import Category from "../components/community/CommunityCategory";
import FinInfo from "../components/community/finInfo";
import ListPrint from "../components/community/listPrint";
import axios from "axios";
import { useEffect, useState } from "react";

function Community({ list }) {
  const [data, setData] = useState(null);
  const [popularList, setPopularList] = useState([]);
  const [popularFreeList, setPopularFreeList] = useState([]);
  const [popularInfoList, setPopularInfoList] = useState([]);
  const [popularAnnList, setPopularAnnList] = useState([]);
  useEffect(() => {
    //뉴스 를 가지고 오는 api
    const fetchData = async () => {
      try {
        //   const ID_KEY = 'FaodiymBSIFGKB1jVbkU';
        //   const SECRET_KEY = 'rz1LWa559t';
        const newsAPIKey = "e797558e0c3c4523940a90152d3872c2";
        const response = await axios.get(
          "https://newsapi.org/v2/top-headlines?country=kr&category=business&apiKey=" +
            newsAPIKey
        );
        const d = response.data.articles;
        const dl = [];
        for (let i = 0; i < d.length; i++) {
          if (d[i].urlToImage != null) {
            dl.push(d[i]);
          }
        }
        setData(dl);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const listSet = async () => {
      try {
        const response = await axios.get("http://localhost:80/community");
        //withCredentials: true,
        // console.log(response.data[0].boardCategoryNo)
        const ppl = [];
        const ppfl = [];
        const ppil = [];
        const ppal = [];
        for (let i = 0; i < 5; i++) {
          ppl.push(response.data.popularPost[i]);
          ppfl.push(response.data.popularFreePost[i]);
          ppil.push(response.data.popularInfoPost[i]);
          ppal.push(response.data.popularAnnPost[i]);
        }
        console.log(response.data);
        setPopularList(ppl);
        setPopularFreeList(ppfl);
        setPopularInfoList(ppil);
        setPopularAnnList(ppal);
        // console.log(ppl);
        // console.log(ppfl);
        // console.log(ppil);
        // console.log(ppal);
      } catch (e) {
        console.log(e);
      }
    };
    listSet();
  }, []);
  // function getBoardList() {
  //   const arr = [];
  //   for (let i = 0; i < boardList.length; i++) {
  //     if (boardList[i].boardCategoryNo === 1) {
  //       arr.push(boardList[i]);
  //       console.log(boardList[i]);
  //     }
  //   }
  //   return arr;
  // }
  return (
    <div className="contents" style={{ paddingBottom: "20%" }}>
      <Category />
      {data && <FinInfo data={data} />}
      {/* 타이틀+타이틀 리스트 넘기기*/}
      {popularList && <ListPrint list={popularList} title={"실시간 인기글"} />}
      {popularFreeList && (
        <ListPrint list={popularFreeList} title={"자유 인기글"} />
      )}
      {popularInfoList && (
        <ListPrint list={popularInfoList} title={"정보 인기글"} />
      )}
      {popularAnnList && <ListPrint list={popularAnnList} title={"공지사항"} />}
    </div>
  );
}
export default Community;
