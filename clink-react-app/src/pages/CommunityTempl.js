import { Route, Routes } from 'react-router-dom';
import Category from '../components/community/CommunityCategory';
import FinInfo from '../components/community/finInfo';
import ListPrint from '../components/community/listPrint';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getAuthHeader, callRefresh } from '../components/common/JwtAuth';
function Community({ list }) {
  const [data, setData] = useState(null);
  const [newsdata, setNewsdata] = useState(null);
  const [HotPost, setHotPost] = useState([]);
  const [HotFreePost, setHotFreePost] = useState([]);
  const [HotInfoPost, setHotInfoPost] = useState([]);
  const [HotAnnPost, setHotAnnPost] = useState([]);

  useEffect(() => {
    //인기 게시물 호출
    const listSet = async () => {
      try {
        const response = await axios.get(
          'http://localhost:80/community/hot-posts',
          {
            headers: getAuthHeader(),
          }
        );
        setHotPost(response.data[0].hotPost);
        setHotFreePost(response.data[0].hotFreePost);
        setHotInfoPost(response.data[0].hotInfoPost);
        setHotAnnPost(response.data[0].hotAnnPost);
        setNewsdata(response.data[1]);
        console.log(response.data);
      } catch (e) {
        console.log(e);
        if (e.response.data.msg === 'Expired Token') {
          console.log('Refresh Your Token');
          // 토큰 유효기간이 만료되면 refreshToken 호출
          try {
            await callRefresh(); // refresh 토큰 발급
            console.log('new tokens....saved..');
            return listSet();
          } catch (refreshErr) {
            throw refreshErr.response.data.msg;
          }
        }
      }
    };
    listSet();
  }, []);
  return (
    <div className="contents" style={{ paddingBottom: '20%' }}>
      <Category />
      {newsdata && <FinInfo newsdata={newsdata} />}
      {HotPost && <ListPrint list={HotPost} title={'실시간 인기글'} />}
      {HotFreePost && <ListPrint list={HotFreePost} title={'자유 인기글'} />}
      {HotInfoPost && <ListPrint list={HotInfoPost} title={'정보 인기글'} />}
      {HotAnnPost && <ListPrint list={HotAnnPost} title={'공지사항'} />}
    </div>
  );
}
export default Community;
