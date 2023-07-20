import { Route, Routes } from 'react-router-dom';
import Category from '../components/community/CommunityCategory';
import FinInfo from '../components/community/finInfo';
import ListPrint from '../components/community/listPrint';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Community({ list }) {
  const [data, setData] = useState(null);
  const [HotPost, setHotPost] = useState([]);
  const [HotFreePost, setHotFreePost] = useState([]);
  const [HotInfoPost, setHotInfoPost] = useState([]);
  const [HotAnnPost, setHotAnnPost] = useState([]);
  useEffect(() => {
    console.log(sessionStorage.getItem('userId'));
    const fetchData = async () => {
      try {
        //   const ID_KEY = 'FaodiymBSIFGKB1jVbkU';
        //   const SECRET_KEY = 'rz1LWa559t';
        const newsAPIKey = 'e797558e0c3c4523940a90152d3872c2';
        const response = await axios.get(
          'https://newsapi.org/v2/top-headlines?country=kr&category=business&apiKey=' +
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
        const response = await axios.get(
          'http://localhost:80/community/hot-posts'
        );
        console.log(response.data.HotPost);
        //withCredentials: true,
        // console.log(response.data[0].boardCategoryNo)
        // const ppl = [];
        // const ppfl = [];
        // const ppil = [];
        // const ppal = [];
        if (response.data.HotPost === undefined) {
          //게시물이 없을때 예외처리 하기 백엔드에서
          setHotPost([{ boardTitle: '게시물이 존재하지 않습니다.' }]);
          setHotFreePost([{ boardTitle: '게시물이 존재하지 않습니다.' }]);
          setHotInfoPost([{ boardTitle: '게시물이 존재하지 않습니다.' }]);
          setHotAnnPost([{ boardTitle: '게시물이 존재하지 않습니다.' }]);
        }
        // console.log(HotPost);
        // else {
        //   for (let i = 0; i < 5; i++) {
        //     ppl.push(response.data.HotPost[i]);
        //     ppfl.push(response.data.HotFreePost[i]);
        //     ppil.push(response.data.HotInfoPost[i]);
        //     ppal.push(response.data.HotAnnPost[i]);
        //   }
        // }
        // console.log(ppl);
        // setHotPost(ppl);
        // setHotFreePost(ppfl);
        // setHotInfoPost(ppil);
        // setHotAnnPost(ppal);
        // console.log(ppl);
        // console.log(ppfl);
        // console.log(ppil);
        // console.log(ppal);
      } catch (e) {
        console.log('나는 에러스');
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
    <div className="contents" style={{ paddingBottom: '20%' }}>
      <Category />
      {data && <FinInfo data={data} />}
      {/* 타이틀+타이틀 리스트 넘기기*/}
      {HotPost && <ListPrint list={HotPost} title={'실시간 인기글'} />}
      {HotFreePost && <ListPrint list={HotFreePost} title={'자유 인기글'} />}
      {HotInfoPost && <ListPrint list={HotInfoPost} title={'정보 인기글'} />}
      {HotAnnPost && <ListPrint list={HotAnnPost} title={'공지사항'} />}
    </div>
  );
}
export default Community;
