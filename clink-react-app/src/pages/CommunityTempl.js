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
    // console.log(sessionStorage.getItem('userId'));
    const fetchData = async () => {
      //뉴스 api를 호출
      try {
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
    //인기 게시물 호출
    const listSet = async () => {
      try {
        const response = await axios.get(
          'http://localhost:80/community/hot-posts'
        );
        setHotPost(response.data.hotPost);
        setHotFreePost(response.data.hotFreePost);
        setHotInfoPost(response.data.hotInfoPost);
        setHotAnnPost(response.data.hotAnnPost);
      } catch (e) {
        console.log('나는 에러스');
      }
    };
    listSet();
  }, []);
  return (
    <div className="contents" style={{ paddingBottom: '20%' }}>
      <Category />
      {data && <FinInfo data={data} />}
      {HotPost && <ListPrint list={HotPost} title={'실시간 인기글'} />}
      {HotFreePost && <ListPrint list={HotFreePost} title={'자유 인기글'} />}
      {HotInfoPost && <ListPrint list={HotInfoPost} title={'정보 인기글'} />}
      {HotAnnPost && <ListPrint list={HotAnnPost} title={'공지사항'} />}
    </div>
  );
}
export default Community;
