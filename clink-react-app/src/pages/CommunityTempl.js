import { Route, Routes } from "react-router-dom";
import Category from "../components/community/CommunityCategory";
import FinInfo from "../components/community/finInfo";
import ListPrint from "../components/community/listPrint";
import axios from "axios";
import { useEffect, useState } from "react";

function Community({ list }) {
  const [data, setData] = useState(null);
  const [newsdata, setNewsdata] = useState(null);
  const [HotPost, setHotPost] = useState([]);
  const [HotFreePost, setHotFreePost] = useState([]);
  const [HotInfoPost, setHotInfoPost] = useState([]);
  const [HotAnnPost, setHotAnnPost] = useState([]);
  useEffect(() => {
    // console.log(sessionStorage.getItem('userId'));
    const fetchData = async () => {
      //뉴스 api를 호출
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
    //인기 게시물 호출
    const listSet = async () => {
      try {
        const response = await axios.get(
          "http://ec2-43-202-97-102.ap-northeast-2.compute.amazonaws.com:8000/community/hot-posts"
        );
        setHotPost(response.data[0].hotPost);
        setHotFreePost(response.data[0].hotFreePost);
        setHotInfoPost(response.data[0].hotInfoPost);
        setHotAnnPost(response.data[0].hotAnnPost);
        setNewsdata(response.data[1]);
        console.log(response.data[1]);
      } catch (e) {
        console.log("나는 에러스");
      }
    };
    listSet();
  }, []);
  return (
    <div className="contents" style={{ paddingBottom: "20%" }}>
      <Category />
      {data && <FinInfo data={data} />}
      {HotPost && <ListPrint list={HotPost} title={"실시간 인기글"} />}
      {HotFreePost && <ListPrint list={HotFreePost} title={"자유 인기글"} />}
      {HotInfoPost && <ListPrint list={HotInfoPost} title={"정보 인기글"} />}
      {HotAnnPost && <ListPrint list={HotAnnPost} title={"공지사항"} />}
    </div>
  );
}
export default Community;
