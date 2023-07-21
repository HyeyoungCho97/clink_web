import './App.css';

import Category from './pages/Category.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Post from './pages/Post';
import WritingPost from './pages/WritingPost';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useMemo, useState } from 'react';
import NotFound from './pages/NotFound';
import TestView from './pages/MainFrame';
import Community from './pages/CommunityTempl';
import Footer from './components/common/Footer';
import Login from './pages/Login';
import Join from './pages/Join';
import FindId from './pages/FindId';
import FindPwd from './pages/FindPwd';
import Challenge from './pages/Challenge';

import MyPage from './pages/MyPage';
import axios from 'axios';
import AddAccountForm from './components/AddAccountForm';
import ConsumptionAccountForm from './components/ConsumptionAccountForm';

function App() {
  const resources = [
    {
      src: '/images/main.png',
      resrc: '/images/clickMain.png',
    },
    {
      src: '/images/chall.png',
      resrc: '/images/clickChaa.png',
    },
    {
      src: '/images/commu.png',
      resrc: '/images/ClickCommu.png',
    },
    {
      src: '/images/myinfo.png',
      resrc: '/images/clickInfo.png',
    },
  ];

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exac path="/" element={<Login />}></Route>
          <Route path="/join" element={<Join />}></Route>
          <Route path="/find-id" element={<FindId />}></Route>
          <Route path="/find-pwd" element={<FindPwd />}></Route>
          <Route path="/add-account-form" element={<AddAccountForm />}></Route>
          <Route
            path="/consumption-account-form"
            element={<ConsumptionAccountForm />}
          ></Route>
          <Route element={<Footer resources={resources} />}>
            <Route path="/main" element={<TestView />} />
            <Route path="/challenge" element={<Challenge />} />
            <Route path="/community" element={<Community />} />
            <Route path="/community/posts" element={<Category />}></Route>
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/community/post/*" element={<Post />}></Route>
            <Route path="/community/writing" element={<WritingPost />}></Route>
          </Route>
          <Route path="/*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
